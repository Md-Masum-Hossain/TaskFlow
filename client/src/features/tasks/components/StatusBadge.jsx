import { getStatusBadgeClass } from '../utils/badgeVariants';

const statusLabel = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export default function StatusBadge({ status = 'todo' }) {
  const statusKey = status.toLowerCase();

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[13px] font-medium ${getStatusBadgeClass(statusKey)}`}>
      {statusLabel[statusKey] || statusLabel.todo}
    </span>
  );
}