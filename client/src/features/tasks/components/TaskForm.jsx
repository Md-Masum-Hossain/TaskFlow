import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Textarea from '../../../components/ui/Textarea';

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export default function TaskForm({ initialTask = {} }) {
  return (
    <form className="space-y-4">
      <Input
        id="task-title"
        label="Title"
        placeholder="Enter task title"
        defaultValue={initialTask.title || ''}
      />

      <Textarea
        id="task-description"
        label="Description"
        placeholder="Describe task details"
        defaultValue={initialTask.description || ''}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          id="task-status"
          label="Status"
          defaultValue={initialTask.status || 'todo'}
          options={statusOptions}
        />

        <Select
          id="task-priority"
          label="Priority"
          defaultValue={initialTask.priority || 'medium'}
          options={priorityOptions}
        />
      </div>

      <Input
        id="task-due-date"
        type="date"
        label="Due date"
        defaultValue={initialTask.dueDate || ''}
      />
    </form>
  );
}
