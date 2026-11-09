
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Photo Studios",
    value: "Photo Studio",
    description: "Capture your vision",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Film Stages",
    value: "Film Stage",
    description: "Bring stories to life",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Podcast Rooms",
    value: "Podcast Room",
    description: "Give your voice a space",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Music Suites",
    value: "Music Suite",
    description: "Make something unforgettable",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Art Workshops",
    value: "Art Workshop",
    description: "Make room for creativity",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=85",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-background px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Explore by category
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Find the space for your next big idea.
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              Whatever you're creating, discover a space designed to bring
              your vision to life.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-orange-500"
          >
            Explore all spaces
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.value}
              href={`/studios?category=${encodeURIComponent(category.value)}`}
              className={`group relative isolate flex min-h-[300px] overflow-hidden rounded-2xl bg-muted ${
                index === 0 || index === 3 ? "lg:col-span-2" : ""
              }`}
            >
              <div
                className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url("${category.image}")` }}
              />

              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />

              <div className="mt-auto flex w-full items-end justify-between gap-4 p-7 text-white">
                <div>
                  <p className="text-sm text-white/75">
                    {category.description}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    {category.name}
                  </h3>
                </div>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50 transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
