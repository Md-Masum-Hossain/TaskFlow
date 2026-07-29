import { useEffect } from 'react';

import Button from '../../../components/ui/Button';

export default function DeleteConfirmationDialog({
  isOpen = false,
  onClose = () => {},
  onConfirm = () => {},
  isPending = false,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && !isPending) {
      onClose();
    }
  };

  const handleConfirmClick = async () => {
    if (isPending) {
      return;
    }

    await onConfirm();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4" onMouseDown={handleBackdropClick}>
      <div className="w-full max-w-md rounded-3xl border border-[#eaecf0] bg-white p-6 shadow-[0_12px_24px_rgba(16,24,40,0.18)]" role="dialog" aria-modal="true" aria-labelledby="delete-task-title">
        <h2 id="delete-task-title" className="text-lg font-semibold text-[#101828]">Delete Task</h2>
        <p className="mt-2 text-sm leading-6 text-[#667085]">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmClick} disabled={isPending}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}