/**
 * Main API exports - central place to import all API functions
 */

// Re-export all auth functions
export { login, logout, changePassword, firstLoginChangePassword } from './api/auth';

// Re-export storage functions
export {
  getAuthToken,
  setAuthToken,
  clearAuthToken,
  getUser,
  setUser,
  clearUser,
  clearAllStorage,
} from './storage';

// Re-export types
export type {
  User,
  LoginResponse,
  ApiError,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from './types';

// Re-export API client for custom calls
export { apiCall } from './api-client';
