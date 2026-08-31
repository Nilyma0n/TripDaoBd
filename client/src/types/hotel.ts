export interface Hotel {
  id: string;
  slug: string;

  name: string;

  district: string;
  division: string;

  destination: string;

  description: string;

  image: string;

  gallery: string[];

  pricePerNight: number;

  rating: number;

  totalReviews: number;

  amenities: string[];

  latitude: number;
  longitude: number;

  mapUrl: string;

  featured: boolean;
}