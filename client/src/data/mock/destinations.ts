import type { Destination } from "../../types/destination";

import coxHero from "../../assets/images/destinations/coxs-bazar-hero.jpg";
import cox1 from "../../assets/images/destinations/coxs-bazar-1.jpg";
import cox2 from "../../assets/images/destinations/coxs-bazar-2.jpg";
import cox3 from "../../assets/images/destinations/coxs-bazar-3.jpg";

export const destinations: Destination[] = [
  {
    id: "dest-001",
    slug: "coxs-bazar",

    name: "Cox's Bazar",
    district: "Cox's Bazar",
    division: "Chattogram",

    category: "Beach",

    shortDescription:
      "The world's longest uninterrupted natural sea beach.",

    description:
      "Cox's Bazar is the world's longest uninterrupted natural sea beach stretching over 120 kilometers. It is Bangladesh's most popular tourist destination, famous for its golden sandy beach, spectacular sunsets, Marine Drive, seafood, Himchari National Park, Inani Beach, and many nearby attractions.",

    heroImage: coxHero,

    images: [
      cox1,
      cox2,
      cox3,
    ],

    latitude: 21.4272,
    longitude: 92.0058,

    mapUrl: "https://www.google.com/maps?q=21.4272,92.0058",

    bestSeason: "November - February",

    openingHours: "Open 24 Hours",

    entryFee: 0,

    estimatedDuration: "2-3 Days",

    rating: 4.9,

    totalReviews: 2540,

    featured: true,

    popular: true,

    thingsToDo: [
      "Swimming",
      "Surfing",
      "Boat Ride",
      "Photography",
      "Beach Walking",
      "Sea Food Tasting",
    ],

    highlights: [
      "Longest Sea Beach",
      "Marine Drive",
      "Sunset View",
      "Laboni Beach",
      "Himchari National Park",
      "Inani Beach",
    ],

    nearbyHotels: [
      "Sayeman Beach Resort",
      "Long Beach Hotel",
      "Sea Pearl Beach Resort",
      "Ocean Paradise Hotel",
      "Hotel Sea Crown",
    ],

hotels: [
  {
    id: "hotel-001",
    slug: "sayeman-beach-resort",
    name: "Sayeman Beach Resort",
    pricePerNight: 8500,
    rating: 4.8,
  },
  {
    id: "hotel-002",
    slug: "long-beach-hotel",
    name: "Long Beach Hotel",
    pricePerNight: 6200,
    rating: 4.6,
  },
  {
    id: "hotel-003",
    slug: "sea-pearl-beach-resort",
    name: "Sea Pearl Beach Resort",
    pricePerNight: 9800,
    rating: 4.7,
  },
],

    reviews: [
      {
        user: "Rahim",
        rating: 5,
        comment: "Amazing beach with beautiful sunset views.",
        date: "2026-07-10",
      },
      {
        user: "Karim",
        rating: 5,
        comment: "One of the best travel destinations in Bangladesh.",
        date: "2026-07-15",
      },
      {
        user: "Nusrat",
        rating: 4,
        comment: "Great place for family vacations.",
        date: "2026-07-20",
      },
    ],
  },
];