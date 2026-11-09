
import Link from "next/link";
import {
  Search,
  CalendarClock,
  CheckCircle2,
  Clapperboard,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore creative studios, compare locations, and find a space that fits your project.",
    icon: Search,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred date and working hours based on your production schedule.",
    icon: CalendarClock,
  },
  {
    number: "03",
    title: "Book Your Space",
    description:
      "Submit your booking request and coordinate with the studio host.",
    icon: CheckCircle2,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Show up, set up, and bring your creative vision to life.",
    icon: Clapperboard,
  },
];

export default function BookingSteps() {
  return (
    <section className="bg-background px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Simple from start to finish
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Your next creative project starts here.
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            Finding and booking your perfect creative space is simple.
            Follow four easy steps and get ready to create.
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                  <Icon className="h-7 w-7" />
                </div>

                <p className="mt-7 text-sm font-bold tracking-widest text-orange-500">
                  STEP {step.number}
                </p>

                <h3 className="mt-3 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>

                {index !== steps.length - 1 && (
                  <ArrowRight className="absolute right-0 top-6 hidden h-5 w-5 text-muted-foreground/40 lg:block" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Find Your Studio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
