
"use client";

import Link from "next/link";
import { Aperture } from "lucide-react";
import { toast } from "sonner";

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

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

function SocialIcon({ name, href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="rounded-full border border-border p-2.5 transition-colors hover:border-orange-500 hover:text-orange-500"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const handleNewsletter = (event) => {
    event.preventDefault();
    toast.info("Newsletter subscriptions will be available soon.");
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
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
              <SocialIcon
                name="Instagram"
                href="https://www.instagram.com/"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
                </svg>
              </SocialIcon>

              <SocialIcon
                name="Facebook"
                href="https://www.facebook.com/"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
                </svg>
              </SocialIcon>

              <SocialIcon
                name="LinkedIn"
                href="https://www.linkedin.com/"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M5.2 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM3.6 8.7h3.2V20H3.6V8.7Zm5.2 0h3.1v1.5h.1a3.4 3.4 0 0 1 3.1-1.7c3.3 0 3.9 2.2 3.9 5V20h-3.2v-5.8c0-1.4 0-3.1-1.9-3.1s-2.1 1.5-2.1 3V20H8.8V8.7Z" />
                </svg>
              </SocialIcon>

              <SocialIcon name="X" href="https://x.com/">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.5L5.3 22H2.1l7.3-8.4L1.6 2h6.5l4.5 6.9L18.9 2Zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20Z" />
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
            <h3 className="font-semibold">Popular Categories</h3>
            <ul className="mt-5 space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href="/studios"
                    className="text-sm text-muted-foreground transition-colors hover:text-orange-500"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Stay Inspired</h3>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Get updates and inspiration for your next creative production.
            </p>

            <form onSubmit={handleNewsletter} className="mt-5 space-y-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your email address"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-orange-500"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} StudioSpace. All rights reserved.</p>

          <div className="flex flex-wrap gap-5">
            <Link href="/terms" className="transition-colors hover:text-orange-500">
              Terms of Service
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-orange-500">
              Privacy Policy
            </Link>
          </div>

          <p>Made for creators, by creators.</p>
        </div>
      </div>
    </footer>
  );
}
