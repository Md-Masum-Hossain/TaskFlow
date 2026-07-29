import { useState } from 'react';

import TaskColumn from '../features/tasks/components/TaskColumn';
import TaskModal from '../components/tasks/TaskModal';
import { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from '../features/tasks/api/tasksApi';





function SectionCard({ children, className = '' }) {
  return (
    <section className={`rounded-3xl border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04)] ${className}`}>
      {children}
    </section>
  );
}

function SummaryList({ title, items }) {
  return (
    <SectionCard className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#101828]">{title}</h3>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-2xl bg-[#f9fafb] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-medium ${item.tone}`}>
                {item.value}
              </span>
              <span className="text-sm font-medium text-[#344054]">{item.label}</span>
            </div>
            <span className="text-sm text-[#667085]">Tasks</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default function TasksPage() {

  const { data: tasksData, isLoading, isError } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const kanbanColumns = [
    {
      id: 'todo',
      title: 'To Do',
      count: tasksData?.filter((task) => task.status === 'todo').length || 0,
      tasks: tasksData?.filter((task) => task.status === 'todo') || [],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      count: tasksData?.filter((task) => task.status === 'in-progress').length || 0,
      tasks: tasksData?.filter((task) => task.status === 'in-progress') || [],
    },
    {
      id: 'completed',
      title: 'Completed',
      count: tasksData?.filter((task) => task.status === 'completed').length || 0,
      tasks: tasksData?.filter((task) => task.status === 'completed') || [],
    },
  ];

  const summarySections = [
    {
      title: 'Task Summary',
      items: [
        { label: 'To Do', value: kanbanColumns[0].count, tone: 'bg-[#f2f4f7] text-[#344054]' },
        { label: 'In Progress', value: kanbanColumns[1].count, tone: 'bg-[#eff8ff] text-[#175cd3]' },
        { label: 'Completed', value: kanbanColumns[2].count, tone: 'bg-[#ecfdf3] text-[#067647]' },
      ],
    },
    {
      title: 'Tasks by Priority',
      items: [
        { label: 'High Priority', value: tasksData?.filter((task) => task.priority === 'high').length || 0, tone: 'bg-[#fef3f2] text-[#b42318]' },
        { label: 'Medium Priority', value: tasksData?.filter((task) => task.priority === 'medium').length || 0, tone: 'bg-[#fffaeb] text-[#b54708]' },
        { label: 'Low Priority', value: tasksData?.filter((task) => task.priority === 'low').length || 0, tone: 'bg-[#eff8ff] text-[#175cd3]' },
      ],
    },
  ];

  const [modalState, setModalState] = useState({
    open: false,
    mode: 'create',
    initialValues: null,
  });

  const openCreateModal = () => {
    setModalState({
      open: true,
      mode: 'create',
      initialValues: null,
    });
  };

  const openEditModal = (task) => {
    setModalState({
      open: true,
      mode: 'edit',
      initialValues: task,
    });
  };

  const closeModal = () => {
    setModalState((current) => ({ ...current, open: false }));
  };

  const handleSubmitTask = async (taskData) => {
    try {
      if (modalState.mode === 'create') {
        await createTask(taskData).unwrap();
      } else if (modalState.mode === 'edit') {
          await updateTask({
            id: taskData._id,
            ...taskData,
          }).unwrap();
      }
    } catch (error) {
      console.error('Error submitting task:', error);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[13px] font-medium text-[#6b7280]">Tasks</p>
          <h1 className="mt-1 text-[36px] font-bold tracking-[-0.04em] text-[#111827]">
            Task Page
          </h1>
          <p className="mt-2 max-w-2xl text-[16px] leading-6 text-[#6b7280]">
            View and organize active work with a lightweight static task board preview.
          </p>
        </div>

        <div className="inline-flex items-center rounded-full border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] font-medium text-[#6b7280]">
          Updated today
        </div>
      </header>

      <section className="rounded-3xl border border-[#e5e7eb] bg-white p-4 shadow-[0_1px_2px_rgba(17,24,39,0.04)] sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="grid w-full gap-4 xl:grid-cols-[minmax(0,1fr)_200px_200px]">
            <div>
              <label className="mb-2 block text-[13px] font-medium text-[#6b7280]" htmlFor="task-search">
                Search
              </label>
              <div className="flex h-[52px] items-center rounded-xl border border-[#d1d5db] bg-white px-4">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0 text-[#9ca3af]">
                  <path
                    d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  id="task-search"
                  type="text"
                  placeholder="Search tasks"
                  className="ml-2 w-full border-0 bg-transparent text-[16px] text-[#111827] outline-none placeholder:text-[#9ca3af]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-medium text-[#6b7280]" htmlFor="priority-filter">
                Priority filter
              </label>
              <button
                id="priority-filter"
                type="button"
                className="flex h-[52px] w-full items-center justify-between rounded-xl border border-[#d1d5db] bg-white px-4 text-[16px] text-[#111827]"
              >
                <span>All priorities</span>
                <span className="text-[#9ca3af]">▾</span>
              </button>
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-medium text-[#6b7280]" htmlFor="status-filter">
                Status filter
              </label>
              <button
                id="status-filter"
                type="button"
                className="flex h-[52px] w-full items-center justify-between rounded-xl border border-[#d1d5db] bg-white px-4 text-[16px] text-[#111827]"
              >
                <span>All statuses</span>
                <span className="text-[#9ca3af]">▾</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-xl border border-[#d1d5db] bg-white p-1">
              <button type="button" className="rounded-lg bg-[#eff6ff] px-3 py-2 text-[16px] font-medium text-[#2563eb] transition-colors duration-150 hover:bg-[#dbeafe]">
                Board
              </button>
              <button type="button" className="rounded-lg px-3 py-2 text-[16px] font-medium text-[#6b7280] transition-colors duration-150 hover:text-[#111827]">
                List
              </button>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-[52px] items-center justify-center rounded-[10px] bg-[#2563eb] px-4 text-[16px] font-semibold text-white transition-colors duration-150 hover:bg-[#1d4ed8]"
            >
              Add Task
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#111827]">Task Overview</h2>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {kanbanColumns.map((column) => (
            <TaskColumn
              key={column.id}
              title={column.title}
              count={column.count}
              tasks={column.tasks}
              onEditTask={openEditModal}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {summarySections.map((section) => (
          <SummaryList key={section.title} title={section.title} items={section.items} />
        ))}
      </section>

      <TaskModal
        open={modalState.open}
        mode={modalState.mode}
        initialValues={modalState.initialValues || undefined}
        onClose={closeModal}
        onSubmit={handleSubmitTask}
      />
    </div>
  );
}