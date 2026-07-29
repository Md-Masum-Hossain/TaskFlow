const priorityStyles = {
  high: 'bg-[#fee2e2] text-[#b91c1c]',
  medium: 'bg-[#fef3c7] text-[#92400e]',
  low: 'bg-[#dcfce7] text-[#166534]',
};

const priorityLabel = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export default function PriorityBadge({ priority = 'medium' }) {
  const priorityKey = priority.toLowerCase();

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[13px] font-medium ${priorityStyles[priorityKey] || priorityStyles.medium}`}>
      {priorityLabel[priorityKey] || priorityLabel.medium}
    </span>
  );
}