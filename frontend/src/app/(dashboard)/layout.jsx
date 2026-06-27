import AuthGuard from "@/components/guards/AuthGuard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function Layout({
  children,
}) {
  return (
    <AuthGuard>

      <DashboardLayout>

        {children}

      </DashboardLayout>

    </AuthGuard>
  );
}