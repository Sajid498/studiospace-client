
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import {
  getStudioById,
  updateStudio,
  uploadStudioImage,
} from "@/lib/api";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Room",
  "Music Suite",
  "Art Workshop",
];

const amenityOptions = [
  "Air Conditioning",
  "High-Speed Wi-Fi",
  "Professional Lighting",
  "Soundproofing",
  "Parking",
  "Makeup Room",
  "Green Screen",
  "Editing Equipment",
  "Power Backup",
  "Restroom",
];

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export default function EditStudioPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [form, setForm] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    image: "",
    amenities: [],
    overview: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "mt-2 h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition focus:border-orange-500";

  const labelClass = "text-sm font-semibold";

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    let active = true;

    const loadStudio = async () => {
      try {
        const studio = await getStudioById(id);

        if (!active) return;

        if (studio.hostId !== session.user.id) {
          setError("You are not authorized to edit this studio.");
          return;
        }

        setForm({
          title: studio.title || "",
          category:
  studio.category === "Podcast Lounge"
    ? "Podcast Room"
    : studio.category === "Workshop"
      ? "Art Workshop"
      : studio.category || "",
          hourlyRate: String(studio.hourlyRate ?? ""),
          securityDeposit: String(studio.securityDeposit ?? ""),
          maxCapacity: String(studio.maxCapacity ?? ""),
          location: studio.location || "",
          image: studio.image || "",
          amenities: studio.amenities || [],
          overview: studio.overview || "",
        });
      } catch (err) {
        if (active) {
          setError(err.message || "Failed to load studio");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    if (id) loadStudio();

    return () => {
      active = false;
    };
  }, [id, isPending, session, router]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Choose a JPEG, PNG, WEBP, or GIF image");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be 5 MB or smaller");
      event.target.value = "";
      return;
    }

    setUploading(true);

    try {
      const imageUrl = await uploadStudioImage(file);

      setForm((previous) => ({
        ...previous,
        image: imageUrl,
      }));

      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error(err.message || "Image upload failed");
      event.target.value = "";
    } finally {
      setUploading(false);
    }
  };

  const toggleAmenity = (amenity) => {
    setForm((previous) => ({
      ...previous,
      amenities: previous.amenities.includes(amenity)
        ? previous.amenities.filter((item) => item !== amenity)
        : [...previous.amenities, amenity],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (uploading) {
      toast.error("Please wait for the image upload to finish");
      return;
    }

    if (!form.image.trim()) {
      toast.error("Please upload an image or provide an image URL");
      return;
    }

    if (form.amenities.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }

    if (Number(form.hourlyRate) <= 0) {
      toast.error("Hourly rate must be greater than zero");
      return;
    }

    if (Number(form.securityDeposit) < 0) {
      toast.error("Security deposit cannot be negative");
      return;
    }

    if (
      !Number.isInteger(Number(form.maxCapacity)) ||
      Number(form.maxCapacity) < 1
    ) {
      toast.error("Maximum capacity must be a positive whole number");
      return;
    }

    setSubmitting(true);

    try {
      await updateStudio(id, {
        ...form,
        hourlyRate: Number(form.hourlyRate),
        securityDeposit: Number(form.securityDeposit),
        maxCapacity: Number(form.maxCapacity),
      });

      toast.success("Studio updated successfully");
      router.push("/my-listings");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Failed to update studio");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-orange-500" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-bold">Unable to edit studio</h1>
        <p className="mt-3 text-muted-foreground">{error}</p>
        <Link href="/my-listings" className="mt-5 text-orange-500">
          Back to My Listings
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/my-listings"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-500"
        >
          <ArrowLeft size={17} />
          Back to my listings
        </Link>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Manage Your Space
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Edit Studio
          </h1>
          <p className="mt-3 text-muted-foreground">
            Update your studio information and facilities.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl border border-border bg-card p-6 sm:p-9"
        >
          <section>
            <h2 className="text-xl font-bold">Studio Information</h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="title" className={labelClass}>
                  Studio Title *
                </label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="category" className={labelClass}>
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="maxCapacity" className={labelClass}>
                  Maximum Capacity *
                </label>
                <input
                  id="maxCapacity"
                  name="maxCapacity"
                  type="number"
                  min="1"
                  step="1"
                  value={form.maxCapacity}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="hourlyRate" className={labelClass}>
                  Hourly Rate (৳) *
                </label>
                <input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  min="1"
                  value={form.hourlyRate}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="securityDeposit" className={labelClass}>
                  Security Deposit (৳) *
                </label>
                <input
                  id="securityDeposit"
                  name="securityDeposit"
                  type="number"
                  min="0"
                  value={form.securityDeposit}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="location" className={labelClass}>
                  Location / Address *
                </label>
                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-bold">Studio Image</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload a new image or keep your current image. Maximum size: 5 MB.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="studio-image-file" className={labelClass}>
                  Upload New Image
                </label>
                <input
                  id="studio-image-file"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageUpload}
                  disabled={uploading || submitting}
                  className="mt-2 block w-full rounded-lg border border-input bg-background p-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:font-semibold file:text-white"
                />

                {uploading && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-orange-500">
                    <LoaderCircle size={16} className="animate-spin" />
                    Uploading image...
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="image" className={labelClass}>
                  Image URL *
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={form.image}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {form.image && (
                <img
                  src={form.image}
                  alt="Studio preview"
                  className="h-56 w-full rounded-xl border border-border object-cover"
                />
              )}
            </div>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-bold">Available Amenities</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {amenityOptions.map((amenity) => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-sm hover:border-orange-500"
                >
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="h-4 w-4 accent-orange-500"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-bold">Detailed Overview</h2>
            <textarea
              id="overview"
              name="overview"
              value={form.overview}
              onChange={handleChange}
              required
              minLength={20}
              maxLength={2000}
              rows={6}
              className="mt-5 w-full rounded-lg border border-input bg-background p-4 text-sm outline-none focus:border-orange-500"
            />
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-bold">Host Information</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Host Name</label>
                <input
                  value={session?.user?.name || ""}
                  readOnly
                  className={`${inputClass} opacity-70`}
                />
              </div>

              <div>
                <label className={labelClass}>Host Email</label>
                <input
                  value={session?.user?.email || ""}
                  readOnly
                  className={`${inputClass} opacity-70`}
                />
              </div>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/my-listings"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-sm font-semibold hover:bg-muted"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting || uploading}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-orange-500 px-8 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
