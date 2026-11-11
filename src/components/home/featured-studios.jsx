
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { getStudios } from "@/lib/api";

export default function FeaturedStudios() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchStudios = async () => {
      try {
        const data = await getStudios();

        if (active) {
          setStudios(
            [...data]
              .sort(
                (a, b) =>
                  new Date(b.createdAt || 0) -
                  new Date(a.createdAt || 0)
              )
              .slice(0, 6)
          );
        }
      } catch (err) {
        if (active) {
          setError("Unable to load featured studios right now.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchStudios();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="bg-muted/30 px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Handpicked spaces
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Featured creative spaces.
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              Explore inspiring studios and find the perfect environment
              for your next creative project.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-orange-500"
          >
            View all studios
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl border border-border bg-muted"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-border bg-background p-10 text-center">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : studios.length === 0 ? (
          <div className="rounded-2xl border border-border bg-background p-10 text-center">
            <h3 className="text-lg font-semibold">
              No studios available yet
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Be the first to share a creative space with the community.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <article
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link
                  href={`/studios/${studio._id}`}
                  className="block"
                  aria-label={`View ${studio.title}`}
                >
                  <div className="relative h-60 overflow-hidden bg-muted">
                    {studio.image ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: `url("${studio.image}")`,
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        No image available
                      </div>
                    )}

                    <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground">
                      {studio.category}
                    </span>
                  </div>
                </Link>

                <div className="p-5">
                  <h3 className="text-lg font-bold tracking-tight">
                    {studio.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                    {Number(studio.reviewCount || 0) > 0 ? (
                      <>
                        <span className="font-semibold">
                          {Number(studio.averageRating).toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">
                          ({studio.reviewCount}{" "}
                          {Number(studio.reviewCount) === 1
                            ? "review"
                            : "reviews"})
                        </span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">
                        No reviews yet
                      </span>
                    )}
                  </div>

                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {studio.location}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-xl font-bold text-foreground">
                        ৳{Number(studio.hourlyRate || 0).toLocaleString("en-BD")}
                      </span>
                      / hour
                    </p>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
