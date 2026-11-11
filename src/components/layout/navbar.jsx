
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Aperture,
  Menu,
  X,
  User,
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarDays,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import ThemeToggle from "./theme-toggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About Us", href: "/about" },
];

const accountNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Add New Studio", href: "/add-studio", icon: PlusCircle },
  { name: "My Studio Listings", href: "/my-listings", icon: Building2 },
  { name: "My Bookings", href: "/my-bookings", icon: CalendarDays },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const user = session?.user;
  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    try {
      const { error } = await signOut();

      if (error) {
        toast.error(error.message || "Logout failed");
        return;
      }

      setAccountMenuOpen(false);
      setMobileMenuOpen(false);
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Unable to log out. Please try again.");
    }
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setAccountMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={closeMenus}
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
                  active ? "text-orange-500" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {!isPending && !user && (
            <>
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
            </>
          )}

          {!isPending && user && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-2 rounded-full border border-border px-3 py-2 transition-colors hover:bg-accent"
                aria-expanded={accountMenuOpen}
                aria-label="Open account menu"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {initials || <User size={16} />}
                </div>
                <span className="max-w-28 truncate text-sm font-semibold">
                  {user.name}
                </span>
                <ChevronDown size={16} />
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-60 rounded-xl border border-border bg-background p-2 shadow-xl">
                  <div className="border-b border-border px-3 py-3">
                    <p className="truncate text-sm font-semibold">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-2">
                    {accountNavigation.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenus}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent"
                        >
                          <Icon size={17} />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="border-t border-border pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-500/10"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
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
                onClick={closeMenus}
                className={`text-sm font-medium ${
                  pathname === item.href
                    ? "text-orange-500"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {!isPending && !user && (
              <div className="flex gap-3 border-t border-border pt-4">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="flex-1 rounded-full border border-border py-2.5 text-center text-sm font-semibold"
                >
                  Log in
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="flex-1 rounded-full bg-orange-500 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Get Started
                </Link>
              </div>
            )}

            {!isPending && user && (
              <div className="border-t border-border pt-4">
                <div className="mb-3">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>

                {accountNavigation.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-lg py-3 text-sm hover:text-orange-500"
                    >
                      <Icon size={18} />
                      {item.name}
                    </Link>
                  );
                })}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center gap-3 border-t border-border pt-4 text-sm text-red-500"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
