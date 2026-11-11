
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import {
  getMyBookings,
  cancelBooking,
  updateBookingStatus,
} from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function MyBookingsPage() {
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");
  const [error, setError] = useState("");

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMyBookings();
      setBookings(data);
    } catch (err) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending && session?.user) {
      loadBookings();
    } else if (!isPending) {
      setLoading(false);
    }
  }, [isPending, session]);

  const handleAction = async (id, action, status) => {
    try {
      setProcessingId(id);

      if (action === "cancel") {
        await cancelBooking(id);
        toast.success("Booking cancelled successfully");
      } else {
        await updateBookingStatus(id, status);
        toast.success(`Booking ${status.toLowerCase()} successfully`);
      }

      await loadBookings();
    } catch (err) {
      toast.error(err.message || "Action failed");
    } finally {
      setProcessingId("");
    }
  };

  const formatDate = (value) =>
    new Date(value).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const getStatusStyle = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-800",
      Confirmed: "bg-green-100 text-green-800",
      Completed: "bg-blue-100 text-blue-800",
      Cancelled: "bg-red-100 text-red-800",
    };

    return styles[status] || "bg-gray-100 text-gray-800";
  };

  if (loading || isPending) {
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
          Please log in to view your bookings.
        </p>
        <Link href="/login" className="mt-5 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white">
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Your Reservations
          </p>
          <h1 className="mt-3 text-3xl font-bold">My Bookings</h1>
          <p className="mt-2 text-muted-foreground">
            View and manage your studio reservations.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
            <button onClick={loadBookings} className="ml-3 font-semibold underline">
              Try again
            </button>
          </div>
        )}

        {!error && bookings.length === 0 && (
          <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-5 text-xl font-semibold">No bookings yet</h2>
            <p className="mt-2 text-muted-foreground">
              Explore studios and reserve your first creative space.
            </p>
            <Link href="/studios" className="mt-6 inline-flex rounded-full bg-orange-500 px-7 py-3 font-semibold text-white hover:bg-orange-600">
              Explore Studios
            </Link>
          </div>
        )}

        <div className="grid gap-6">
          {bookings.map((booking) => {
            const isRenter = booking.renterId === session.user.id;
            const isHost = booking.hostId === session.user.id;
            const processing = processingId === booking._id;

            return (
              <article key={booking._id} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="grid md:grid-cols-[240px_1fr]">
                  <img
                    src={booking.studioImage}
                    alt={booking.studioTitle}
                    className="h-52 w-full object-cover md:h-full"
                  />

                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-orange-500">
                        {booking.studioCategory}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <h2 className="mt-3 text-xl font-bold">{booking.studioTitle}</h2>

                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={16} />
                      {booking.location || "Location unavailable"}
                    </p>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Booking starts</p>
                        <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                          <CalendarDays size={16} />
                          {formatDate(booking.startAt)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Booking ends</p>
                        <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                          <Clock size={16} />
                          {formatDate(booking.endAt)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Estimated rental cost</p>
                        <p className="mt-1 text-lg font-bold text-orange-500">
                          ৳{Number(booking.totalPrice || 0).toLocaleString("en-BD")}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {isRenter && booking.status === "Pending" && (
                          <button
                            disabled={processing}
                            onClick={() => {
                              if (window.confirm("Are you sure you want to cancel this booking?")) {
                                handleAction(booking._id, "cancel");
                              }
                            }}
                            className="rounded-full border border-red-500 px-5 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:opacity-50"
                          >
                            {processing ? "Processing..." : "Cancel Booking"}
                          </button>
                        )}

                        {isHost && booking.status === "Pending" && (
                          <button
                            disabled={processing}
                            onClick={() => handleAction(booking._id, "update", "Confirmed")}
                            className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                          >
                            {processing ? "Processing..." : "Confirm Booking"}
                          </button>
                        )}

                        {isHost && booking.status === "Confirmed" && (
                          <button
                            disabled={processing}
                            onClick={() => handleAction(booking._id, "update", "Completed")}
                            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                          >
                            {processing ? "Processing..." : "Mark Completed"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
