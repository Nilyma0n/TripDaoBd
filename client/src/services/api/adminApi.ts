const API_URL = "http://localhost:5000/api";

// =====================================================
// GET AUTH TOKEN
// =====================================================

const getToken = (): string | null => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken")
  );
};

// =====================================================
// COMMON ADMIN REQUEST
// =====================================================

const adminRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Admin request failed."
    );
  }

  return data;
};

// =====================================================
// TYPES
// =====================================================

export interface AdminBooking {
  id: number;
  user_id: number;

  full_name?: string | null;
  email?: string | null;
  phone?: string | null;

  user_name?: string | null;
  user_email?: string | null;

  guests: number;
  rooms: number;

  check_in: string;
  check_out: string;

  special_request?: string | null;

  destination: string;
  location: string;

  room_price: number;
  service_fee: number;
  vat: number;
  total_price: number;

  status:
    | "Pending"
    | "Confirmed"
    | "Cancelled"
    | "Rejected"
    | string;

  created_at?: string;
  updated_at?: string;
}

// =====================================================
// RESPONSE TYPES
// =====================================================

export interface AdminBookingsResponse {
  success: boolean;
  count: number;
  bookings: AdminBooking[];
}

export interface AdminBookingResponse {
  success: boolean;
  booking: AdminBooking;
}

export interface AdminBookingActionResponse {
  success: boolean;
  message: string;
  booking?: AdminBooking;
  booking_id?: number | string;
  status?: string;
  payment?: {
    status: string;
    message: string;
  };
}

// =====================================================
// GET ALL BOOKINGS
// GET /api/admin/bookings
// =====================================================

export const getAllBookings =
  async (): Promise<AdminBookingsResponse> => {
    return adminRequest<AdminBookingsResponse>(
      "/admin/bookings"
    );
  };

// =====================================================
// GET SINGLE BOOKING
// GET /api/admin/bookings/:id
// =====================================================

export const getAdminBookingById =
  async (
    bookingId: number | string
  ): Promise<AdminBookingResponse> => {
    return adminRequest<AdminBookingResponse>(
      `/admin/bookings/${bookingId}`
    );
  };

// =====================================================
// CONFIRM BOOKING
// PUT /api/admin/bookings/:id/confirm
// =====================================================

export const confirmBooking =
  async (
    bookingId: number | string
  ): Promise<AdminBookingActionResponse> => {
    return adminRequest<AdminBookingActionResponse>(
      `/admin/bookings/${bookingId}/confirm`,
      {
        method: "PUT",
      }
    );
  };

// =====================================================
// REJECT BOOKING
// PUT /api/admin/bookings/:id/reject
// =====================================================

export const rejectBooking =
  async (
    bookingId: number | string
  ): Promise<AdminBookingActionResponse> => {
    return adminRequest<AdminBookingActionResponse>(
      `/admin/bookings/${bookingId}/reject`,
      {
        method: "PUT",
      }
    );
  };