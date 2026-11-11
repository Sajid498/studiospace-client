
import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5 py-20">
      <div className="max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
          <Search size={38} />
        </div>

        <p className="mt-8 text-7xl font-extrabold tracking-tight text-orange-500">
          404
        </p>

        <h1 className="mt-5 text-3xl font-bold">
          Looks like this space is empty!
        </h1>

      <p className="mt-4 leading-7 text-muted-foreground">
  The page you&apos;re looking for doesn&apos;t exist or may have been moved.
  Let&apos;s help you find your next creative space.
</p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
          >
            <Home size={18} /> Back to Home
          </Link>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:bg-accent"
          >
            <ArrowLeft size={18} /> Explore Studios
          </Link>
        </div>
      </div>
    </main>
  );
}
