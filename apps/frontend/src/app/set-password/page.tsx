'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { firstLoginChangePassword, getUser, setUser } from '@/lib';

export default function SetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const user = getUser();

  if (!user?.must_change_password) {
    router.push('/dashboard');
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError('Password needs at least 8 characters');
      return;
    }

    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setError('Password needs letters and numbers');
      return;
    }

    setLoading(true);
    try {
      const result = await firstLoginChangePassword(password);
      if (result.user) setUser(result.user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.error || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-neutral-950 dark:to-neutral-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-center mb-2">Set Your Password</h1>
          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mb-6">
            Hi {user.username}, please choose a secure password
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                New Password
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
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium mb-1.5">
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                disabled={loading}
                required
                className="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm password"
              />
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3 text-xs">
              <div className="font-medium mb-1">Requirements:</div>
              <div className={password.length >= 8 ? 'text-green-600' : 'text-neutral-500'}>
                ✓ At least 8 characters
              </div>
              <div className={/\d/.test(password) ? 'text-green-600' : 'text-neutral-500'}>
                ✓ Contains a number
              </div>
              <div className={/[a-zA-Z]/.test(password) ? 'text-green-600' : 'text-neutral-500'}>
                ✓ Contains a letter
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

