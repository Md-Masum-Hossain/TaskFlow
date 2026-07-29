import { useEffect, useRef, useState } from 'react';
import { FiEdit2, FiMoreVertical, FiTrash2 } from 'react-icons/fi';

export default function TaskActionsMenu({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleEdit = () => {
    closeMenu();
    onEdit?.();
  };

  const handleDelete = () => {
    closeMenu();
    onDelete?.();
  };

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#6b7280] transition-colors duration-150 hover:bg-[#f3f4f6] hover:text-[#111827]"
        aria-label="Task actions"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <FiMoreVertical className="h-4 w-4" />
      </button>

      <div
        className={`absolute right-0 top-[calc(100%+8px)] z-20 w-44 rounded-2xl border border-[#e5e7eb] bg-white p-2 shadow-[0_16px_32px_rgba(17,24,39,0.12)] transition-all duration-150 ${
          isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
        role="menu"
      >
        <button
          type="button"
          onClick={handleEdit}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#111827] transition-colors duration-150 hover:bg-[#f9fafb]"
          role="menuitem"
        >
          <FiEdit2 className="h-4 w-4 text-[#6b7280]" />
          <span>Edit Task</span>
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#b42318] transition-colors duration-150 hover:bg-[#fef2f2]"
          role="menuitem"
        >
          <FiTrash2 className="h-4 w-4 text-[#dc2626]" />
          <span>Delete Task</span>
        </button>
      </div>
    </div>
  );
}