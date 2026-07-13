export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-white/5" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-7 w-20 animate-pulse rounded-full bg-white/5" />
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-card">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 border-b border-white/5 px-4 py-4 last:border-b-0"
          >
            <div className="space-y-2">
              <div className="h-4 w-40 animate-pulse rounded bg-white/5" />
              <div className="h-3 w-56 animate-pulse rounded bg-white/5" />
            </div>
            <div className="h-6 w-20 animate-pulse rounded-full bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
