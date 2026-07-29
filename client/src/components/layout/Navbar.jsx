import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBell, FiChevronDown, FiLogOut, FiMenu, FiSearch, FiSettings, FiUser } from 'react-icons/fi';

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const token = localStorage.getItem('accessToken');

  const username = useMemo(() => {
    if (!token) return '';

    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      const rawName = payload?.name || payload?.email || '';
      const baseName = rawName.includes('@') ? rawName.split('@')[0] : rawName;
      return baseName
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (character) => character.toUpperCase())
        .trim();
    } catch (error) {
      return 'User';
    }
  }, [token]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setOpen(false);
    navigate('/login');
  };

  return (
    <header className="flex h-16 items-center border-b border-[#e5e7eb] bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d1d5db] text-[#6b7280] transition-colors duration-150 hover:bg-[#f9fafb] lg:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <div className="hidden items-center gap-3 lg:flex">
          <div>
            <p className="text-sm font-semibold text-[#111827]">TaskFlow</p>
            <p className="text-xs text-[#6b7280]">Task Management</p>
          </div>
        </div>

        <div className="ml-auto hidden h-[52px] w-full max-w-[420px] items-center rounded-xl border border-[#d1d5db] bg-white px-4 sm:flex">
          <FiSearch className="h-4 w-4 text-[#9ca3af]" />
          <span className="ml-2 text-[16px] text-[#9ca3af]">Search tasks, projects, team members...</span>
          <span className="ml-auto text-xs font-medium text-[#9ca3af]">⌘K</span>
        </div>
      </div>

      <div className="ml-4 flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d1d5db] text-[#6b7280] transition-colors duration-150 hover:bg-[#f9fafb]"
          aria-label="Notifications"
        >
          <FiBell className="h-5 w-5" />
        </button>

        {!token ? (
          <Link
            to="/login"
            className="inline-flex h-10 items-center justify-center rounded-[10px] bg-[#2563eb] px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1d4ed8]"
          >
            Login
          </Link>
        ) : (
          <div
            ref={menuRef}
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 items-center gap-3 rounded-full border border-[#d1d5db] bg-white px-3 text-sm font-medium text-[#111827] transition-colors duration-150 hover:bg-[#f9fafb]"
              aria-label="Account menu"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2563eb] text-xs font-semibold text-white">
                {username?.charAt(0) || 'U'}
              </span>
              <span className="hidden max-w-[120px] truncate sm:block">{username || 'User'}</span>
              <FiChevronDown className="h-4 w-4 text-[#6b7280]" />
            </button>

            <div
              className={`absolute right-0 top-[calc(100%+8px)] w-40 rounded-2xl border border-[#e5e7eb] bg-white p-2 shadow-[0_16px_32px_rgba(17,24,39,0.12)] transition-all duration-150 ${
                open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
              }`}
            >
              <button type="button" className="flex w-full items-center rounded-xl px-3 py-2 text-sm text-[#111827] transition-colors duration-150 hover:bg-[#f9fafb]">
                Profile
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#111827] transition-colors duration-150 hover:bg-[#f9fafb]">
                <FiSettings className="h-4 w-4 text-[#6b7280]" />
                Settings
              </button>
              <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#dc2626] transition-colors duration-150 hover:bg-[#fef2f2]">
                <FiLogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}