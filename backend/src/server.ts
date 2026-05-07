import { Server } from 'http';
import app from './app';
import config from './app/config';
import { errorLogger, logger } from './shared/logger';
import { startCleanupScheduler } from './app/utils/cleanupScheduler';

async function main() {
  const server: Server = app.listen(config.port, () => {
    logger.info(`🚀 Server is running on http://localhost:${config.port}`);
  });

  // Start the background OTP / token cleanup scheduler
  startCleanupScheduler();

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    errorLogger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

main();
