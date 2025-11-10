const highlights = [
  {
    title: 'Today’s revenue',
    metric: '$4,830.42',
    description: 'Online + in-store sales combined'
  },
  {
    title: 'Orders to fulfil',
    metric: '36',
    description: 'Awaiting packing or pickup'
  },
  {
    title: 'Low stock alerts',
    metric: '12',
    description: 'Variants under safety threshold'
  }
];

const tasks = [
  'Publish new arrivals to storefront',
  'Respond to 4 customer inquiries',
  'Review settlements & payouts'
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <h1 className="text-lg font-semibold tracking-tight">Merchant Workspace</h1>
          <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-white/80" type="button">
            Create catalogue update
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-10">
        <section className="grid gap-6 md:grid-cols-3">
          {highlights.map((card) => (
            <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">{card.title}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{card.metric}</p>
              <p className="mt-2 text-xs text-white/60">{card.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <header className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Sales performance</h2>
              <button className="text-sm font-medium text-white/70 transition hover:text-white" type="button">
                View analytics
              </button>
            </header>
            <p className="mt-4 text-sm text-white/70">
              Plug your preferred charting or BI tool here. Use the backend analytics API to populate this component with real data from your
              marketplace.
            </p>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Action list</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {tasks.map((task) => (
                <li key={task} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  <span className="text-white/80">{task}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </main>
    </div>
  );
}
