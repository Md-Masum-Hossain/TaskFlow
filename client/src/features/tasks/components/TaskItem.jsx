import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import TaskActionsMenu from './TaskActionsMenu';

export default function TaskItem({
  title = 'Untitled task',
  description = 'No description provided.',
  status = 'todo',
  priority = 'medium',
  onEdit,
  onDelete,
}) {
  return (
    <article className="relative rounded-2xl border border-[#eaecf0] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-[#101828]">{title}</h4>
          <p className="mt-1.5 text-sm text-[#667085]">{description}</p>
        </div>
        {(onEdit || onDelete) ? <TaskActionsMenu onEdit={onEdit} onDelete={onDelete} /> : null}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <StatusBadge status={status} />
        <PriorityBadge priority={priority} />
      </div>
    </article>
  );
}
