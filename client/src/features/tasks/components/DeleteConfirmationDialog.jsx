import Button from '../../../components/ui/Button';

export default function DeleteConfirmationDialog({
  isOpen = false,
  onClose = () => {},
  taskTitle = 'this task',
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#eaecf0] bg-white p-6 shadow-[0_12px_24px_rgba(16,24,40,0.18)]">
        <h2 className="text-lg font-semibold text-[#101828]">Delete Task</h2>
        <p className="mt-2 text-sm leading-6 text-[#667085]">
          Are you sure you want to delete {taskTitle}? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger">Delete</Button>
        </div>
      </div>
    </div>
  );
}