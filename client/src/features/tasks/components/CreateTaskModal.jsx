import Button from '../../../components/ui/Button';
import TaskForm from './TaskForm';

export default function CreateTaskModal({ isOpen = false, onClose = () => {} }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xl rounded-3xl border border-[#eaecf0] bg-white p-6 shadow-[0_12px_24px_rgba(16,24,40,0.18)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#101828]">Create Task</h2>
          <button type="button" onClick={onClose} className="text-sm font-medium text-[#667085]">
            Close
          </button>
        </div>

        <TaskForm />

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button>Create task</Button>
        </div>
      </div>
    </div>
  );
}