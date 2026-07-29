import { useEffect, useRef, useState } from 'react';

const priorityOptions = [
  { label: 'All priorities', value: '' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
];

const statusOptions = [
  { label: 'All statuses', value: '' },
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
];

function FilterDropdown({ id, label, value, options, isOpen, onToggle, onSelect, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const activeLabel = options.find((option) => option.value === value)?.label || options[0].label;

  return (
    <div ref={menuRef} className="relative">
      <label className="mb-2 block text-[13px] font-medium text-[#6b7280]" htmlFor={id}>
        {label}
      </label>

      <button
        id={id}
        type="button"
        onClick={onToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex h-[52px] w-full items-center justify-between rounded-xl border border-[#d1d5db] bg-white px-4 text-[16px] text-[#111827]"
      >
        <span>{activeLabel}</span>
        <span className="text-[#9ca3af]">▾</span>
      </button>

      <div
        role="menu"
        aria-hidden={!isOpen}
        className={`absolute left-0 top-[calc(100%+8px)] z-20 w-full rounded-xl border border-[#d1d5db] bg-white p-2 shadow-[0_16px_32px_rgba(17,24,39,0.12)] transition-all duration-150 ${
          isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        {options.map((option) => (
          <button
            key={option.value || 'all'}
            type="button"
            role="menuitemradio"
            aria-checked={value === option.value}
            onClick={() => onSelect(option.value)}
            className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-[#f9fafb] ${
              value === option.value ? 'font-semibold text-[#111827]' : 'text-[#344054]'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TaskFilters({ priority, status, onPriorityChange, onStatusChange }) {
  const [openDropdown, setOpenDropdown] = useState('');

  useEffect(() => {
    if (!openDropdown) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenDropdown('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDropdown]);

  return (
    <div className="grid gap-4 xl:grid-cols-[200px_200px]">
      <FilterDropdown
        id="priority-filter"
        label="Priority filter"
        value={priority}
        options={priorityOptions}
        isOpen={openDropdown === 'priority'}
        onToggle={() => setOpenDropdown((current) => (current === 'priority' ? '' : 'priority'))}
        onSelect={(value) => {
          onPriorityChange(value);
          setOpenDropdown('');
        }}
        onClose={() => setOpenDropdown('')}
      />

      <FilterDropdown
        id="status-filter"
        label="Status filter"
        value={status}
        options={statusOptions}
        isOpen={openDropdown === 'status'}
        onToggle={() => setOpenDropdown((current) => (current === 'status' ? '' : 'status'))}
        onSelect={(value) => {
          onStatusChange(value);
          setOpenDropdown('');
        }}
        onClose={() => setOpenDropdown('')}
      />
    </div>
  );
}
