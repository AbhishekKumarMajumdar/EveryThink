import { PrimaryButton } from "@ecommerce/ui";

const heroStats = [
  { value: '250k+', label: 'Happy Customers' },
  { value: '48h', label: 'Average Delivery' },
  { value: '1,200+', label: 'Partner Stores' }
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-50">
      <header className="border-b border-white/10 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="text-lg font-semibold tracking-tight">Chiku Commerce</span>
          <nav className="flex items-center gap-6 text-sm text-zinc-300">
            <a className="transition hover:text-white" href="#features">
              Features
            </a>
            <a className="transition hover:text-white" href="#partners">
              Partners
            </a>
            <a className="rounded-full bg-white px-4 py-2 font-medium text-zinc-900 transition hover:bg-white/80" href="#catalog">
              Explore Catalog
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-20 px-6 py-20">
        <section className="grid gap-16 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-8">
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-300">
              Smart omnichannel retail
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Scale your brand with experiences your customers will love.
            </h1>
            <p className="max-w-2xl text-lg text-zinc-300">
              Launch your storefront, manage marketplace sellers, coordinate delivery partners,
              and monitor performance from unified dashboards. Built with Next.js, Tailwind CSS,
              and a modular backend so your teams can ship features quickly.
            </p>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton as="a" href="#admin">
                View Admin Console
              </PrimaryButton>
              <PrimaryButton as="a" href="#docs" variant="outline">
                API Documentation
              </PrimaryButton>
            </div>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-lg font-medium text-white">Platform snapshot</h2>
            <p className="mt-3 text-sm text-zinc-300">
              Built for teams managing multi-channel commerce and last-mile delivery.
            </p>
            <dl className="mt-8 grid gap-6">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs uppercase text-zinc-400">{stat.label}</dt>
                  <dd className="text-2xl font-semibold text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>

        <section id="features" className="rounded-3xl border border-white/10 bg-white/5 p-10">
          <h2 className="text-2xl font-semibold text-white">One platform, four mission-critical apps</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <FeatureCard
              title="Storefront"
              description="Personalised shopping journeys with real-time inventory, wishlists, and promotions."
              href="/"
            />
            <FeatureCard
              title="Admin Console"
              description="Centralise catalogue, pricing, and campaign management to keep teams aligned."
              href="/apps/admin"
            />
            <FeatureCard
              title="Delivery Panel"
              description="Assign orders, optimise routes, and track fulfilment with live updates."
              href="/apps/delivery"
            />
            <FeatureCard
              title="Merchant Dashboard"
              description="Empower marketplace sellers with insights, settlement status, and inventory tools."
              href="/apps/shopkeeper"
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-zinc-950/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Chiku Commerce. Built for scalability.</p>
          <p>
            Backend docs available at <span className="font-medium text-white">http://localhost:4000/docs</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  href: string;
};

function FeatureCard({ title, description, href }: FeatureCardProps) {
  return (
    <a className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-950/60 p-6 transition hover:border-white/40 hover:bg-zinc-900/80" href={href}>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-zinc-300">{description}</p>
      <span className="text-sm font-medium text-white/80">Explore →</span>
    </a>
  );
}
