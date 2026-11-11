
import Link from "next/link";
import {
  Aperture,
  Target,
  Heart,
  Users,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Creativity First",
    description:
      "We believe great ideas deserve the right environment. Our platform helps creators find spaces where inspiration can grow.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "We connect studio owners and creators, building opportunities through collaboration and shared creative experiences.",
  },
  {
    icon: Lightbulb,
    title: "Simple Experiences",
    description:
      "From discovering a studio to managing bookings, we aim to make every step clear, convenient, and accessible.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-muted/30 px-5 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-500">
            <Aperture size={16} />
            About StudioSpace
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            A Space for Every{" "}
            <span className="text-orange-500">Creative Vision</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            StudioSpace is a platform designed to connect creative people
            with inspiring spaces. We make it easier for creators to discover
            studios and for owners to share their spaces.
          </p>

          <Link
            href="/studios"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Explore Studios
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="px-5 py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              Our Story
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Bringing Creative Spaces and People Together
            </h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Finding a suitable place for photography, music production,
              podcast recording, or other creative work can be challenging.
              StudioSpace provides a central place to explore different
              creative environments.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              Through studio listings and booking management, creators can
              discover spaces that match their needs while studio owners can
              present their facilities to a wider community.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
            <div className="rounded-2xl bg-orange-500/10 p-4 text-orange-500 w-fit">
              <Target size={34} />
            </div>
            <h3 className="mt-7 text-2xl font-bold">Our Mission</h3>
            <p className="mt-4 leading-8 text-muted-foreground">
              To make creative spaces easier to discover, share, and book
              through a convenient platform that brings creators and studio
              owners together.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-5 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              What Matters to Us
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              The principles behind the StudioSpace experience.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="w-fit rounded-xl bg-orange-500/10 p-3 text-orange-500">
                    <Icon size={27} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Your Next Creative Project Starts Here
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Find a space that inspires your next idea or share your own studio
            with the creative community.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/studios"
              className="rounded-full bg-orange-500 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Find a Studio
            </Link>
            <Link
              href="/add-studio"
              className="rounded-full border border-border px-7 py-3.5 font-semibold transition-colors hover:bg-accent"
            >
              Become a Host
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
