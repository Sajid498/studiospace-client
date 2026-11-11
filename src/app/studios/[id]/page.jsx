
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Users,
  ShieldCheck,
  ArrowLeft,
  LoaderCircle,
  CheckCircle2,
  CalendarDays,
  User,
} from "lucide-react";
import { getStudioById } from "@/lib/api";

export default function StudioDetailsPage() {
  const { id } = useParams();
  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadStudio = async () => {
      try {
        const data = await getStudioById(id);
        if (active) setStudio(data);
      } catch (err) {
        if (active) setError(err.message || "Unable to load studio");
      } finally {
        if (active) setLoading(false);
      }
    };

    if (id) loadStudio();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <LoaderCircle className="h-9 w-9 animate-spin text-orange-500" />
      </main>
    );
  }

  if (error || !studio) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-bold">Studio not found</h1>
        <p className="mt-3 text-muted-foreground">
          {error || "This studio may have been removed."}
        </p>
        <Link
          href="/studios"
          className="mt-6 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white"
        >
          Explore Studios
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Link
          href="/studios"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-orange-500"
        >
          <ArrowLeft size={17} />
          Back to studios
        </Link>

        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="relative h-[300px] bg-muted sm:h-[450px]">
            <img
              src={studio.image}
              alt={studio.title}
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-5 left-5 rounded-full bg-background/95 px-4 py-2 text-sm font-semibold">
              {studio.category}
            </span>
          </div>

          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_340px]">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {studio.title}
              </h1>

              <p className="mt-4 flex items-center gap-2 text-muted-foreground">
                <MapPin size={18} className="text-orange-500" />
                {studio.location}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-muted/50 p-4">
                  <Users className="mb-2 text-orange-500" size={21} />
                  <p className="text-xs text-muted-foreground">Capacity</p>
                  <p className="mt-1 font-bold">
                    {studio.maxCapacity} people
                  </p>
                </div>

                <div className="rounded-xl bg-muted/50 p-4">
                  <CalendarDays className="mb-2 text-orange-500" size={21} />
                  <p className="text-xs text-muted-foreground">Hourly Rate</p>
                  <p className="mt-1 font-bold">
                    ৳{Number(studio.hourlyRate).toLocaleString("en-BD")}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/50 p-4">
                  <ShieldCheck className="mb-2 text-orange-500" size={21} />
                  <p className="text-xs text-muted-foreground">
                    Security Deposit
                  </p>
                  <p className="mt-1 font-bold">
                    ৳{Number(studio.securityDeposit).toLocaleString("en-BD")}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold">About this studio</h2>
                <p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">
                  {studio.overview}
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold">Studio Amenities</h2>

                {studio.amenities?.length > 0 ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {studio.amenities.map((amenity, index) => (
                      <div
                        key={`${amenity}-${index}`}
                        className="flex items-center gap-3 rounded-lg bg-muted/40 p-3 text-sm"
                      >
                        <CheckCircle2
                          size={18}
                          className="shrink-0 text-orange-500"
                        />
                        {amenity}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    No amenities listed.
                  </p>
                )}
              </div>
            </div>

            <aside>
              <div className="rounded-2xl border border-border p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Hosted by</p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                    <User size={23} />
                  </div>
                  <div>
                    <p className="font-bold">
                      {studio.hostName || "Studio Host"}
                    </p>
                    <p className="text-xs text-muted-foreground">Studio Host</p>
                  </div>
                </div>

                <div className="my-6 border-t border-border" />

                <p className="text-sm text-muted-foreground">Price per hour</p>
                <p className="mt-1 text-3xl font-bold">
                  ৳{Number(studio.hourlyRate).toLocaleString("en-BD")}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  Security deposit: ৳
                  {Number(studio.securityDeposit).toLocaleString("en-BD")}
                </p>

                <Link
                  href={`/studios/${studio._id}/book`}
                  className="mt-7 flex w-full items-center justify-center rounded-full bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  Check Availability
                </Link>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Booking requests are subject to host confirmation.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
