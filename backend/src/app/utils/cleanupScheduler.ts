import { authRepository } from '../modules/auth/auth.repository';
import { logger } from '../../shared/logger';

/**
 * ─── OTP & Token Cleanup Scheduler ───────────────────────────────────────────
 *
 * Runs every 30 minutes to hard-delete stale records from the database:
 *   • oTPVerification — expired (past expiresAt) OR already verified
 *   • verificationToken — expired OR already used (usedAt is set)
 *
 * Why 30 minutes?
 *   - OTPs expire after 5–10 minutes, so they'll be cleaned well within an hour.
 *   - Running every minute would be wasteful on small deployments.
 *   - Running every hour risks a backlog if traffic is high.
 *   30 minutes is a balanced, deployment-friendly default.
 *
 * This uses Node's built-in setInterval — no external cron package needed.
 */

const CLEANUP_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

export function startCleanupScheduler(): void {
  // Run once immediately on startup to clear any leftovers from a previous session
  runCleanup();

  // Then repeat on schedule
  const intervalId = setInterval(runCleanup, CLEANUP_INTERVAL_MS);

  // Allow the process to exit normally even if the interval is still active
  intervalId.unref();

  logger.info(
    `🧹 OTP cleanup scheduler started — running every ${CLEANUP_INTERVAL_MS / 60000} minutes`,
  );
}

async function runCleanup(): Promise<void> {
  try {
    const [otpCount, tokenCount] = await Promise.all([
      authRepository.deleteExpiredOtps(),
      authRepository.deleteExpiredVerificationTokens(),
    ]);

    const total = otpCount + tokenCount;
    if (total > 0) {
      logger.info(
        `🧹 Cleanup: removed ${otpCount} expired OTP(s) and ${tokenCount} expired token(s)`,
      );
    }
  } catch (error) {
    // Log but never crash the server over a cleanup job
    logger.warn(`⚠️  OTP cleanup job failed: ${(error as Error).message}`);
  }
}
