/**
 * fetchWithAuth - Smart fetch wrapper with automatic JWT token refresh.
 *
 * How it works:
 * 1. Makes the original request (cookies sent automatically via credentials: 'include')
 * 2. If the server returns 401 (accessToken expired), it calls /api/auth/refresh-token
 * 3. If refresh succeeds → retries the original request with new cookie
 * 4. If refresh also fails (refreshToken expired) → calls the registered logout callback
 *    and redirects to /login
 */

type LogoutCallback = () => Promise<void> | void

// Global logout callback — registered by AuthContext on mount
let _logoutCallback: LogoutCallback | null = null
let _isRefreshing = false
let _refreshQueue: Array<(success: boolean) => void> = []

/**
 * Register the logout callback from AuthContext.
 * This allows fetchWithAuth to trigger logout without being inside React.
 */
export function registerLogoutCallback(cb: LogoutCallback) {
    _logoutCallback = cb
}

/**
 * Attempt to refresh the access token.
 * Uses a queue to prevent multiple simultaneous refresh calls.
 */
async function attemptTokenRefresh(): Promise<boolean> {
    // If already refreshing, queue this request
    if (_isRefreshing) {
        return new Promise((resolve) => {
            _refreshQueue.push(resolve)
        })
    }

    _isRefreshing = true

    try {
        const response = await fetch('/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })

        const data = await response.json()
        const success = response.ok && data.success

        // Resolve all queued requests
        _refreshQueue.forEach((resolve) => resolve(success))
        _refreshQueue = []

        return success
    } catch {
        _refreshQueue.forEach((resolve) => resolve(false))
        _refreshQueue = []
        return false
    } finally {
        _isRefreshing = false
    }
}

/**
 * Trigger logout — calls the registered callback and redirects to /login
 */
async function handleAuthFailure() {
    if (_logoutCallback) {
        await _logoutCallback()
    }
    // Redirect to login
    if (typeof window !== 'undefined') {
        window.location.href = '/login'
    }
}

/**
 * fetchWithAuth — drop-in replacement for fetch() for all authenticated API calls.
 *
 * Usage: same as fetch(), just use fetchWithAuth() instead of fetch()
 *
 * @example
 * const res = await fetchWithAuth('/api/admin/products', { method: 'GET' })
 */
export async function fetchWithAuth(
    input: RequestInfo | URL,
    init: RequestInit = {}
): Promise<Response> {
    // Always include credentials (cookies)
    const options: RequestInit = {
        ...init,
        credentials: 'include',
    }

    // Make the first request
    let response = await fetch(input, options)

    // If we get a 401, try to refresh the token
    if (response.status === 401) {
        const refreshed = await attemptTokenRefresh()

        if (refreshed) {
            // Token refreshed successfully — retry the original request
            response = await fetch(input, options)

            // If still 401 after refresh, give up
            if (response.status === 401) {
                await handleAuthFailure()
            }
        } else {
            // Refresh also failed — both tokens expired → logout
            await handleAuthFailure()
        }
    }

    return response
}
