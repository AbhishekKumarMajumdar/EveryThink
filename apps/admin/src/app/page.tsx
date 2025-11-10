const tiles = [
  {
    title: 'Orders',
    metric: '1,248',
    delta: '+12.4%',
    description: 'New orders in the last 24 hours'
  },
  {
    title: 'Revenue',
    metric: '$182k',
    delta: '+8.9%',
    description: 'Net revenue week over week'
  },
  {
    title: 'Inventory Alerts',
    metric: '34',
    delta: '-5',
    description: 'SKUs below safety stock'
  },
  {
    title: 'Campaigns',
    metric: '7 live',
    delta: '+2',
    description: 'Active omni-channel promotions'
  }
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-6">
          <h1 className="text-xl font-semibold tracking-tight">Admin Control Center</h1>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full border border-white/10 px-3 py-1 text-white/80">Production</span>
            <button className="rounded-full bg-white px-4 py-2 font-medium text-slate-900 transition hover:bg-white/80" type="button">
              Create Campaign
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-8 py-12">
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <div key={tile.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-white/80">{tile.title}</h2>
                <span className="text-xs text-emerald-300">{tile.delta}</span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-white">{tile.metric}</p>
              <p className="mt-2 text-xs text-white/60">{tile.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <header className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Marketplace overview</h2>
              <button className="text-sm font-medium text-emerald-200 hover:text-emerald-100" type="button">
                Export CSV
              </button>
            </header>
            <ul className="mt-6 space-y-4 text-sm text-white/70">
              <li className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span>Top performing seller</span>
                <span className="font-medium text-white">Urban Threads</span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span>Pending onboarding approvals</span>
                <span className="font-medium text-white">5</span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span>Catalog completeness</span>
                <span className="font-medium text-white">92%</span>
              </li>
            </ul>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Quick actions</h2>
            <div className="mt-6 grid gap-4 text-sm text-white/70">
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/40 hover:bg-white/10" type="button">
                Invite new operator
              </button>
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/40 hover:bg-white/10" type="button">
                Sync ERP inventory
              </button>
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/40 hover:bg-white/10" type="button">
                Configure payment gateway
              </button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
