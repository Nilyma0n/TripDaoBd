export interface Transport {
  id: string;
  slug: string;

  name: string;

  type:
    | "Bus"
    | "Train"
    | "Flight"
    | "Launch"
    | "Car Rental";

  company: string;

  from: string;
  to: string;

  duration: string;

  departureTime: string;

  arrivalTime: string;

  price: number;

  rating: number;

  totalReviews: number;

  image: string;

  gallery: string[];

  amenities: string[];

  description: string;

  bookingUrl: string;

  mapUrl: string;

  featured: boolean;
}