const statusStyles = {
  todo: 'bg-[#f3f4f6] text-[#6b7280]',
  'in-progress': 'bg-[#eff6ff] text-[#2563eb]',
  completed: 'bg-[#ecfdf3] text-[#16a34a]',
};

const statusLabel = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export default function StatusBadge({ status = 'todo' }) {
  const statusKey = status.toLowerCase();

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[13px] font-medium ${statusStyles[statusKey] || statusStyles.todo}`}>
      {statusLabel[statusKey] || statusLabel.todo}
    </span>
  );
}