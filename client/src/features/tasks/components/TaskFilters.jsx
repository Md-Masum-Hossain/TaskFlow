import Select from '../../../components/ui/Select';

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const priorityOptions = [
  { value: 'all', label: 'All Priority' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export default function TaskFilters() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Select id="filter-status" label="Status" options={statusOptions} defaultValue="all" />
      <Select id="filter-priority" label="Priority" options={priorityOptions} defaultValue="all" />
    </div>
  );
}
