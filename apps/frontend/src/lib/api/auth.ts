/**
 * Authentication API endpoints
 */

import { apiCall } from '../api-client';
import { setAuthToken, setUser, clearAllStorage } from '../storage';
import type {
  LoginResponse,
  ChangePasswordRequest,
  ChangePasswordResponse
} from '../types';

/**
 * Login with username and password
 */
export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const data = await apiCall<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  setAuthToken(data.token);
  setUser(data.user);

  return data;
}

/**
 * Logout and clear session
 */
export async function logout(): Promise<void> {
  try {
    await apiCall('/api/auth/logout', { method: 'POST' });
  } catch (error) {
    // Ignore errors on logout
  } finally {
    clearAllStorage();
  }
}

/**
 * Change current user's password
 */
export async function changePassword(
  oldPassword: string,
  newPassword: string
): Promise<ChangePasswordResponse> {
  return apiCall<ChangePasswordResponse>('/api/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword,
    } as ChangePasswordRequest),
  });
}

/**
 * Change password on first login (no old password required)
 */
export async function firstLoginChangePassword(
  newPassword: string
): Promise<{ message: string; user: any }> {
  return apiCall('/api/auth/first-login-change-password', {
    method: 'POST',
    body: JSON.stringify({
      new_password: newPassword,
    }),
  });
}
