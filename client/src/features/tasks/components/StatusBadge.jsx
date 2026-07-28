const statusClasses = {
  todo: 'bg-[#f2f4f7] text-[#344054]',
  'in-progress': 'bg-[#eff8ff] text-[#175cd3]',
  completed: 'bg-[#ecfdf3] text-[#067647]',
};

const statusLabel = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export default function StatusBadge({ status = 'todo' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[status] || statusClasses.todo}`}
    >
      {statusLabel[status] || statusLabel.todo}
    </span>
  );
}