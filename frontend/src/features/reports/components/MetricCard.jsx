export default function MetricCard({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border bg-slate-50 p-5">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <h3 className="mt-2 text-2xl font-semibold">
        {value}
      </h3>
    </div>
  );
}