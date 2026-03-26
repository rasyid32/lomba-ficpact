"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

type AuthView = "login" | "register" | "forgot";

/* ─── Brand SVG Icons ─── */
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.9 33.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.2-2.7-.4-3.9z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.5 15.5 18.8 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.5-11.1-8.2l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.2-2.7-.4-3.9z" />
  </svg>
);

/* ─── Animation Variants ─── */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

/* ─── Reusable Components ─── */
function InputField({
  id, label, type = "text", placeholder, value, onChange, error,
}: {
  id: string; label: string; type?: string; placeholder?: string;
  value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        id={id} type={type} placeholder={placeholder} value={value} onChange={onChange}
        className={`w-full rounded-lg border ${error ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function PasswordField({ id, label, value, onChange, error }: {
  id: string; label: string; value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        <input
          id={id} type={visible ? "text" : "password"} placeholder="Enter your password"
          value={value} onChange={onChange}
          className={`w-full rounded-lg border ${error ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} px-4 py-2.5 pr-11 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
        />
        <button type="button" onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label={visible ? "Hide password" : "Show password"}>
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error ? (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      ) : (
        <p className="mt-1.5 text-xs text-slate-400">
          It must be a combination of minimum 6 letters, numbers, and symbols.
        </p>
      )}
    </div>
  );
}

function SSOButtons({ mode }: { mode: "login" | "register" }) {
  const label = mode === "login" ? "log in" : "sign up";
  return (
    <div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
        <div className="relative flex justify-center text-sm"><span className="bg-white px-3 text-slate-400">Or {label} with:</span></div>
      </div>
      <button type="button" className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300">
        <GoogleIcon /> Continue with Google
      </button>
    </div>
  );
}

/* ─── Login View ─── */
function LoginView({ onSwitch, onForgot }: { onSwitch: () => void; onForgot: () => void }) {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; api?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email address.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setErrors({ api: err.message || "Login failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div key="login" variants={cardVariants} initial="hidden" animate="visible" exit="exit">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
        <p className="mt-2 text-slate-500">Please log in to continue</p>
      </div>

      {errors.api && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{errors.api}</div>
      )}

      <form className="space-y-5" onSubmit={handleLogin}>
        <InputField id="login-email" label="Email Address" type="email" placeholder="Enter your email"
          value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <PasswordField id="login-password" label="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} error={errors.password} />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-slate-600">Remember me</span>
          </label>
          <button type="button" onClick={onForgot} className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Forgot Password?
          </button>
        </div>

        <button type="submit" disabled={submitting}
          className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60 flex items-center justify-center gap-2">
          {submitting && <Loader2 size={18} className="animate-spin" />}
          {submitting ? "Logging in..." : "Log In"}
        </button>
      </form>

      <SSOButtons mode="login" />

      <p className="mt-6 text-center text-sm text-slate-500">
        No account yet?{" "}
        <button type="button" onClick={onSwitch} className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Sign Up</button>
      </p>
    </motion.div>
  );
}

/* ─── Register View ─── */
function RegisterView({ onSwitch }: { onSwitch: () => void }) {
  const { register } = useAuth();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email address.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (!terms) newErrors.terms = "You must agree to the Terms of Service.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    try {
      const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
      await register(email, username, password);
      router.push("/onboarding");
    } catch (err: any) {
      setErrors({ api: err.message || "Registration failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div key="register" variants={cardVariants} initial="hidden" animate="visible" exit="exit">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Sign Up Free</h1>
        <p className="mt-2 text-slate-500">14 day free access to unlimited resources</p>
      </div>

      {errors.api && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{errors.api}</div>
      )}

      <form className="space-y-5" onSubmit={handleRegister}>
        <div className="grid grid-cols-2 gap-4">
          <InputField id="reg-first" label="First Name" placeholder="John" value={firstName}
            onChange={(e) => setFirstName(e.target.value)} error={errors.firstName} />
          <InputField id="reg-last" label="Last Name" placeholder="Doe" value={lastName}
            onChange={(e) => setLastName(e.target.value)} error={errors.lastName} />
        </div>
        <InputField id="reg-email" label="Email Address" type="email" placeholder="john@example.com"
          value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <PasswordField id="reg-password" label="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} error={errors.password} />

        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)}
              className="mt-0.5 size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-slate-600">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{" "}
              and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </span>
          </label>
          {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms}</p>}
        </div>

        <button type="submit" disabled={submitting}
          className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60 flex items-center justify-center gap-2">
          {submitting && <Loader2 size={18} className="animate-spin" />}
          {submitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <SSOButtons mode="register" />

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Log In</button>
      </p>
    </motion.div>
  );
}

/* ─── Forgot View ─── */
function ForgotView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div key="forgot" variants={cardVariants} initial="hidden" animate="visible" exit="exit">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Forgotten your password?</h1>
        <p className="mt-2 text-slate-500">
          There is nothing to worry about, we&apos;ll send you a message to help you reset your password.
        </p>
      </div>
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <InputField id="forgot-email" label="Email Address" type="email" placeholder="Enter personal or work email address" />
        <button type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
          Send Reset Link
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        <button type="button" onClick={onBack} className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">← Back to Log In</button>
      </p>
    </motion.div>
  );
}

/* ─── Main Content Component (Extracted) ─── */
function AuthContent() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode") as AuthView | null;
  const [view, setView] = useState<AuthView>(modeParam || "login");

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        <AnimatePresence mode="wait">
          {view === "login" && <LoginView onSwitch={() => setView("register")} onForgot={() => setView("forgot")} />}
          {view === "register" && <RegisterView onSwitch={() => setView("login")} />}
          {view === "forgot" && <ForgotView onBack={() => setView("login")} />}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

/* ─── Main Page (Wrapped in Suspense) ─── */
export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}