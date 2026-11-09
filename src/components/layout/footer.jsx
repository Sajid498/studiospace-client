
import Link from "next/link";
import { Aperture } from "lucide-react";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { name: "All Studios", href: "/studios" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "About Us", href: "/about" },
    ],
  },
  {
    title: "For Creators",
    links: [
      { name: "Host Your Space", href: "/add-studio" },
      { name: "My Bookings", href: "/my-bookings" },
      { name: "My Listings", href: "/my-listings" },
    ],
  },
];

function SocialIcon({ name, children, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="rounded-full border border-border p-2.5 transition-colors hover:text-orange-500"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Aperture className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold">
                Studio<span className="text-orange-500">Space</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">
              Find inspiring creative spaces, connect with talented hosts,
              and bring your next big idea to life.
            </p>

            <div className="mt-6 flex gap-3">
              <SocialIcon name="Instagram" href="https://www.instagram.com/">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
                </svg>
              </SocialIcon>

              <SocialIcon name="Facebook" href="https://www.facebook.com/">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
                </svg>
              </SocialIcon>

              <SocialIcon name="LinkedIn" href="https://www.linkedin.com/">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M5.2 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM3.6 8.7h3.2V20H3.6V8.7Zm5.2 0h3.1v1.5h.1a3.4 3.4 0 0 1 3.1-1.7c3.3 0 3.9 2.2 3.9 5V20h-3.2v-5.8c0-1.4 0-3.1-1.9-3.1s-2.1 1.5-2.1 3V20H8.8V8.7Z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-orange-500"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-semibold">Stay Inspired</h3>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Discover creative spaces and get inspiration for your next
              production.
            </p>
            <Link
              href="/studios"
              className="mt-5 inline-flex rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Explore Studios
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} StudioSpace. All rights reserved.</p>
          <p>Made for creators, by creators.</p>
        </div>
      </div>
    </footer>
  );
}
