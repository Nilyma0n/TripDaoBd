import type { Hotel } from "../../types/hotel";

export const hotels: Hotel[] = [
  {
    id: "hotel-001",
    slug: "sayeman-beach-resort",

    name: "Sayeman Beach Resort",

    district: "Cox's Bazar",
    division: "Chattogram",

    destination: "coxs-bazar",

    description:
      "Luxury beachfront resort with swimming pool and sea view.",

    image: "/images/hotels/sayeman.jpg",

    gallery: [],

    pricePerNight: 8500,

    rating: 4.8,

    totalReviews: 320,

    amenities: [
      "WiFi",
      "Swimming Pool",
      "Restaurant",
      "Parking",
      "Sea View"
    ],

    latitude: 21.421,
    longitude: 91.983,

    mapUrl:
      "https://www.google.com/maps?q=21.421,91.983",

    featured: true,
  },
];