
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getStudios() {
  const response = await fetch(`${API_URL}/api/studios`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch studios");
  }

  const result = await response.json();
  return result.data || [];
}

export async function getStudioById(id) {
  const response = await fetch(`${API_URL}/api/studios/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch studio details");
  }

  const result = await response.json();
  return result.data;
}

export async function uploadStudioImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_URL}/api/uploads`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to upload image");
  }

  return result.data.url;
}

export async function createBooking(bookingData) {
  const response = await fetch(`${API_URL}/api/bookings`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create booking");
  }

  return result.data;
}

export async function getMyBookings() {
  const response = await fetch(`${API_URL}/api/bookings/my-bookings`, {
    credentials: "include",
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to load bookings");
  }

  return result.data || [];
}

export async function cancelBooking(id) {
  const response = await fetch(`${API_URL}/api/bookings/${id}/cancel`, {
    method: "PATCH",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to cancel booking");
  }

  return result;
}

export async function updateBookingStatus(id, status) {
  const response = await fetch(`${API_URL}/api/bookings/${id}/status`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update booking");
  }

  return result;
}

export async function createStudio(studioData) {
  const response = await fetch(`${API_URL}/api/studios`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studioData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message === "Required fields are missing"
        ? `Missing fields: ${(result.missingFields || []).join(", ")}`
        : result.message || "Failed to create studio"
    );
  }

  return result.data;
}

export async function deleteStudio(id) {
  const response = await fetch(`${API_URL}/api/studios/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete studio");
  }

  return result;
}

export async function updateStudio(id, studioData) {
  const response = await fetch(`${API_URL}/api/studios/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studioData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update studio");
  }

  return result.data;
}

export async function getStudioReviews(studioId) {
  const response = await fetch(
    `${API_URL}/api/reviews/studio/${studioId}`,
    {
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch studio reviews");
  }

  return result.data;
}

export async function createReview(reviewData) {
  const response = await fetch(`${API_URL}/api/reviews`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to submit review");
  }

  return result.data;
}

export async function getMyReviews() {
  const response = await fetch(`${API_URL}/api/reviews/my-reviews`, {
    credentials: "include",
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch your reviews");
  }

  return result.data;
}
