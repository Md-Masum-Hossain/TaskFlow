import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import TaskCard from './TaskCard';

export default function TaskColumn({ title, count, tasks = [], isLoading = false }) {
  return (
    <section className="min-h-[420px] rounded-3xl border border-[#eaecf0] bg-white p-4 sm:p-5">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#344054]">{title}</h3>
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#f2f4f7] px-2 text-xs font-medium text-[#344054]">
          {count}
        </span>
      </header>

      {isLoading ? (
        <LoadingState />
      ) : tasks.length === 0 ? (
        <EmptyState message="No tasks in this column" />
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              dueDate={task.dueDate}
              assignee={task.assignee}
            />
          ))}
        </div>
      )}
    </section>
  );
}