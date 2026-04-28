/**
 * API Client for Node.js Backend Integration
 * Centralized fetch wrapper with credentials, JSON, and error handling.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown> | unknown;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
}

export const apiClient = async <T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> => {
  const { method = 'GET', body, headers = {}, credentials = 'include' } = options;
  const isFormData = body instanceof FormData;
  const config: RequestInit = {
    method,
    credentials,
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...headers,
    },
  };

  if (body) {
    config.body = isFormData ? (body as any) : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    // If backend returns a message, use it
    const errorMessage = data.message || `Request failed with status ${response.status}`;
    const error: any = new Error(errorMessage);
    error.errorMessages = data.errorMessages || [];
    throw error;
  } catch (error: any) {
    // Re-throw so the caller's catch block receives the Error object with errorMessages
    throw error;
  }
};
