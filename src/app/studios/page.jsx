
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Users, ArrowRight, LoaderCircle, SlidersHorizontal } from "lucide-react";
import { getStudios } from "@/lib/api";

const categories = [
  "All Categories",
  "Photo Studio",
  "Film Stage",
  "Podcast Room",
  "Music Suite",
  "Art Workshop",
];
const normalizeCategory = (value) => {
  if (value === "Podcast Lounge") return "Podcast Room";
  if (value === "Workshop") return "Art Workshop";
  return value;
};

export default function StudiosPage() {
  const [studios, setStudios] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
  let active = true;

  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("category");

  if (categories.includes(requestedCategory)) {
    setCategory(requestedCategory);
  }

  const loadStudios = async () => {
      try {
        const data = await getStudios();
        if (active) setStudios(data);
      } catch (err) {
        if (active) setError(err.message || "Unable to load studios");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadStudios();

    return () => {
      active = false;
    };
  }, []);

  const filteredStudios = useMemo(() => {
    const query = search.trim().toLowerCase();

    return studios.filter((studio) => {
      const matchesCategory =
  category === "All Categories" ||
  normalizeCategory(studio.category) === category;

      const matchesSearch =
        !query ||
        studio.title?.toLowerCase().includes(query) ||
        studio.location?.toLowerCase().includes(query) ||
        studio.category?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [studios, search, category]);

  return (
    <main className="min-h-screen bg-background">
      <section className="bg-muted/30 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Discover your creative space
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Explore Studios
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Find the right creative environment for photography, filmmaking,
            podcasting, music production, and more.
          </p>

          <div className="mt-8 grid gap-4 rounded-2xl border border-border bg-background p-4 shadow-sm md:grid-cols-[1fr_240px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by studio name, location or category..."
                className="h-12 w-full rounded-xl border border-input bg-background pl-12 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-orange-500"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Available Creative Spaces</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {loading
                ? "Loading studios..."
                : `${filteredStudios.length} studios found`}
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            List Your Studio <ArrowRight size={16} />
          </Link>
        </div>

        {loading && (
          <div className="flex min-h-64 items-center justify-center">
            <LoaderCircle className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-8 text-center">
            <p className="font-semibold text-red-500">{error}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Make sure the backend server is running.
            </p>
          </div>
        )}

        {!loading && !error && filteredStudios.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <h3 className="text-xl font-bold">No studios found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try another search or category.
            </p>
          </div>
        )}

        {!loading && !error && filteredStudios.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <article
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link
                  href={`/studios/${studio._id}`}
                  className="block"
                  aria-label={`View ${studio.title}`}
                >
                  <div className="relative h-60 overflow-hidden bg-muted">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url("${studio.image}")`,
                      }}
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold">
                      {studio.category}
                    </span>
                  </div>
                </Link>

                <div className="p-5">
                  <h3 className="text-lg font-bold tracking-tight">
                    {studio.title}
                  </h3>

                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} className="shrink-0" />
                    {studio.location}
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Users size={16} />
                    Maximum {studio.maxCapacity} people
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-xl font-bold text-foreground">
                        ৳{Number(studio.hourlyRate).toLocaleString("en-BD")}
                      </span>
                      / hour
                    </p>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
