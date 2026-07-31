import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';

export default function TaskColumn({ id, title, count, tasks = [], isLoading = false, onEditTask = () => {}, onDeleteTask = () => {} }) {
  const { setNodeRef } = useDroppable({
    id
  })
  return (
    <section ref={setNodeRef} className="min-h-[420px] rounded-[18px] bg-[#eef3ff] p-5 shadow-none">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-[20px] font-bold tracking-[-0.01em] text-[#111827]">{title}</h3>
        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-white/70 px-2 text-[13px] font-semibold text-[#6b7280]">
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
              key={task._id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task)}
            />
          ))}
        </div>
      )}
    </section>
  );
}