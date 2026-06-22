export default function GlassCard({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div
        className="
        rounded-3xl
        border
        border-border
        bg-card
        backdrop-blur-xl
        shadow-xl
        p-6
        "
      >
        {children}
      </div>
    );
  }
