export interface EmergencyService {
  id: string;
  slug: string;

  name: string;

  type:
    | "Hospital"
    | "Police"
    | "Fire Service"
    | "Tourist Police"
    | "Ambulance";

  district: string;
  division: string;

  address: string;

  phone: string;

  email?: string;

  website?: string;

  latitude: number;
  longitude: number;

  mapUrl: string;

  image: string;

  description: string;

  available24Hours: boolean;

  featured: boolean;
}