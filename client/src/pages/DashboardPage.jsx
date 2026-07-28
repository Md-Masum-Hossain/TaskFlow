const overviewCards = [
  {
    label: 'Total Tasks',
    value: '128',
    detail: '+12 this week',
  },
  {
    label: 'In Progress',
    value: '34',
    detail: '27% of all tasks',
  },
  {
    label: 'Completed',
    value: '81',
    detail: '63% completion rate',
  },
  {
    label: 'Overdue',
    value: '13',
    detail: 'Needs attention',
  },
];

const filterItems = ['All tasks', 'Today', 'This week'];

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
            Track team progress, review current workload, and keep priorities visible from a single
            workspace view.
          </p>
        </div>

        <div className="inline-flex items-center rounded-full border border-[#d0d5dd] bg-white px-3 py-2 text-sm font-medium text-[#344054]">
          Updated just now
        </div>
      </header>

      <section className="rounded-3xl border border-[#eaecf0] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="w-full max-w-xl">
            <label className="mb-2 block text-sm font-medium text-[#344054]" htmlFor="dashboard-search">
              Search
            </label>
            <div className="flex h-11 items-center rounded-xl border border-[#d0d5dd] bg-white px-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[#98a2b3]"
              >
                <path
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                id="dashboard-search"
                type="text"
                placeholder="Search tasks, projects, or assignees"
                className="ml-2 w-full border-0 bg-transparent text-sm text-[#101828] outline-none placeholder:text-[#98a2b3]"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[#344054]">Filter</p>
            <div className="flex flex-wrap gap-2">
              {filterItems.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={`h-11 rounded-full px-4 text-sm font-medium ${
                    index === 0
                      ? 'bg-[#2563eb] text-white'
                      : 'border border-[#d0d5dd] bg-white text-[#344054]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#101828]">Overview cards</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((card) => (
            <article
              key={card.label}
              className="rounded-3xl border border-[#eaecf0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
            >
              <p className="text-sm font-medium text-[#667085]">{card.label}</p>
              <p className="mt-4 text-[40px] font-semibold leading-none tracking-[-0.04em] text-[#101828]">
                {card.value}
              </p>
              <p className="mt-3 text-sm text-[#667085]">{card.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
