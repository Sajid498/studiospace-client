
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, LoaderCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getStudioById, createBooking } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [studio, setStudio] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadStudio = async () => {
      try {
        const data = await getStudioById(id);
        if (active) setStudio(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    if (id) loadStudio();

    return () => {
      active = false;
    };
  }, [id]);

  const duration = useMemo(() => {
    if (!startTime || !endTime) return 0;

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    return (endHour * 60 + endMinute - startHour * 60 - startMinute) / 60;
  }, [startTime, endTime]);

  const total = studio && duration > 0
    ? duration * Number(studio.hourlyRate)
    : 0;

  const handleBooking = async (event) => {
    event.preventDefault();

    if (!session?.user) {
      toast.error("Please log in before booking");
      router.push("/login");
      return;
    }

    if (!date) {
      toast.error("Please select a booking date");
      return;
    }

    if (duration <= 0) {
      toast.error("End time must be later than start time");
      return;
    }

    const startAt = new Date(`${date}T${startTime}:00`);
    const endAt = new Date(`${date}T${endTime}:00`);

    if (startAt <= new Date()) {
      toast.error("Please select a future booking time");
      return;
    }

    setSubmitting(true);

    try {
      await createBooking({
        studioId: id,
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
      });

      toast.success("Booking request submitted successfully!");
      router.push("/my-bookings");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-orange-500" />
      </main>
    );
  }

  if (error || !studio) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5">
        <h1 className="text-2xl font-bold">Studio unavailable</h1>
        <p className="mt-3 text-muted-foreground">{error}</p>
        <Link href="/studios" className="mt-5 text-orange-500">
          Explore Studios
        </Link>
      </main>
    );
  }

  if (studio.hostId === session?.user?.id) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-bold">This is your studio</h1>
        <p className="mt-3 text-muted-foreground">
          You cannot book your own studio.
        </p>
        <Link href="/studios" className="mt-5 text-orange-500">
          Explore other studios
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/studios/${id}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-500"
        >
          <ArrowLeft size={17} />
          Back to studio
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Reserve your space
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Book {studio.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={17} />
              {studio.location}
            </p>

            <form
              onSubmit={handleBooking}
              className="mt-8 space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <div>
                <label htmlFor="bookingDate" className="mb-2 block text-sm font-semibold">
                  Booking Date
                </label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    id="bookingDate"
                    type="date"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 pl-10 text-sm outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="startTime" className="mb-2 block text-sm font-semibold">
                    Start Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(event) => setStartTime(event.target.value)}
                      required
                      className="h-12 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="endTime" className="mb-2 block text-sm font-semibold">
                    End Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(event) => setEndTime(event.target.value)}
                      required
                      className="h-12 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !session?.user}
                className="h-12 w-full rounded-full bg-orange-500 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Request Booking"}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Your booking starts as Pending until the host confirms it.
              </p>
            </form>
          </section>

          <aside>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={studio.image}
                alt={studio.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">
                <span className="text-xs font-semibold text-orange-500">
                  {studio.category}
                </span>

                <h2 className="mt-2 text-xl font-bold">{studio.title}</h2>

                <div className="mt-6 space-y-4 border-t border-border pt-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hourly rate</span>
                    <span className="font-semibold">
                      ৳{Number(studio.hourlyRate).toLocaleString("en-BD")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-semibold">
                      {duration > 0 ? `${duration} hours` : "—"}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Security deposit</span>
                    <span className="font-semibold">
                      ৳{Number(studio.securityDeposit).toLocaleString("en-BD")}
                    </span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">Estimated rental cost</span>
                      <span className="text-xl font-bold text-orange-500">
                        ৳{total.toLocaleString("en-BD")}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Security deposit is displayed separately and is not included in this estimate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
