import RegisterForm from "@/features/auth/components/RegisterForm";
import GuestGuard from "@/components/guards/GuestGuard";

export const metadata = {
  title: "Register | Web Auditor",
};

export default function RegisterPage() {
  return (
    <GuestGuard>
      <RegisterForm />
    </GuestGuard>
  );
}