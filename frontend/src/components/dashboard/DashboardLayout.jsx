"use client";

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-50">


      <main className="ml-72">


        <div className="p-8">

          {children}

        </div>

      </main>

    </div>
  );
}