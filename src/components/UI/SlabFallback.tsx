export function SlabFallback() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center bg-base"
      aria-hidden="true"
    >
      <div
        className="h-[42vh] w-[28vh] rounded-2xl border border-line bg-paper/5 shadow-[0_0_80px_rgba(245,244,239,0.06)]"
      />
    </div>
  )
}
