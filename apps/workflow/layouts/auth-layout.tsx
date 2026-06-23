export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-background flex justify-center items-center p-5 lg:p-0">
      {/* Shader gradient background */}
      <div
        className="fixed inset-0 pointer-events-none select-none"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 80% 55% at 0% 20%, color-mix(in oklab, var(--primary) 35%, transparent), transparent)",
            "radial-gradient(ellipse 60% 70% at 100% 80%, color-mix(in oklab, var(--accent-foreground) 25%, transparent), transparent)",
            "radial-gradient(ellipse 50% 60% at 50% 50%, color-mix(in oklab, var(--chart-2) 15%, transparent), transparent)",
          ].join(", "),
        }}
      />
      {children}
    </div>
  )
}
