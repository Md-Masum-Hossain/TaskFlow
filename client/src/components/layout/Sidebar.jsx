import { FiGrid, FiSettings, FiSquare, FiX } from 'react-icons/fi';

const navigationItems = [
  { label: 'Dashboard', icon: FiGrid, active: true },
  { label: 'Tasks', icon: FiSquare, active: false },
  { label: 'Settings', icon: FiSettings, active: false },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-[#1f2937] bg-[#111827] px-4 py-5 text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between lg:justify-start">
          <div>
            <p className="text-lg font-semibold tracking-tight">TaskFlow</p>
            <p className="text-xs text-[#98a2b3]">Enterprise workspace</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium ${
                  item.active ? 'bg-[#2563eb] text-white' : 'text-[#d0d5dd]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>
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