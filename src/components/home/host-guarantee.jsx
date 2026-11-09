
import Link from "next/link";
import {
  ShieldCheck,
  BadgeCheck,
  Wrench,
  Headset,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    description:
      "Enjoy greater peace of mind with protection-focused booking policies for hosts and creators.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Profiles",
    description:
      "Connect with confidence through transparent studio listings and verified host profiles.",
  },
  {
    icon: Wrench,
    title: "Equipment Safety",
    description:
      "Clear studio guidelines help creators respect equipment and maintain safe production spaces.",
  },
  {
    icon: Headset,
    title: "24/7 Host Support",
    description:
      "Get assistance when you need help with your workspace listing or booking experience.",
  },
];

export default function HostGuarantee() {
  return (
    <section className="bg-muted/30 px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Create with confidence
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              A better experience for every creator.
            </h2>

            <p className="mt-6 max-w-lg leading-8 text-muted-foreground">
              Your creative work deserves a reliable space. StudioSpace
              focuses on trust, transparency, and support throughout
              the studio booking journey.
            </p>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Learn About StudioSpace
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
