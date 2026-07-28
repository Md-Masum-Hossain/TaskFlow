const priorityClasses = {
  low: 'bg-[#f0f9ff] text-[#026aa2]',
  medium: 'bg-[#fffaeb] text-[#b54708]',
  high: 'bg-[#fef3f2] text-[#b42318]',
};

const priorityLabel = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export default function PriorityBadge({ priority = 'medium' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${priorityClasses[priority] || priorityClasses.medium}`}
    >
      {priorityLabel[priority] || priorityLabel.medium}
    </span>
  );
}