/**
 * TypeScript types and interfaces for the application
 */

export interface User {
  id: number;
  username: string;
  is_admin: boolean;
  must_change_password?: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
  retry_after_seconds?: number;
  status?: number;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  message: string;
}

