'use client';

import { redirect } from 'next/navigation';
import { useState } from 'react';
import { SignInForm } from '@/components/auth/sign-in-form';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { useAuth } from '@/contexts/auth-context';

export default function AuthPage() {
  const { session, isLoading } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);

  if (session) {
    redirect('/');
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-indigo-600 border-b-2" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center font-extrabold text-3xl text-gray-900">
            {isSignIn ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-gray-600 text-sm">
            {isSignIn ? (
              <>
                Or{' '}
                <button
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setIsSignIn(false)}
                  type="button"
                >
                  create a new account
                </button>
              </>
            ) : (
              <>
                Or{' '}
                <button
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setIsSignIn(true)}
                  type="button"
                >
                  sign in to your existing account
                </button>
              </>
            )}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {isSignIn ? <SignInForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
}
