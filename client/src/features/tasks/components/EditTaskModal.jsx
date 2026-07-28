import Button from '../../../components/ui/Button';
import TaskForm from './TaskForm';

const defaultTask = {
  title: 'Update project timeline',
  description: 'Align deadlines with the latest stakeholder update.',
  status: 'in-progress',
  priority: 'high',
  dueDate: '2026-08-02',
};

export default function EditTaskModal({ isOpen = false, onClose = () => {}, task = defaultTask }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xl rounded-3xl border border-[#eaecf0] bg-white p-6 shadow-[0_12px_24px_rgba(16,24,40,0.18)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#101828]">Edit Task</h2>
          <button type="button" onClick={onClose} className="text-sm font-medium text-[#667085]">
            Close
          </button>
        </div>

        <TaskForm initialTask={task} />

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  );
}