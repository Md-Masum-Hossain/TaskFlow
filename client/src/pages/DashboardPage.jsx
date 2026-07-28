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
  { label: 'To Do', value: '27', tone: 'bg-[#f2f4f7] text-[#344054]' },
  { label: 'In Progress', value: '34', tone: 'bg-[#eff8ff] text-[#175cd3]' },
  { label: 'Completed', value: '81', tone: 'bg-[#ecfdf3] text-[#067647]' },
];

const prioritySummary = [
  { label: 'High Priority', value: '19' },
  { label: 'Medium Priority', value: '53' },
  { label: 'Low Priority', value: '56' },
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
    <section className={`rounded-3xl border border-[#eaecf0] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] ${className}`}>
      {children}
    </section>
  );
}

function TaskPreviewCard({ title, description, priority, dueDate, assignee }) {
  return (
    <article className="rounded-2xl border border-[#eaecf0] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-[#101828]">{title}</h4>
          <p className="mt-2 text-sm leading-5 text-[#667085]">{description}</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#eff8ff] px-2.5 py-1 text-xs font-medium text-[#175cd3]">
          {priority}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-[#667085]">
        <span>{dueDate}</span>
        <span className="font-medium text-[#344054]">{assignee}</span>
      </div>
    </article>
  );
}

function KanbanColumnPreview({ title, count, cards }) {
  return (
    <div className="min-h-[420px] rounded-3xl border border-[#eaecf0] bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#344054]">{title}</h3>
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#f2f4f7] px-2 text-xs font-medium text-[#344054]">
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
        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-[#d0d5dd] bg-[#f9fafb] px-4 text-center">
          <p className="text-sm font-medium text-[#667085]">No tasks in this column</p>
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
            <div className="flex items-center gap-3">
              <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-medium ${item.tone || 'bg-[#f2f4f7] text-[#344054]'}`}>
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

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-[#667085]">Overview</p>
          <h1 className="mt-1 text-[32px] font-semibold tracking-[-0.03em] text-[#101828]">
            Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
            Track team progress, review current workload, and keep priorities visible from a single workspace view.
          </p>
        </div>

        <div className="inline-flex items-center rounded-full border border-[#d0d5dd] bg-white px-3 py-2 text-sm font-medium text-[#344054]">
          Updated just now
        </div>
      </header>

      <section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((card) => (
            <SectionCard key={card.label} className="p-5">
              <p className="text-sm font-medium text-[#667085]">{card.label}</p>
              <p className="mt-4 text-[40px] font-semibold leading-none tracking-[-0.04em] text-[#101828]">
                {card.value}
              </p>
              <p className="mt-3 text-sm text-[#667085]">{card.detail}</p>
            </SectionCard>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#101828]">Kanban Board Preview</h2>
          <span className="text-sm text-[#667085]">Static mock data</span>
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
