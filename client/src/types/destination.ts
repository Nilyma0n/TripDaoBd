export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Hotel {
  id: string;
  slug: string;

  name: string;

  image?: string;

  pricePerNight: number;

  rating: number;
}

export interface Destination {
  // Basic Info
  id: string;
  slug: string;

  name: string;
  district: string;
  division: string;

  category:
    | "Beach"
    | "Hill"
    | "Forest"
    | "River"
    | "Historical"
    | "Island"
    | "Lake"
    | "Tea Garden"
    | "Haor"
    | "Nature"
    | "Waterfall";

  shortDescription: string;
  description: string;

  // Images
  heroImage: string;
  images: string[];

  // Location
  latitude: number;
  longitude: number;

  mapUrl: string;

  // Travel Information
  bestSeason: string;
  openingHours: string;
  entryFee: number;
  estimatedDuration: string;

  // Ratings
  rating: number;
  totalReviews: number;

  // Flags
  featured: boolean;
  popular: boolean;

  // Travel Guide
  thingsToDo: string[];
  highlights: string[];
  nearbyHotels: string[];

  // Hotels
  hotels: Hotel[];

  // Reviews
  reviews: Review[];
}