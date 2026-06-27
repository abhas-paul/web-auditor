import LoginForm from "@/features/auth/components/LoginForm";
import GuestGuard from "@/components/guards/GuestGuard";

export const metadata = {
  title: "Login | Web Auditor",
};

export default function LoginPage() {
  return (
    <GuestGuard>
      <LoginForm />
    </GuestGuard>
  );
}