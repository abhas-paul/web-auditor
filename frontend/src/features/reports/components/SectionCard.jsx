export default function SectionCard({
  title,
  children,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-slate-900">
        {title}
      </h2>

      {children}
    </section>
  );
}