'use client';

import { createContext, useContext } from 'react';
import type { AuthClient } from '@/lib/auth';
import { authClient } from '@/lib/auth';

type AuthContextType = {
  user: AuthClient['$Infer']['Session']['user'] | null;
  session: AuthClient['$Infer']['Session']['session'] | null;
  isLoading: boolean;
  signIn: AuthClient['signIn'];
  signUp: AuthClient['signUp'];
  signOut: AuthClient['signOut'];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession();

  const user = data?.user ?? null;
  const session = data?.session ?? null;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading: isPending,
        signIn: authClient.signIn,
        signUp: authClient.signUp,
        signOut: authClient.signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
