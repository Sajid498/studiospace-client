
import Link from "next/link";
import {
  Search,
  CalendarCheck,
  CreditCard,
  Camera,
  Building2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const renterSteps = [
  {
    number: "01",
    icon: Search,
    title: "Discover Your Space",
    description:
      "Explore creative studios by category, location, price, and capacity. Find a space that matches your production needs.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Choose Your Schedule",
    description:
      "Review studio details, available booking options, amenities, and pricing before requesting your reservation.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Submit Your Booking",
    description:
      "Select your preferred time slot and submit your booking request. Your reservation starts with Pending status.",
  },
  {
    number: "04",
    icon: Camera,
    title: "Create Something Amazing",
    description:
      "Once the host confirms your booking, get ready to use the space and bring your creative vision to life.",
  },
];

const hostSteps = [
  "Create an account and open your host dashboard.",
  "Add your studio with photos, pricing, amenities, and location.",
  "Review incoming booking requests from creators.",
  "Manage reservations and update their booking status.",
];

export default function HowItWorksPage() {
  return (
    <main>
      <section className="bg-muted/30 px-5 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-500">
            Simple. Flexible. Creative.
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            How <span className="text-orange-500">StudioSpace</span> Works
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Whether you are looking for the perfect creative space or sharing
            your own studio, StudioSpace makes the process straightforward.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Explore Studios
              <ArrowRight size={18} />
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

      <section className="px-5 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              For Creators
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Find. Book. Create.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Four simple steps to finding and booking your next creative space.
            </p>
          </div>

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {renterSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-orange-500/40">
                      {step.number}
                    </span>
                    <div className="rounded-xl bg-orange-500/10 p-3 text-orange-500">
                      <Icon size={25} />
                    </div>
                  </div>

                  <h3 className="mt-7 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-5 py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              For Studio Owners
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Turn Your Creative Space Into an Opportunity
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              Share your studio with creators, manage your listings, and
              organize booking requests through your StudioSpace account.
            </p>

            <Link
              href="/add-studio"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-orange-600"
            >
              List Your Studio
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 sm:p-9">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-orange-500/10 p-3 text-orange-500">
                <Building2 size={26} />
              </div>
              <h3 className="text-xl font-bold">Become a Studio Host</h3>
            </div>

            <div className="mt-8 space-y-6">
              {hostSteps.map((step, index) => (
                <div key={step} className="flex items-start gap-4">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-orange-500"
                    size={21}
                  />
                  <div>
                    <span className="text-xs font-semibold text-orange-500">
                      STEP 0{index + 1}
                    </span>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Start Creating?
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Discover a space that fits your next idea or share your own
            creative environment with the community.
          </p>
          <Link
            href="/studios"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Find Your Studio
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
