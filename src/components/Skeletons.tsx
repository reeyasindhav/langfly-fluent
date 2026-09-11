import { cn } from "../lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded bg-[#e8e4dc]", className)} {...props} />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-[#e8e4dc] bg-white p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-8 w-72" />
        </div>
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      <div className="rounded-3xl bg-[#183d2c] p-7 md:p-9 space-y-4">
        <Skeleton className="h-6 w-40 rounded-full bg-white/10" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-10 w-24 rounded-full" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-48" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-6 w-6 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="rounded-2xl p-4 border border-[#e8e4dc] space-y-3">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-8 w-16" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3 w-48" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-[#e8e4dc] bg-white p-5 space-y-4">
                <Skeleton className="size-10 rounded-full bg-[#d7e780]" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-1.5 w-full rounded-full bg-[#f0ede6]" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-[#e8e4dc] bg-white p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="size-4" />
              </div>
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-10 w-full rounded-full" />
              <Skeleton className="h-10 w-full rounded-full border" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RoadmapSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-72" />
        </div>
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="grid grid-cols-12 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="col-span-12 sm:col-span-6 lg:col-span-3 rounded-xl border border-[#e8e4dc] bg-white p-5 space-y-3"
          >
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => (
                <Skeleton key={j} className="size-2 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FlashcardSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-2xl border border-[#e8e4dc] bg-white p-8 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-3">
          <Skeleton className="flex-1 h-10 rounded-md" />
          <Skeleton className="flex-1 h-10 rounded-md" />
          <Skeleton className="flex-1 h-10 rounded-md" />
        </div>
      </div>
      <div className="rounded-2xl border border-[#e8e4dc] bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2 border-b border-[#e8e4dc]/50 last:border-0"
            >
              <Skeleton className="size-5 rounded-full" />
              <Skeleton className="flex-1 h-4" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PracticeSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-72" />
        </div>
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-10 w-full rounded-xl border" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-xl border border-[#e8e4dc] bg-white p-5 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full bg-[#d7e780]" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProgressSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-72" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-[#e8e4dc] bg-white p-6 space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-[#e8e4dc] bg-white p-6 space-y-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-3 w-1/2" />
        <div className="h-64 rounded-lg bg-[#f0ede6]" />
      </div>
    </div>
  );
}

export function NavSkeleton() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#e8e4dc] bg-[#fbf9f4]/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Skeleton className="size-8 rounded-lg" />
        <div className="hidden md:flex items-center gap-7">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </header>
  );
}

export function SidebarSkeleton() {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col justify-between border-r border-[#e8e4dc] bg-[#fbf9f4] p-5 fixed top-0 bottom-0 z-30 animate-fade-in">
      <div className="space-y-6">
        <Skeleton className="flex items-center gap-3 h-10 w-48" />
        <Skeleton className="h-3 w-20" />
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-xl" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="rounded-2xl h-40 w-full" />
        <div className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </aside>
  );
}
