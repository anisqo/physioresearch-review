type SectionHeadingProps = {
  label: string;
  title?: string;
  align?: "left" | "split";
};

export function SectionHeading({ label, title, align = "left" }: SectionHeadingProps) {
  if (align === "split") {
    return (
      <div className="grid gap-6 border-t border-[color:var(--line)] pt-6 md:grid-cols-[0.35fr_0.65fr]">
        <p className="text-[12px] uppercase tracking-[0.24em] text-[color:var(--quiet)]">{label}</p>
        {title ? <h2 className="font-editorial text-4xl leading-tight tracking-[-0.03em] md:text-5xl">{title}</h2> : null}
      </div>
    );
  }

  return (
    <div className="border-t border-[color:var(--line)] pt-6">
      <p className="text-[12px] uppercase tracking-[0.24em] text-[color:var(--quiet)]">{label}</p>
      {title ? <h2 className="mt-4 font-editorial text-4xl leading-tight tracking-[-0.03em] md:text-5xl">{title}</h2> : null}
    </div>
  );
}
