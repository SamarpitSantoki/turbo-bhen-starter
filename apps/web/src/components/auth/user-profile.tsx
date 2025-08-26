'use client';

import { useAuth } from '@/contexts/auth-context';

export function UserProfile() {
  const { user, signOut, isLoading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="h-8 w-8 animate-spin rounded-full border-indigo-600 border-b-2" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600">
            <span className="font-medium text-lg text-white">
              {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-gray-900 text-sm">
            {user.name || 'User'}
          </p>
          <p className="truncate text-gray-500 text-sm">{user.email}</p>
        </div>
        <div className="flex-shrink-0">
          <button
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 font-medium text-sm text-white leading-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleSignOut}
            type="button"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
