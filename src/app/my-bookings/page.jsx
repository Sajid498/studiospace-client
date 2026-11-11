
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  LoaderCircle,
  Star,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import {
  getMyBookings,
  getMyReviews,
  cancelBooking,
  updateBookingStatus,
  createReview,
} from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function MyBookingsPage() {
  const { data: session, isPending } = useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");
  const [reviewSubmittingId, setReviewSubmittingId] = useState("");
  const [error, setError] = useState("");
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [reviewedIds, setReviewedIds] = useState([]);
  const [reviewDrafts, setReviewDrafts] = useState({});

const loadBookings = async () => {
  try {
    setLoading(true);
    setError("");

    const [bookingData, reviewData] = await Promise.all([
      getMyBookings(),
      getMyReviews(),
    ]);

    setBookings(bookingData);
    setReviewedIds(reviewData);
  } catch (err) {
    setError(err.message || "Failed to load bookings");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (!isPending && session?.user) {
      loadBookings();
    } else if (!isPending) {
      setLoading(false);
    }
  }, [isPending, session]);

  const handleAction = async (id, action, status) => {
    try {
      setProcessingId(id);

      if (action === "cancel") {
        await cancelBooking(id);
        toast.success("Booking cancelled successfully");
      } else {
        await updateBookingStatus(id, status);
        toast.success(`Booking ${status.toLowerCase()} successfully`);
      }

      await loadBookings();
    } catch (err) {
      toast.error(err.message || "Action failed");
    } finally {
      setProcessingId("");
    }
  };

  const handleReviewDraftChange = (bookingId, field, value) => {
    setReviewDrafts((previous) => ({
      ...previous,
      [bookingId]: {
        rating: previous[bookingId]?.rating || 0,
        comment: previous[bookingId]?.comment || "",
        ...previous[bookingId],
        [field]: value,
      },
    }));
  };

  const handleSubmitReview = async (bookingId) => {
    const draft = reviewDrafts[bookingId];

    if (!draft?.rating || draft.rating < 1 || draft.rating > 5) {
      toast.error("Please select a rating from 1 to 5 stars.");
      return;
    }

    if (!draft.comment?.trim() || draft.comment.trim().length < 5) {
      toast.error("Your review must contain at least 5 characters.");
      return;
    }

    if (draft.comment.trim().length > 1000) {
      toast.error("Your review cannot exceed 1000 characters.");
      return;
    }

    try {
      setReviewSubmittingId(bookingId);

      await createReview({
        bookingId,
        rating: Number(draft.rating),
        comment: draft.comment.trim(),
      });

      setReviewedIds((previous) => [...previous, bookingId]);

      setReviewDrafts((previous) => ({
        ...previous,
        [bookingId]: {
          rating: 0,
          comment: "",
        },
      }));

      toast.success("Your review has been submitted successfully.");
    } catch (err) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setReviewSubmittingId("");
    }
  };

  const formatDate = (value) =>
    new Date(value).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const getStatusStyle = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-800",
      Confirmed: "bg-green-100 text-green-800",
      Completed: "bg-blue-100 text-blue-800",
      Cancelled: "bg-red-100 text-red-800",
    };

    return styles[status] || "bg-gray-100 text-gray-800";
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
          Please log in to view your bookings.
        </p>
        <Link
          href="/login"
          className="mt-5 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white"
        >
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Your Reservations
          </p>
          <h1 className="mt-3 text-3xl font-bold">My Bookings</h1>
          <p className="mt-2 text-muted-foreground">
            View and manage your studio reservations.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
            <button
              onClick={loadBookings}
              className="ml-3 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {!error && bookings.length === 0 && (
          <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-5 text-xl font-semibold">No bookings yet</h2>
            <p className="mt-2 text-muted-foreground">
              Explore studios and reserve your first creative space.
            </p>
            <Link
              href="/studios"
              className="mt-6 inline-flex rounded-full bg-orange-500 px-7 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Explore Studios
            </Link>
          </div>
        )}

        <div className="grid gap-6">
          {bookings.map((booking) => {
            const isRenter = booking.renterId === session.user.id;
            const isHost = booking.hostId === session.user.id;
            const processing = processingId === booking._id;

            const canReview =
              isRenter &&
              booking.status === "Completed" &&
              new Date(booking.endAt) <= new Date();

            const alreadyReviewed = reviewedIds.includes(booking._id);
            const draft = reviewDrafts[booking._id] || {
              rating: 0,
              comment: "",
            };

            const submittingReview =
              reviewSubmittingId === booking._id;

            return (
              <article
                key={booking._id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="grid md:grid-cols-[240px_1fr]">
                  {booking.studioImage ? (
                    <img
                      src={booking.studioImage}
                      alt={booking.studioTitle}
                      className="h-52 w-full object-cover md:h-full"
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-muted text-sm text-muted-foreground md:h-full">
                      No image available
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-orange-500">
                        {booking.studioCategory}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <h2 className="mt-3 text-xl font-bold">
                      {booking.studioTitle}
                    </h2>

                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={16} />
                      {booking.location || "Location unavailable"}
                    </p>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Booking starts
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                          <CalendarDays size={16} />
                          {formatDate(booking.startAt)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Booking ends
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                          <Clock size={16} />
                          {formatDate(booking.endAt)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Estimated rental cost
                        </p>
                        <p className="mt-1 text-lg font-bold text-orange-500">
                          ৳
                          {Number(booking.totalPrice || 0).toLocaleString(
                            "en-BD"
                          )}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {isRenter && booking.status === "Pending" && (
                          <button
                            disabled={processing}
                            onClick={() => setBookingToCancel(booking)}
                            className="rounded-full border border-red-500 px-5 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:opacity-50"
                          >
                            {processing ? "Processing..." : "Cancel Booking"}
                          </button>
                        )}

                        {isHost && booking.status === "Pending" && (
                          <button
                            disabled={processing}
                            onClick={() =>
                              handleAction(
                                booking._id,
                                "update",
                                "Confirmed"
                              )
                            }
                            className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                          >
                            {processing ? "Processing..." : "Confirm Booking"}
                          </button>
                        )}

                        {isHost && booking.status === "Confirmed" && (
                          <button
                            disabled={processing}
                            onClick={() =>
                              handleAction(
                                booking._id,
                                "update",
                                "Completed"
                              )
                            }
                            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                          >
                            {processing ? "Processing..." : "Mark Completed"}
                          </button>
                        )}
                      </div>
                    </div>

                    {canReview && (
                      <div className="mt-6 border-t border-border pt-6">
                        {alreadyReviewed ? (
                          <div className="rounded-xl bg-green-50 p-4 text-sm font-medium text-green-800">
                            Thank you! You have submitted your review for this
                            booking.
                          </div>
                        ) : (
                          <div>
                            <h3 className="text-lg font-bold">
                              Share Your Experience
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                              Rate this studio based on your booking
                              experience.
                            </p>

                            <div className="mt-4">
                              <p className="mb-2 text-sm font-medium">
                                Your Rating
                              </p>

                              <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <button
                                    key={rating}
                                    type="button"
                                    disabled={submittingReview}
                                    onClick={() =>
                                      handleReviewDraftChange(
                                        booking._id,
                                        "rating",
                                        rating
                                      )
                                    }
                                    aria-label={`Rate ${rating} out of 5`}
                                    className="rounded p-1 transition hover:scale-110 disabled:opacity-50"
                                  >
                                    <Star
                                      size={27}
                                      className={
                                        rating <= draft.rating
                                          ? "fill-amber-400 text-amber-400"
                                          : "text-muted-foreground"
                                      }
                                    />
                                  </button>
                                ))}
                              </div>

                              <p className="mt-1 text-xs text-muted-foreground">
                                {draft.rating > 0
                                  ? `${draft.rating} out of 5 stars`
                                  : "Select your rating"}
                              </p>
                            </div>

                            <div className="mt-4">
                              <label
                                htmlFor={`review-${booking._id}`}
                                className="mb-2 block text-sm font-medium"
                              >
                                Your Review
                              </label>

                              <textarea
                                id={`review-${booking._id}`}
                                rows={4}
                                minLength={5}
                                maxLength={1000}
                                value={draft.comment}
                                disabled={submittingReview}
                                onChange={(event) =>
                                  handleReviewDraftChange(
                                    booking._id,
                                    "comment",
                                    event.target.value
                                  )
                                }
                                placeholder="Tell others about your experience..."
                                className="w-full resize-y rounded-xl border border-input bg-background p-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50"
                              />

                              <p className="mt-1 text-right text-xs text-muted-foreground">
                                {draft.comment.length}/1000 characters
                              </p>
                            </div>

                            <button
                              type="button"
                              disabled={submittingReview}
                              onClick={() => handleSubmitReview(booking._id)}
                              className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {submittingReview ? (
                                <>
                                  <LoaderCircle
                                    size={16}
                                    className="animate-spin"
                                  />
                                  Submitting...
                                </>
                              ) : (
                                <>
                                  <Send size={16} />
                                  Submit Review
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {bookingToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-booking-title"
            className="w-full max-w-md rounded-2xl border border-border bg-card p-7 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <CalendarDays size={24} />
            </div>

            <h2
              id="cancel-booking-title"
              className="mt-5 text-xl font-bold"
            >
              Cancel this booking?
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Are you sure you want to cancel your booking for{" "}
              <span className="font-semibold text-foreground">
                {bookingToCancel.studioTitle}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex flex-wrap justify-end gap-3">
              <button
                disabled={processingId === bookingToCancel._id}
                onClick={() => setBookingToCancel(null)}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted disabled:opacity-50"
              >
                Keep Booking
              </button>

              <button
                disabled={processingId === bookingToCancel._id}
                onClick={async () => {
                  const bookingId = bookingToCancel._id;
                  setBookingToCancel(null);
                  await handleAction(bookingId, "cancel");
                }}
                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
