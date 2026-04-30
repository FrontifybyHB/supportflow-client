import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { env } from "@/config/env";
import { useAppSelector } from "@/lib/redux/hooks";
import { Button } from "@/shared/components/ui/Button";
import { TextField } from "@/shared/components/ui/TextField";
import { useAuth } from "../hooks/useAuth";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggingIn } = useAuth();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const from = (location.state as { from?: Location } | null)?.from?.pathname;

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "admin@supportflow.test",
      password: "password",
    },
  });

  if (isAuthenticated) {
    return <Navigate to={from ?? "/dashboard"} replace />;
  }

  const onSubmit = async (values: LoginFormValues) => {
    await login(values);
    navigate(from ?? "/dashboard", { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-10">
        <section className="grid w-full gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              {env.appName}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal md:text-6xl">
              Support operations that stay organized from day one.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              A production-ready React base with routing, persisted auth,
              server-state caching, forms, cookies, API clients, and focused
              feature folders.
            </p>
          </div>

          <form
            className="rounded-lg border border-white/10 bg-white p-6 text-slate-950 shadow-2xl"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <h2 className="text-2xl font-semibold">Sign in</h2>
              <p className="mt-2 text-sm text-slate-600">
                Use the seeded dev credentials or connect your backend API.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <TextField
                icon={Mail}
                label="Email"
                type="email"
                error={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              <TextField
                icon={LockKeyhole}
                label="Password"
                type="password"
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>

            <Button className="mt-6 w-full" disabled={isLoggingIn} type="submit">
              {isLoggingIn ? "Signing in..." : "Sign in"}
              <ArrowRight size={18} />
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
