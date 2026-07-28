import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../api/authApi';
import {toast} from 'sonner';

function RegisterForm() {
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await register(formData).unwrap();
      toast.success('Registration successful');
      localStorage.setItem('accessToken', response.accessToken);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
      toast.error('Registration failed: ' + (err.data?.message || 'Unknown error'));
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10 text-[#101828]">
      <section className="w-full max-w-[420px] rounded-[28px] border border-[#eaecf0] bg-white px-6 py-8 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563eb] text-sm font-semibold text-white">
            TF
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-[-0.02em]">Create your account</h1>
          <p className="mt-2 text-sm leading-6 text-[#667085]">
            Start managing work in your TaskFlow workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]" htmlFor="register-name">
              Full name
            </label>
            <input
              name="name"
              id="register-name"
              type="text"
              placeholder="Enter your full name"
              className="h-11 w-full rounded-xl border border-[#d0d5dd] bg-white px-3 text-sm text-[#101828] outline-none placeholder:text-[#98a2b3] focus:border-[#2563eb]"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              placeholder="Enter your email"
              className="h-11 w-full rounded-xl border border-[#d0d5dd] bg-white px-3 text-sm text-[#101828] outline-none placeholder:text-[#98a2b3] focus:border-[#2563eb]"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#344054]" htmlFor="register-password">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              placeholder="Create a password"
              className="h-11 w-full rounded-xl border border-[#d0d5dd] bg-white px-3 text-sm text-[#101828] outline-none placeholder:text-[#98a2b3] focus:border-[#2563eb]"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button disabled={isLoading}
            type="submit"
            className="h-11 w-full rounded-xl bg-[#2563eb] text-sm font-semibold text-white"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#667085]">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#2563eb]">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  )
}

export default RegisterForm
