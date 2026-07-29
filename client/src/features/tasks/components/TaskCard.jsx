import { FiCalendar } from 'react-icons/fi';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';

export default function TaskCard({ title, description, priority, dueDate, assignee, status = 'todo' }) {
  return (
    <article className="rounded-[14px] bg-white p-5 shadow-[0_6px_18px_rgba(17,24,39,0.06)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(17,24,39,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <StatusBadge status={status} />
        <PriorityBadge priority={priority} />
      </div>

      <p className="mt-3 text-[18px] font-semibold leading-6 text-[#111827]">{title}</p>
      <p className="mt-2 text-[16px] leading-6 text-[#6b7280]">{description}</p>

      <div className="mt-5 flex items-center justify-between text-[13px] text-[#9ca3af]">
        <span className="flex items-center gap-1.5">
          <FiCalendar className="h-4 w-4" />
          <span>{dueDate}</span>
        </span>
        <span className="font-medium text-[#6b7280]">{assignee}</span>
      </div>
    </article>
  );
}