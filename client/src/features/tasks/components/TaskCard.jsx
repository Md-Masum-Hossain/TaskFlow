import { FiCalendar } from 'react-icons/fi';
import PriorityBadge from './PriorityBadge';
import TaskActionsMenu from './TaskActionsMenu';
import StatusBadge from './StatusBadge';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function formatDueDate(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export default function TaskCard({ task, overlay = false, onEdit, onDelete }) {
  const sortable = !overlay
    ? useSortable({ id: task._id })
    : null;
  // const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });
  const attributes = sortable?.attributes ?? {};
  const listeners = sortable?.listeners ?? {};
  const setNodeRef = sortable?.setNodeRef ?? undefined;
  const transform = sortable?.transform;
  const transition = sortable?.transition;
  return (
    <article className="rounded-[14px] bg-white p-5 shadow-[0_6px_18px_rgba(17,24,39,0.06)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(17,24,39,0.08)]" {...attributes} {...listeners} ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, touchAction: "none" }}>
      <div className="flex items-start justify-between gap-3">
        <StatusBadge status={task.status} />
        <div className="flex items-center gap-2">
          <PriorityBadge priority={task.priority} />
          <TaskActionsMenu onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>


      <p className="mt-3 text-[18px] font-semibold leading-6 text-[#111827]">{task.title}</p>
      <p className="mt-2 text-[16px] leading-6 text-[#6b7280]">{task.description}</p>

      <div className="mt-5 flex items-center justify-between text-[13px] text-[#9ca3af]">
        <span className="flex items-center gap-1.5">
          <FiCalendar className="h-4 w-4" />
          <span>{formatDueDate(task.dueDate)}</span>
        </span>
        <span className="font-medium text-[#6b7280]">{task.assignee}</span>
      </div>
    </article>
  );
}