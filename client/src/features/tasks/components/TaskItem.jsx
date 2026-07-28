import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';

export default function TaskItem({
  title = 'Untitled task',
  description = 'No description provided.',
  status = 'todo',
  priority = 'medium',
}) {
  return (
    <article className="rounded-2xl border border-[#eaecf0] bg-white p-4">
      <h4 className="text-sm font-semibold text-[#101828]">{title}</h4>
      <p className="mt-1.5 text-sm text-[#667085]">{description}</p>
      <div className="mt-3 flex items-center gap-2">
        <StatusBadge status={status} />
        <PriorityBadge priority={priority} />
      </div>
    </article>
  );
}
