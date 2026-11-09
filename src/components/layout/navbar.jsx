"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./theme-toggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Aperture className="h-8 w-8 text-orange-500" />
          <span className="text-xl font-bold tracking-tight">
            Studio<span className="text-orange-500">Space</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                  active
                    ? "text-orange-500"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Link
            href="/login"
            className="rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Get Started
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium ${
                  pathname === item.href
                    ? "text-orange-500"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="flex gap-3 border-t border-border pt-4">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 rounded-full border border-border py-2.5 text-center text-sm font-semibold"
              >
                Log in
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 rounded-full bg-orange-500 py-2.5 text-center text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}