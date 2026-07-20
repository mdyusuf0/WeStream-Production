"use client";

import React, { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";

import { Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin/media");
    }
  }, [status, router]);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "Blocked") {
      requestAnimationFrame(() => setError("Access suspended. Too many failed attempts. Try again in 10 minutes."));
    } else if (errorParam === "CredentialsSignin") {
      requestAnimationFrame(() => setError("Invalid email or password."));
    } else if (errorParam) {
      requestAnimationFrame(() => setError("An error occurred during authentication."));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        if (res.error.includes("Blocked") || res.url?.includes("error=Blocked")) {
          setError("Access locked. Too many failed attempts. Try again in 10 minutes.");
        } else {
          setError("Invalid email or password.");
        }
      } else if (res?.ok) {
        router.push("/admin/media");
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-surface border border-header-border p-8 md:p-10 rounded-sm shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-accent" />
      
      <div className="mb-8 space-y-2">
        <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-accent uppercase block">
          WESTREAM PRODUCTION
        </span>
        <h1 className="text-2xl font-heading font-extrabold uppercase text-foreground">
          Admin Gate
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 font-sans">
        {error && (
          <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 text-xs rounded-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-background border border-header-border rounded-sm text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
            placeholder="admin@westream.in"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-4 pr-12 py-3 bg-background border border-header-border rounded-sm text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || status === "authenticated"}
          className="w-full min-h-[48px] bg-accent text-background font-heading text-xs font-bold tracking-[0.2em] uppercase rounded-sm shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Verifying..." : "Access Dashboard"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <NextAuthProvider>
      <div className="w-screen h-screen flex items-center justify-center bg-background px-4">
        <Suspense fallback={
          <div className="text-xs font-heading font-bold tracking-widest text-muted-foreground uppercase">
            Loading auth...
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </NextAuthProvider>
  );
}
