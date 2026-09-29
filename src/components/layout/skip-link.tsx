export function SkipLink({ label, targetId = "main" }: { label: string; targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
    >
      {label}
    </a>
  );
}
