"use client";

import useGeneratePdf from "../hooks/useGeneratePdf";

export default function GeneratePdfButton({
  reportId,
  className = "",
}) {
  const generatePdf = useGeneratePdf();

  const handleClick = () => {
    if (!reportId || generatePdf.isPending) return;

    generatePdf.mutate(reportId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={generatePdf.isPending}
      className={`
        inline-flex items-center gap-2
        rounded-lg
        bg-slate-900
        px-4 py-2.5
        text-sm font-medium
        text-white
        transition
        hover:bg-slate-800
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    >
      {generatePdf.isPending ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              opacity="0.25"
            />
            <path
              d="M22 12a10 10 0 0 1-10 10"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>

          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16V4m0 12l-4-4m4 4l4-4M5 20h14"
            />
          </svg>

          <span>Generate PDF</span>
        </>
      )}
    </button>
  );
}