
import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";

const featuredStudios = [
  {
    id: "studio-01",
    title: "The Creative Loft",
    category: "Photo Studio",
    location: "Dhaka, Bangladesh",
    price: 1500,
    rating: 4.9,
    reviews: 32,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "studio-02",
    title: "Urban Film Studio",
    category: "Film Stage",
    location: "Dhaka, Bangladesh",
    price: 2500,
    rating: 4.8,
    reviews: 24,
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "studio-03",
    title: "The Podcast Corner",
    category: "Podcast Room",
    location: "Chattogram, Bangladesh",
    price: 1200,
    rating: 4.9,
    reviews: 18,
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "studio-04",
    title: "Soundwave Music Suite",
    category: "Music Suite",
    location: "Dhaka, Bangladesh",
    price: 1800,
    rating: 4.7,
    reviews: 21,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "studio-05",
    title: "Canvas Art Workshop",
    category: "Art Workshop",
    location: "Sylhet, Bangladesh",
    price: 1000,
    rating: 4.8,
    reviews: 15,
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "studio-06",
    title: "The White Room",
    category: "Photo Studio",
    location: "Dhaka, Bangladesh",
    price: 2000,
    rating: 5.0,
    reviews: 12,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85",
  },
];

export default function FeaturedStudios() {
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

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStudios.map((studio) => (
            <article
              key={studio.id}
              className="group overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href={`/studios/${studio.id}`}
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

                  <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground">
                    {studio.category}
                  </span>
                </div>
              </Link>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold tracking-tight">
                    {studio.title}
                  </h3>

                  <div className="flex shrink-0 items-center gap-1 text-sm font-semibold">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {studio.rating.toFixed(1)}
                    <span className="font-normal text-muted-foreground">
                      ({studio.reviews})
                    </span>
                  </div>
                </div>

                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {studio.location}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-xl font-bold text-foreground">
                      ৳{studio.price.toLocaleString("en-BD")}
                    </span>
                    / hour
                  </p>

                  <Link
                    href={`/studios/${studio.id}`}
                    className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
