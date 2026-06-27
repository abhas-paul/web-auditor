export default function ScoreCard({
  title,
  score,
}) {
  let color =
    "text-red-600 bg-red-50 border-red-200";

  if (score >= 90)
    color =
      "text-green-600 bg-green-50 border-green-200";
  else if (score >= 75)
    color =
      "text-blue-600 bg-blue-50 border-blue-200";
  else if (score >= 50)
    color =
      "text-yellow-600 bg-yellow-50 border-yellow-200";

  return (
    <div className={`rounded-xl border p-5 ${color}`}>
      <p className="text-sm font-medium">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        {score}
      </h2>

      <p className="text-sm">/100</p>
    </div>
  );
}