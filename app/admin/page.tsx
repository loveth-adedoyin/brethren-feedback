import { isAuthenticated } from "@/lib/auth";
import LoginForm from "./login-form";
import Dashboard from "./dashboard";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const authed = isAuthenticated();

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        {authed ? <Dashboard /> : <LoginForm />}
      </div>
    </main>
  );
}
