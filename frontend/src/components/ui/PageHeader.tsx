type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-semibold text-white md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
        {description}
      </p>
    </header>
  );
}
