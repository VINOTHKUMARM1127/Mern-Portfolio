export default function GlobalLoader() {
 return <div role="status" aria-label="Loading page" className="min-h-screen bg-surface px-6 pt-32"><div className="max-w-6xl mx-auto"><span className="sr-only">Loading page…</span><div aria-hidden="true" className="animate-pulse"><div className="h-6 w-36 bg-ink/10 rounded mb-8"/><div className="h-12 w-3/4 bg-ink/10 rounded mb-5"/><div className="h-6 w-2/3 bg-ink/10 rounded mb-12"/><div className="grid md:grid-cols-3 gap-6">{[0,1,2].map(i=><div key={i} className="h-60 rounded-3xl bg-ink/5 border border-ink/10"/>)}</div></div></div></div>;
}
