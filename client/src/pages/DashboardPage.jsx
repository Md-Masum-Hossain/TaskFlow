import PriorityBadge from '../features/tasks/components/PriorityBadge';
import { getPriorityBadgeClass, getPriorityTextClass, getStatusBadgeClass, getStatusTextClass } from '../features/tasks/utils/badgeVariants';

const stats = [
  {
    label: 'Total Tasks',
    value: '128',
    detail: '+12 since last week',
  },
  {
    label: 'In Progress',
    value: '34',
    detail: 'Work currently active',
  },
  {
    label: 'Completed',
    value: '81',
    detail: 'Tasks delivered on time',
  },
  {
    label: 'Overdue',
    value: '13',
    detail: 'Needs immediate attention',
  },
];

const statusSummary = [
  { label: 'To Do', value: '27', tone: getStatusBadgeClass('todo'), labelTone: getStatusTextClass('todo') },
  { label: 'In Progress', value: '34', tone: getStatusBadgeClass('in-progress'), labelTone: getStatusTextClass('in-progress') },
  { label: 'Completed', value: '81', tone: getStatusBadgeClass('completed'), labelTone: getStatusTextClass('completed') },
];

const prioritySummary = [
  { label: 'High Priority', value: '19', tone: getPriorityBadgeClass('high'), labelTone: getPriorityTextClass('high') },
  { label: 'Medium Priority', value: '53', tone: getPriorityBadgeClass('medium'), labelTone: getPriorityTextClass('medium') },
  { label: 'Low Priority', value: '56', tone: getPriorityBadgeClass('low'), labelTone: getPriorityTextClass('low') },
];

const kanbanColumns = [
  {
    id: 'todo',
    title: 'To Do',
    count: 3,
    cards: [
      {
        title: 'Design landing page revisions',
        description: 'Refine copy hierarchy and spacing based on the latest review.',
        priority: 'High',
        dueDate: 'Due Aug 2',
        assignee: 'Masum Hossain',
      },
      {
        title: 'Prepare sprint planning notes',
        description: 'Collect blockers and estimate work for the upcoming sprint.',
        priority: 'Medium',
        dueDate: 'Due Aug 3',
        assignee: 'Arafat Khan',
      },
    ],
  },
  {
    id: 'progress',
    title: 'In Progress',
    count: 2,
    cards: [
      {
        title: 'Review API contract updates',
        description: 'Align payload fields with the backend contract changes.',
        priority: 'Low',
        dueDate: 'Due Aug 5',
        assignee: 'Sadia Rahman',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    count: 4,
    cards: [],
  },
];

const taskSummarySections = [
  {
    title: 'Tasks by Status',
    items: statusSummary,
  },
  {
    title: 'Tasks by Priority',
    items: prioritySummary,
  },
];

function SectionCard({ children, className = '' }) {
  return (
    <section className={`rounded-[14px] border border-[#e5e7eb] bg-white shadow-[0_6px_18px_rgba(17,24,39,0.06)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(17,24,39,0.08)] ${className}`}>
      {children}
    </section>
  );
}

function TaskPreviewCard({ title, description, priority, dueDate, assignee }) {
  return (
    <article className="rounded-[14px] bg-white p-5 shadow-[0_6px_18px_rgba(17,24,39,0.06)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(17,24,39,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-[18px] font-semibold leading-6 text-[#111827]">{title}</h4>
          <p className="mt-2 text-[16px] leading-6 text-[#6b7280]">{description}</p>
        </div>
        <PriorityBadge priority={priority} />
      </div>

      <div className="mt-5 flex items-center justify-between text-[13px] text-[#9ca3af]">
        <span>{dueDate}</span>
        <span className="font-medium text-[#6b7280]">{assignee}</span>
      </div>
    </article>
  );
}

function SummaryTone({ value, label, tone, labelTone = tone }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-medium ${tone}`}>
        {value}
      </span>
      <span className={`text-sm font-medium ${labelTone}`}>{label}</span>
    </div>
  );
}

function KanbanColumnPreview({ title, count, cards }) {
  return (
    <div className="min-h-[420px] rounded-[18px] bg-[#eef3ff] p-5 shadow-none">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[20px] font-bold tracking-[-0.01em] text-[#111827]">{title}</h3>
        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-white/70 px-2 text-[13px] font-semibold text-[#6b7280]">
          {count}
        </span>
      </div>

      {cards.length > 0 ? (
        <div className="space-y-3">
          {cards.map((card) => (
            <TaskPreviewCard key={card.title} {...card} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-[#d0d5dd] bg-white px-4 text-center shadow-[0_6px_18px_rgba(17,24,39,0.06)]">
          <p className="text-[16px] font-medium text-[#6b7280]">No tasks in this column</p>
        </div>
      )}
    </div>
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
            <SummaryTone value={item.value} label={item.label} tone={item.tone || 'bg-gray-100 text-gray-700'} labelTone={item.labelTone || 'text-gray-700'} />
            <span className="text-sm text-[#6b7280]">Tasks</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[13px] font-medium text-[#6b7280]">Overview</p>
          <h1 className="mt-1 text-[36px] font-bold tracking-[-0.04em] text-[#111827]">
            Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-[16px] leading-6 text-[#6b7280]">
            Track team progress, review current workload, and keep priorities visible from a single workspace view.
          </p>
        </div>

        <div className="inline-flex items-center rounded-full border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] font-medium text-[#6b7280]">
          Updated just now
        </div>
      </header>

      <section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((card) => (
            <SectionCard key={card.label} className="p-5">
              <p className="text-[13px] font-medium text-[#6b7280]">{card.label}</p>
              <p className="mt-4 text-[40px] font-bold leading-none tracking-[-0.04em] text-[#111827]">
                {card.value}
              </p>
              <p className="mt-3 text-[16px] text-[#6b7280]">{card.detail}</p>
            </SectionCard>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#111827]">Kanban Board Preview</h2>
          <span className="text-[13px] text-[#9ca3af]">Static mock data</span>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {kanbanColumns.map((column) => (
            <KanbanColumnPreview key={column.id} title={column.title} count={column.count} cards={column.cards} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {taskSummarySections.map((section) => (
          <SummaryList key={section.title} title={section.title} items={section.items} />
        ))}
      </section>
    </div>
  );
}
