export default function TaskCard({ title, description, priority, dueDate, assignee }) {
  return (
    <article className="rounded-2xl border border-[#eaecf0] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
      <p className="text-sm font-semibold text-[#101828]">{title}</p>
      <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#667085]">{description}</p>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="rounded-full bg-[#eff8ff] px-2.5 py-1 font-medium text-[#175cd3]">{priority}</span>
        <span className="text-[#667085]">{dueDate}</span>
      </div>

      <div className="mt-3 text-xs font-medium text-[#344054]">{assignee}</div>
    </article>
  );
}