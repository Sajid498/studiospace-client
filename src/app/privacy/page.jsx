
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    text: "StudioSpace may process account information such as name, email address, and profile details, along with studio listing information and booking details submitted through the platform.",
  },
  {
    title: "2. How Information Is Used",
    text: "Information is used to provide account access, display studio listings, manage bookings, support platform functionality, and improve the user experience.",
  },
  {
    title: "3. Account Authentication",
    text: "StudioSpace uses Better Auth for authentication. Authentication information is processed to support secure account access and session management.",
  },
  {
    title: "4. Studio Images",
    text: "Images uploaded for studio listings are hosted through ImgBB. Their handling and retention are also subject to the image hosting provider's policies.",
  },
  {
    title: "5. Information Sharing",
    text: "Studio and booking information may be displayed to relevant users to support platform functionality. We do not claim that information submitted to the platform is completely private from other users who need it for these features.",
  },
  {
    title: "6. Data Security",
    text: "We use technical measures intended to protect user information. However, no internet-based system can guarantee absolute security.",
  },
  {
    title: "7. Third-Party Services",
    text: "StudioSpace integrates third-party services for authentication and image hosting. Their own privacy policies and terms may apply when you use those services.",
  },
  {
    title: "8. Policy Updates",
    text: "This policy may be updated when platform features or data practices change. Updated information will be published on this page.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-500">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <span className="mt-10 block text-sm font-semibold uppercase tracking-wider text-orange-500">
        Your Information
      </span>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
      <p className="mt-5 leading-8 text-muted-foreground">
        This page explains the general information handling practices
        associated with using StudioSpace.
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
        This is a project-level privacy overview. It should be reviewed and
        updated to reflect actual data practices before production use.
      </p>
    </main>
  );
}
