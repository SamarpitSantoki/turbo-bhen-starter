'use client';

import Link from 'next/link';
import { UserProfile } from '@/components/auth/user-profile';
import { useAuth } from '@/contexts/auth-context';

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-indigo-600 border-b-2" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <h1 className="font-bold text-2xl text-gray-900">BHEN</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <UserProfile />
              ) : (
                <Link
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  href="/auth"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {user ? (
          <div className="px-4 py-6 sm:px-0">
            <div className="flex h-96 items-center justify-center rounded-lg border-4 border-gray-200 border-dashed">
              <div className="text-center">
                <h2 className="mb-4 font-bold text-2xl text-gray-900">
                  Welcome to BHEN Stack, {user.name || user.email}!
                </h2>
                <p className="text-gray-600">
                  Your crypto trading dashboard is coming soon.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 py-6 sm:px-0">
            <div className="flex h-96 items-center justify-center rounded-lg border-4 border-gray-200 border-dashed">
              <div className="text-center">
                <h2 className="mb-4 font-bold text-2xl text-gray-900">
                  Welcome to BHEN Stack
                </h2>
                <p className="mb-8 text-gray-600">
                  A monorepo with Hono, Next.js and BetterAuth
                </p>
                <Link
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 font-medium text-base text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  href="/auth"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
