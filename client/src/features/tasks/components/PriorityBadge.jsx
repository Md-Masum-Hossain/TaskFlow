import { getPriorityBadgeClass } from '../utils/badgeVariants';

const priorityLabel = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export default function PriorityBadge({ priority = 'medium' }) {
  const priorityKey = String(priority).toLowerCase();

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[13px] font-medium ${getPriorityBadgeClass(priorityKey)}`}>
      {priorityLabel[priorityKey] || priorityLabel.medium}
    </span>
  );
}