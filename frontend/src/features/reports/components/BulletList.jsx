export default function BulletList({
  items = [],
}) {
  if (!items.length)
    return (
      <p className="text-slate-500">
        Nothing to show.
      </p>
    );

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-3"
        >
          <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />

          <span className="text-slate-700">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}