
"use client";

import Link from "next/link";
import { ArrowLeft, Mail, LockKeyhole } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <LockKeyhole size={26} />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Forgot Password?
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Having trouble accessing your StudioSpace account?
          We're here to help.
        </p>

        <div className="my-7 rounded-xl border border-border bg-muted/40 p-5 text-left">
          <div className="flex items-center gap-2 font-semibold">
            <Mail size={18} className="text-primary" />
            Need help recovering your account?
          </div>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Please contact the StudioSpace support team using
            your registered email address for assistance with
            your account.
          </p>
        </div>

        <Link
          href="/login"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <ArrowLeft size={18} />
          Back to Login
        </Link>

        <p className="mt-6 text-xs text-muted-foreground">
          StudioSpace · Your creative space starts here
        </p>
      </div>
    </main>
  );
}
