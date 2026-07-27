import { FiBell, FiChevronDown, FiMenu, FiSearch, FiUser } from 'react-icons/fi';

export default function Navbar({ onMenuClick }) {
  return (
    <header className="flex h-16 items-center border-b border-[#e4e7ec] bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d0d5dd] text-[#344054] lg:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <div className="hidden items-center gap-3 lg:flex">
          <div>
            <p className="text-sm font-semibold text-[#101828]">TaskFlow</p>
            <p className="text-xs text-[#667085]">Task Management</p>
          </div>
        </div>

        <div className="ml-auto hidden w-full max-w-[360px] items-center rounded-xl border border-[#d0d5dd] bg-[#f9fafb] px-3 py-2 sm:flex">
          <FiSearch className="h-4 w-4 text-[#667085]" />
          <span className="ml-2 text-sm text-[#98a2b3]">Search</span>
        </div>
      </div>

      <div className="ml-4 flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d0d5dd] text-[#344054]"
          aria-label="Notifications"
        >
          <FiBell className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-[#d0d5dd] px-3 py-2"
          aria-label="Account menu"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eaecf0] text-[#667085]">
            <FiUser className="h-4 w-4" />
          </span>
          <FiChevronDown className="h-4 w-4 text-[#667085]" />
        </button>
      </div>
    </header>
  );
}