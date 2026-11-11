
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. About StudioSpace",
    text: "StudioSpace is a platform that connects people looking for creative workspaces with studio owners who list their spaces. Users can explore listings, submit booking requests, and manage their studio activities.",
  },
  {
    title: "2. User Accounts",
    text: "Users are responsible for providing accurate account information and maintaining the security of their login credentials. Activities performed through an account are the responsibility of its owner.",
  },
  {
    title: "3. Studio Listings",
    text: "Studio owners are responsible for providing accurate descriptions, images, prices, amenities, and location information. Listings must not contain misleading or inappropriate content.",
  },
  {
    title: "4. Bookings",
    text: "Users may submit booking requests for available studios. A booking request remains pending until the host confirms it. Users should review the studio details and booking information before submitting a request.",
  },
  {
    title: "5. Acceptable Use",
    text: "Users must not misuse the platform, attempt unauthorized access, submit false information, or interfere with the operation of StudioSpace.",
  },
  {
    title: "6. Platform Availability",
    text: "StudioSpace is provided as a platform for discovering and managing creative spaces. We do not guarantee uninterrupted availability or the accuracy of information independently supplied by users.",
  },
  {
    title: "7. Changes to These Terms",
    text: "These terms may be updated as the platform evolves. Continued use of StudioSpace after changes are published indicates acceptance of the updated terms.",
  },
];

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-500">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <span className="mt-10 block text-sm font-semibold uppercase tracking-wider text-orange-500">
        Legal Information
      </span>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Terms of Service</h1>
      <p className="mt-5 leading-8 text-muted-foreground">
        These terms describe the basic conditions for using the StudioSpace
        platform. Please review them before using its features.
      </p>

      <div className="mt-12 space-y-9">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-bold">{section.title}</h2>
            <p className="mt-3 leading-8 text-muted-foreground">{section.text}</p>
          </section>
        ))}
      </div>

      <p className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
        This is a general project-level terms page, not a substitute for
        professionally reviewed legal terms.
      </p>
    </main>
  );
}
