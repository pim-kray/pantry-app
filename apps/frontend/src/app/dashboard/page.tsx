'use client';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-200/50 dark:border-neutral-800/50 p-8">
          <h1 className="text-4xl font-semibold text-neutral-900 dark:text-white mb-4">
            Dashboard
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Welcome! You&apos;re successfully logged in. 🎉
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            More features coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
