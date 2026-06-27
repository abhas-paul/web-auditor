import AuthGuard from "@/components/guards/AuthGuard";

export default function DashboardLayout({
  children,
}) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}