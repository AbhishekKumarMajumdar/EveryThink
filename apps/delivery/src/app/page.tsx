const fleet = [
  { status: 'En route', count: 128, tone: 'text-emerald-300' },
  { status: 'At hub', count: 47, tone: 'text-cyan-300' },
  { status: 'Delayed', count: 9, tone: 'text-amber-300' }
];

const upcoming = [
  { id: 'ORD-4219', window: '09:00 - 10:00', address: '42 Market Street', type: 'Express' },
  { id: 'ORD-4220', window: '09:30 - 11:00', address: '15 Rose Avenue', type: 'Scheduled' },
  { id: 'ORD-4221', window: '10:15 - 12:00', address: '88 Harbor Road', type: 'Bulk' }
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <h1 className="text-lg font-semibold tracking-tight">Delivery Command Center</h1>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full border border-white/10 px-3 py-1 text-white/80">Live</span>
            <button className="rounded-full bg-white px-4 py-2 font-medium text-zinc-900 transition hover:bg-white/80" type="button">
              Assign New Route
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-10">
        <section className="grid gap-6 sm:grid-cols-3">
          {fleet.map((entry) => (
            <div key={entry.status} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">{entry.status}</p>
              <p className={`mt-4 text-3xl font-semibold ${entry.tone}`}>{entry.count}</p>
              <p className="mt-2 text-xs text-white/60">Drivers</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[3fr,2fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <header className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Upcoming windows</h2>
              <button className="text-sm font-medium text-white/70 hover:text-white" type="button">
                View schedule
              </button>
            </header>
            <ul className="mt-6 space-y-3 text-sm">
              {upcoming.map((stop) => (
                <li key={stop.id} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                  <div>
                    <p className="font-medium text-white">{stop.id}</p>
                    <p className="text-xs text-white/60">{stop.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase text-white/50">{stop.type}</p>
                    <p className="text-sm text-white/80">{stop.window}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Live tracking</h2>
            <p className="mt-4 text-sm text-white/70">
              Integrate the real-time delivery feed here. Use websockets or SSE to stream driver location updates and route events.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-xs text-white/60">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-white">Driver 204</p>
                <p>ETA update: 14 min</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-white">Hub South</p>
                <p>New manifest uploaded • 3 pallets</p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
