import TaskItem from './TaskItem';

const sampleTasks = [
  {
    id: 'task-1',
    title: 'Finalize sprint backlog',
    description: 'Review priorities and confirm estimates with the team.',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 'task-2',
    title: 'Document release checklist',
    description: 'Prepare production checklist for deployment.',
    status: 'todo',
    priority: 'medium',
  },
];

export default function TaskList({ tasks = sampleTasks }) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          priority={task.priority}
        />
      ))}
    </div>
  );
}
