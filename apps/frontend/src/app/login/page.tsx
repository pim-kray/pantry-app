'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(username, password);

      if (response.user.must_change_password) {
        router.push('/set-password');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      if (err.retry_after_seconds) {
        const mins = Math.ceil(err.retry_after_seconds / 60);
        setError(`Too many attempts. Try again in ${mins} minute${mins > 1 ? 's' : ''}`);
      } else if (err.status === 401) {
        setError('Invalid username or password');
      } else {
        setError(err.error || 'Login failed');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-neutral-950 dark:to-neutral-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-center mb-2">Welcome Home</h1>
          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mb-6">
            Sign in to your household
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={loading}
                required
                className="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                required
                className="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-neutral-500 mt-6">
            Self-hosted household management
          </p>
        </div>

        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-4">
          First time? Try admin/admin
        </p>
      </div>
    </div>
  );
}

