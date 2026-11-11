
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  MapPin,
  Users,
  Pencil,
  Trash2,
  LoaderCircle,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { getStudios, deleteStudio } from "@/lib/api";

export default function MyListingsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadStudios = async () => {
    try {
      setLoading(true);
      setError("");

      const allStudios = await getStudios();
      const myStudios = allStudios.filter(
        (studio) => studio.hostId === session?.user?.id
      );

      setStudios(myStudios);
    } catch (err) {
      setError(err.message || "Failed to load your listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending && session?.user) {
      loadStudios();
    } else if (!isPending) {
      setLoading(false);
    }
  }, [isPending, session]);

  const handleDelete = async () => {
    if (!selectedStudio) return;

    try {
      setDeleting(true);
      await deleteStudio(selectedStudio._id);

      setStudios((previous) =>
        previous.filter((studio) => studio._id !== selectedStudio._id)
      );

      toast.success("Studio deleted successfully");
      setSelectedStudio(null);
    } catch (err) {
      toast.error(err.message || "Failed to delete studio");
    } finally {
      setDeleting(false);
    }
  };

  if (loading || isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-orange-500" />
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-bold">Login required</h1>
        <p className="mt-3 text-muted-foreground">
          Log in to manage your studio listings.
        </p>
        <Link
          href="/login"
          className="mt-5 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white"
        >
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Host Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              My Studio Listings
            </h1>
            <p className="mt-3 text-muted-foreground">
              Manage the creative spaces you share with the community.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-orange-500 px-6 font-semibold text-white transition hover:bg-orange-600"
          >
            <Plus size={19} />
            Add New Studio
          </Link>
        </div>

        <div className="mt-9 flex items-center justify-between rounded-xl border border-border bg-card p-5">
          <div>
            <p className="text-sm text-muted-foreground">Total listings</p>
            <p className="mt-1 text-2xl font-bold">{studios.length}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Signed in as {session.user.name}
          </p>
        </div>

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
            <button
              onClick={loadStudios}
              className="ml-3 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {!error && studios.length === 0 && (
          <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <Plus className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-5 text-xl font-semibold">
              No studios listed yet
            </h2>
            <p className="mt-2 text-muted-foreground">
              Publish your first creative space and welcome other creators.
            </p>
            <Link
              href="/add-studio"
              className="mt-6 inline-flex rounded-full bg-orange-500 px-7 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Add Your First Studio
            </Link>
          </div>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <article
              key={studio._id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={studio.image}
                alt={studio.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <span className="text-xs font-semibold text-orange-500">
                  {studio.category}
                </span>

                <h2 className="mt-2 text-xl font-bold">{studio.title}</h2>

                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} />
                  {studio.location}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Hourly rate</p>
                    <p className="mt-1 font-bold text-orange-500">
                      ৳{Number(studio.hourlyRate).toLocaleString("en-BD")}/hr
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Capacity</p>
                    <p className="mt-1 flex items-center justify-end gap-1 font-semibold">
                      <Users size={15} />
                      {studio.maxCapacity}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Link
                    href={`/studios/edit/${studio._id}`}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border text-sm font-semibold transition hover:border-orange-500 hover:text-orange-500"
                  >
                    <Pencil size={15} />
                    Edit
                  </Link>

                  <button
                    onClick={() => setSelectedStudio(studio)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-red-200 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Delete Studio?</h2>
              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deleting}
                className="rounded-full p-2 hover:bg-muted"
                aria-label="Close confirmation"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <strong className="text-foreground">
                {selectedStudio.title}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deleting}
                className="rounded-full border border-border px-5 py-2 text-sm font-semibold"
              >
                Keep Studio
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Studio"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
