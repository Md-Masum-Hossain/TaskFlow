import React from 'react'
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/authApi';
import {toast} from 'sonner';

function LoginForm() {

  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      toast.success('Login successful');
      localStorage.setItem('accessToken', response.accessToken);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('Login failed: ' + (err.data?.message || 'Unknown error'));
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10 text-[#101828]">
      <section className="w-full max-w-[420px] rounded-[28px] border border-[#eaecf0] bg-white px-6 py-8 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563eb] text-sm font-semibold text-white">
            TF
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-[-0.02em]">Welcome back</h1>
          <p className="mt-2 text-sm leading-6 text-[#667085]">
            Sign in to continue to your TaskFlow workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              className="h-11 w-full rounded-xl border border-[#d0d5dd] bg-white px-3 text-sm text-[#101828] outline-none placeholder:text-[#98a2b3] focus:border-[#2563eb]"
              name="email"
              value={formData.email}
              onChange={handleChange} 
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              className="h-11 w-full rounded-xl border border-[#d0d5dd] bg-white px-3 text-sm text-[#101828] outline-none placeholder:text-[#98a2b3] focus:border-[#2563eb]"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#344054]">
              <input type="checkbox" className="h-4 w-4 rounded border-[#d0d5dd] text-[#2563eb] focus:ring-0" />
              Remember me
            </label>
            <button type="button" className="font-medium text-[#2563eb]">
              Forgot password?
            </button>
          </div>

          <button
          disabled={isLoading}
            type="submit"
            className="h-11 w-full rounded-xl bg-[#2563eb] text-sm font-semibold text-white"
          >{isLoading ? 'Signing in...' : 'Sign in'}</button>
        </form>

        <p className="mt-6 text-center text-sm text-[#667085]">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-[#2563eb]">
            Create account
          </Link>
        </p>
      </section>
    </main>
  )
}

export default LoginForm
