
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  CalendarDays,
  Clock,
  Plus,
  ArrowRight,
  LoaderCircle,
  MapPin,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getStudios, getMyBookings } from "@/lib/api";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  const [studios, setStudios] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending || !session?.user) return;

    let active = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [allStudios, myBookings] = await Promise.all([
          getStudios(),
          getMyBookings(),
        ]);

        if (!active) return;

        setStudios(
          allStudios.filter(
            (studio) => studio.hostId === session.user.id
          )
        );

        setBookings(myBookings);
      } catch (err) {
        if (active) {
          setError(err.message || "Failed to load dashboard");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, [isPending, session]);

  if (isPending || loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-orange-500" />
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-bold">Login required</h1>
        <p className="mt-3 text-muted-foreground">
          Log in to access your dashboard.
        </p>
        <Link
          href="/login"
          className="mt-5 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white"
        >
          Login
        </Link>
      </main>
    );
  }

  const receivedBookings = bookings.filter(
    (booking) => booking.hostId === session.user.id
  );

  const pendingBookings = bookings.filter(
    (booking) =>
      booking.hostId === session.user.id &&
      booking.status === "Pending"
  );

  const activeBookings = bookings.filter(
    (booking) =>
      booking.renterId === session.user.id &&
      ["Pending", "Confirmed"].includes(booking.status)
  );

  const stats = [
    {
      label: "My Studios",
      value: studios.length,
      icon: Building2,
      color: "text-orange-500",
      background: "bg-orange-500/10",
    },
    {
      label: "Bookings Received",
      value: receivedBookings.length,
      icon: CalendarDays,
      color: "text-blue-500",
      background: "bg-blue-500/10",
    },
    {
      label: "Pending Requests",
      value: pendingBookings.length,
      icon: Clock,
      color: "text-yellow-600",
      background: "bg-yellow-500/10",
    },
    {
      label: "My Active Bookings",
      value: activeBookings.length,
      icon: CalendarDays,
      color: "text-green-500",
      background: "bg-green-500/10",
    },
  ];

  return (
    <main className="min-h-screen bg-background px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Your Workspace
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Welcome back, {session.user.name}!
          </h1>
          <p className="mt-3 text-muted-foreground">
            Here's an overview of your StudioSpace activity.
          </p>
        </div>

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
          </div>
        )}

        {!error && (
          <>
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border bg-card p-6"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.background}`}>
                      <Icon className={stat.color} size={23} />
                    </div>
                    <p className="mt-5 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            <section className="mt-10">
              <h2 className="text-xl font-bold">Quick Actions</h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <Link
                  href="/add-studio"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition hover:border-orange-500"
                >
                  <div>
                    <Plus className="text-orange-500" size={24} />
                    <h3 className="mt-4 font-bold">List a Studio</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Share your creative space.
                    </p>
                  </div>
                  <ArrowRight className="text-muted-foreground transition group-hover:translate-x-1" size={20} />
                </Link>

                <Link
                  href="/my-listings"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition hover:border-orange-500"
                >
                  <div>
                    <Building2 className="text-orange-500" size={24} />
                    <h3 className="mt-4 font-bold">Manage Studios</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Edit or remove your listings.
                    </p>
                  </div>
                  <ArrowRight className="text-muted-foreground transition group-hover:translate-x-1" size={20} />
                </Link>

                <Link
                  href="/my-bookings"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition hover:border-orange-500"
                >
                  <div>
                    <CalendarDays className="text-orange-500" size={24} />
                    <h3 className="mt-4 font-bold">My Bookings</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Manage your reservations.
                    </p>
                  </div>
                  <ArrowRight className="text-muted-foreground transition group-hover:translate-x-1" size={20} />
                </Link>
              </div>
            </section>

            <section className="mt-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent Booking Activity</h2>
                <Link
                  href="/my-bookings"
                  className="text-sm font-semibold text-orange-500 hover:underline"
                >
                  View all
                </Link>
              </div>

              {bookings.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-border bg-card px-6 py-12 text-center">
                  <CalendarDays className="mx-auto text-muted-foreground" size={35} />
                  <p className="mt-4 font-semibold">No booking activity yet</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your studio reservations will appear here.
                  </p>
                  <Link
                    href="/studios"
                    className="mt-5 inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white"
                  >
                    Explore Studios
                  </Link>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <div
                      key={booking._id}
                      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center"
                    >
                      <img
                        src={booking.studioImage}
                        alt={booking.studioTitle}
                        className="h-20 w-full rounded-lg object-cover sm:w-28"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold">{booking.studioTitle}</h3>
                        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin size={14} />
                          {booking.location || "Location unavailable"}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(booking.startAt).toLocaleDateString("en-BD", {
                            dateStyle: "medium",
                          })}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <span className="text-sm font-semibold text-orange-500">
                          ৳{Number(booking.totalPrice || 0).toLocaleString("en-BD")}
                        </span>
                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
