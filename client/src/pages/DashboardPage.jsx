import TaskColumn from '../features/tasks/components/TaskColumn';

const kanbanColumns = [
  {
    id: 'todo',
    title: 'To Do',
    count: 3,
    tasks: [
      {
        id: 'todo-1',
        title: 'Design landing page revisions',
        description: 'Update hero section copy and refine spacing based on review notes.',
        priority: 'High',
        dueDate: 'Due Aug 2',
        assignee: 'Masum Hossain',
      },
      {
        id: 'todo-2',
        title: 'Prepare sprint planning notes',
        description: 'Collect blockers and estimate tasks for the upcoming sprint.',
        priority: 'Medium',
        dueDate: 'Due Aug 3',
        assignee: 'Arafat Khan',
      },
      {
        id: 'todo-3',
        title: 'Review API contract updates',
        description: 'Verify endpoint field naming and align frontend payload keys.',
        priority: 'Low',
        dueDate: 'Due Aug 5',
        assignee: 'Sadia Rahman',
      },
    ],
    isLoading: false,
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    count: 0,
    tasks: [],
    isLoading: false,
  },
  {
    id: 'done',
    title: 'Done',
    count: 0,
    tasks: [],
    isLoading: true,
  },
];

export default function DashboardPage() {
  return (
    <section className="space-y-5">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[#101828]">Kanban Board</h1>
      </header>

      <div className="grid gap-4 xl:grid-cols-3">
        {kanbanColumns.map((column) => (
          <TaskColumn
            key={column.id}
            title={column.title}
            count={column.count}
            tasks={column.tasks}
            isLoading={column.isLoading}
          />
        ))}
      </div>
    </section>
  );
}
