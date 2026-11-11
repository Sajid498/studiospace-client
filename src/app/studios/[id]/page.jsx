
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Users,
  ShieldCheck,
  ArrowLeft,
  LoaderCircle,
  CheckCircle2,
  CalendarDays,
  User,
  Star,
} from "lucide-react";
import { getStudioById, getStudioReviews } from "@/lib/api";

export default function StudioDetailsPage() {
  const { id } = useParams();

  const [studio, setStudio] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewSummary, setReviewSummary] = useState({
    averageRating: null,
    reviewCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    let active = true;

    const loadStudio = async () => {
      try {
        const [studioData, reviewData] = await Promise.all([
          getStudioById(id),
          getStudioReviews(id),
        ]);

        if (active) {
          setStudio(studioData);
          setReviews(reviewData?.reviews || []);
          setReviewSummary(
            reviewData?.summary || {
              averageRating: null,
              reviewCount: 0,
            }
          );
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load studio");
        }
      } finally {
        if (active) {
          setLoading(false);
          setReviewsLoading(false);
        }
      }
    };

    if (id) loadStudio();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <LoaderCircle className="h-9 w-9 animate-spin text-orange-500" />
      </main>
    );
  }

  if (error || !studio) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-bold">Studio not found</h1>
        <p className="mt-3 text-muted-foreground">
          {error || "This studio may have been removed."}
        </p>
        <Link
          href="/studios"
          className="mt-6 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white"
        >
          Explore Studios
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Link
          href="/studios"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-orange-500"
        >
          <ArrowLeft size={17} />
          Back to studios
        </Link>

        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="relative h-[300px] bg-muted sm:h-[450px]">
            {studio.image ? (
              <img
                src={studio.image}
                alt={studio.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No image available
              </div>
            )}

            <span className="absolute bottom-5 left-5 rounded-full bg-background/95 px-4 py-2 text-sm font-semibold">
              {studio.category}
            </span>
          </div>

          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_340px]">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {studio.title}
              </h1>

              <p className="mt-4 flex items-center gap-2 text-muted-foreground">
                <MapPin size={18} className="text-orange-500" />
                {studio.location}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                {Number(reviewSummary.reviewCount) > 0 ? (
                  <>
                    <span className="font-semibold">
                      {Number(reviewSummary.averageRating).toFixed(1)}
                    </span>
                    <span className="text-muted-foreground">
                      ({reviewSummary.reviewCount}{" "}
                      {Number(reviewSummary.reviewCount) === 1
                        ? "review"
                        : "reviews"})
                    </span>
                  </>
                ) : (
                  <span className="text-muted-foreground">
                    No reviews yet
                  </span>
                )}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-muted/50 p-4">
                  <Users className="mb-2 text-orange-500" size={21} />
                  <p className="text-xs text-muted-foreground">Capacity</p>
                  <p className="mt-1 font-bold">
                    {studio.maxCapacity} people
                  </p>
                </div>

                <div className="rounded-xl bg-muted/50 p-4">
                  <CalendarDays className="mb-2 text-orange-500" size={21} />
                  <p className="text-xs text-muted-foreground">Hourly Rate</p>
                  <p className="mt-1 font-bold">
                    ৳{Number(studio.hourlyRate || 0).toLocaleString("en-BD")}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/50 p-4">
                  <ShieldCheck className="mb-2 text-orange-500" size={21} />
                  <p className="text-xs text-muted-foreground">
                    Security Deposit
                  </p>
                  <p className="mt-1 font-bold">
                    ৳{Number(studio.securityDeposit || 0).toLocaleString("en-BD")}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold">About this studio</h2>
                <p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">
                  {studio.overview}
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold">Studio Amenities</h2>

                {studio.amenities?.length > 0 ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {studio.amenities.map((amenity, index) => (
                      <div
                        key={`${amenity}-${index}`}
                        className="flex items-center gap-3 rounded-lg bg-muted/40 p-3 text-sm"
                      >
                        <CheckCircle2
                          size={18}
                          className="shrink-0 text-orange-500"
                        />
                        {amenity}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    No amenities listed.
                  </p>
                )}
              </div>

              <div className="mt-12 border-t border-border pt-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Customer Reviews
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Feedback from people who have booked this studio.
                    </p>
                  </div>

                  {Number(reviewSummary.reviewCount) > 0 && (
                    <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-3">
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      <span className="text-lg font-bold">
                        {Number(reviewSummary.averageRating).toFixed(1)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / 5
                      </span>
                    </div>
                  )}
                </div>

                {reviewsLoading ? (
                  <div className="flex justify-center py-12">
                    <LoaderCircle className="h-7 w-7 animate-spin text-orange-500" />
                  </div>
                ) : reviewError ? (
                  <p className="mt-6 text-sm text-red-500">
                    {reviewError}
                  </p>
                ) : reviews.length === 0 ? (
                  <div className="mt-6 rounded-xl border border-dashed border-border py-12 text-center">
                    <Star className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-3 font-semibold">
                      No reviews yet
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Be the first to share your experience after booking this studio.
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {reviews.map((review) => (
                      <article
                        key={review._id || review.createdAt}
                        className="rounded-xl border border-border p-5"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                              <User size={19} />
                            </div>

                            <div>
                              <p className="font-semibold">
                                {review.renterName || "Studio Guest"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {review.createdAt
                                  ? new Date(review.createdAt).toLocaleDateString(
                                      "en-BD",
                                      {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      }
                                    )
                                  : ""}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={15}
                                className={
                                  star <= Number(review.rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground"
                                }
                              />
                            ))}
                          </div>
                        </div>

                        <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                          {review.comment}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <aside>
              <div className="rounded-2xl border border-border p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Hosted by</p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                    <User size={23} />
                  </div>
                  <div>
                    <p className="font-bold">
                      {studio.hostName || "Studio Host"}
                    </p>
                    <p className="text-xs text-muted-foreground">Studio Host</p>
                  </div>
                </div>

                <div className="my-6 border-t border-border" />

                <p className="text-sm text-muted-foreground">Price per hour</p>
                <p className="mt-1 text-3xl font-bold">
                  ৳{Number(studio.hourlyRate || 0).toLocaleString("en-BD")}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  Security deposit: ৳
                  {Number(studio.securityDeposit || 0).toLocaleString("en-BD")}
                </p>

                <Link
                  href={`/studios/${studio._id}/book`}
                  className="mt-7 flex w-full items-center justify-center rounded-full bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  Check Availability
                </Link>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Booking requests are subject to host confirmation.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
