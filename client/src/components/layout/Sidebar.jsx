import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiSettings, FiSquare, FiX } from 'react-icons/fi';

const navigationItems = [
  { label: 'Dashboard', icon: FiGrid, to: '/dashboard' },
  { label: 'Tasks', icon: FiSquare, to: '/tasks' },
  { label: 'Settings', icon: FiSettings },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-[#242730] bg-[#2F313A] px-4 py-5 text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between lg:justify-start">
          <div>
            <p className="text-[15px] font-semibold tracking-tight text-white">Workspace</p>
            <p className="text-xs text-[#9ca3af]">Premium Plan</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white transition-colors duration-150 hover:bg-white/5 lg:hidden"
            aria-label="Close sidebar"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.to && location.pathname.startsWith(item.to);

            if (!item.to) {
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-[#cbd5e1] transition-colors duration-150 hover:bg-white/5 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive ? 'bg-[#2563eb] text-white' : 'text-[#cbd5e1] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-[#9ca3af]">75% storage used</p>
          <button
            type="button"
            className="mt-3 inline-flex h-9 items-center justify-center rounded-xl bg-[#2563eb] px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1d4ed8]"
          >
            Upgrade Plan
          </button>
          <div className="mt-4 flex items-center gap-2 text-sm text-[#d1d5db] transition-colors duration-150 hover:text-white">
            <span className="text-[#9ca3af]">?</span>
            <span>Help Center</span>
          </div>
        </div>
      </aside>

      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar overlay"
        />
      ) : null}
    </>
  );
}