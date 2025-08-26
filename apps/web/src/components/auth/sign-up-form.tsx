'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';

export function SignUpForm() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    first_name: '',
    last_name: '',
    role: 'USER' as const,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if ('error' in result && result.error) {
        setError(result.error.message || 'Sign up failed');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            className="block font-medium text-gray-700 text-sm"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            required
            type="email"
            value={formData.email}
          />
        </div>

        <div>
          <label
            className="block font-medium text-gray-700 text-sm"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
            type="password"
            value={formData.password}
          />
        </div>

        <div>
          <label
            className="block font-medium text-gray-700 text-sm"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            type="text"
            value={formData.name}
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
