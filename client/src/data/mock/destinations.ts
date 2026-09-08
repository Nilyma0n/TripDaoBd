import type { Destination } from "../../types/destination";

import coxHero from "../../assets/images/destinations/coxs-bazar-hero.jpg";
import cox1 from "../../assets/images/destinations/coxs-bazar-1.jpg";
import cox2 from "../../assets/images/destinations/coxs-bazar-2.jpg";
import cox3 from "../../assets/images/destinations/coxs-bazar-3.jpg";

/*
 * Temporary image setup:
 * Only Cox's Bazar images currently exist in the project.
 * These images are reused temporarily for the newly added destinations.
 * Later we can replace them with individual destination images.
 */

const defaultImages = [cox1, cox2, cox3];

/*
 * Reusable destination factory.
 *
 * Existing destinations keep their complete original structure.
 * New destinations can use this helper to avoid repeating
 * the same default fields again and again.
 */
const createDestination = (
  data: Pick<
    Destination,
    | "id"
    | "slug"
    | "name"
    | "district"
    | "division"
    | "category"
    | "shortDescription"
    | "description"
    | "latitude"
    | "longitude"
    | "mapUrl"
    | "bestSeason"
    | "openingHours"
    | "entryFee"
    | "estimatedDuration"
    | "thingsToDo"
    | "highlights"
  > &
    Partial<
      Pick<
        Destination,
        | "featured"
        | "popular"
        | "rating"
        | "totalReviews"
        | "nearbyHotels"
        | "hotels"
        | "reviews"
      >
    >
): Destination => ({
  ...data,

  heroImage: coxHero,
  images: defaultImages,

  rating: data.rating ?? 0,
  totalReviews: data.totalReviews ?? 0,

  featured: data.featured ?? false,
  popular: data.popular ?? false,

  nearbyHotels: data.nearbyHotels ?? [],
  hotels: data.hotels ?? [],
  reviews: data.reviews ?? [],
});

export const destinations: Destination[] = [
  // =====================================================
  // 01. COX'S BAZAR
  // =====================================================
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
      "Cox's Bazar is one of Bangladesh's most popular tourist destinations, famous for its long sandy beach, spectacular sunsets, Marine Drive, seafood, Himchari and Inani Beach.",

    heroImage: coxHero,
    images: defaultImages,

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

  // =====================================================
  // 02. SAINT MARTIN
  // =====================================================
  {
    id: "dest-002",
    slug: "saint-martin",
    name: "Saint Martin's Island",
    district: "Cox's Bazar",
    division: "Chattogram",
    category: "Island",

    shortDescription:
      "A beautiful coral island surrounded by the blue waters of the Bay of Bengal.",

    description:
      "Saint Martin's Island is a peaceful tropical destination famous for its coral shoreline, clear blue water, coconut trees, seafood and beautiful sunsets.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 20.6275,
    longitude: 92.3225,

    mapUrl: "https://www.google.com/maps?q=20.6275,92.3225",

    bestSeason: "November - March",
    openingHours: "Day Visit",
    entryFee: 0,
    estimatedDuration: "1-2 Days",

    rating: 4.8,
    totalReviews: 1860,

    featured: true,
    popular: true,

    thingsToDo: [
      "Island Walking",
      "Boat Ride",
      "Photography",
      "Sunset Watching",
      "Seafood Tasting",
      "Cycling",
    ],

    highlights: [
      "Coral Island",
      "Blue Water",
      "Coconut Trees",
      "Sunset",
      "Chhera Dwip",
      "Fresh Seafood",
    ],

    nearbyHotels: [
      "Blue Marine Resort",
      "Saint Martin Resort",
      "Dream Night Resort",
    ],

    hotels: [
      {
        id: "hotel-004",
        slug: "blue-marine-resort",
        name: "Blue Marine Resort",
        pricePerNight: 4500,
        rating: 4.5,
      },
      {
        id: "hotel-005",
        slug: "saint-martin-resort",
        name: "Saint Martin Resort",
        pricePerNight: 3800,
        rating: 4.3,
      },
    ],

    reviews: [
      {
        user: "Sadia",
        rating: 5,
        comment: "A peaceful island escape with beautiful views.",
        date: "2026-06-12",
      },
      {
        user: "Tanvir",
        rating: 4,
        comment: "Loved the island atmosphere and seafood.",
        date: "2026-06-20",
      },
    ],
  },

  // =====================================================
  // 03. SUNDARBANS
  // =====================================================
  {
    id: "dest-003",
    slug: "sundarbans",
    name: "Sundarbans",
    district: "Khulna",
    division: "Khulna",
    category: "Forest",

    shortDescription:
      "The world's largest mangrove forest and a remarkable wildlife destination.",

    description:
      "The Sundarbans is a vast mangrove forest known for its rivers, canals, wildlife and unique natural ecosystem.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 21.9497,
    longitude: 89.1833,

    mapUrl: "https://www.google.com/maps?q=21.9497,89.1833",

    bestSeason: "November - February",
    openingHours: "Daylight Hours",
    entryFee: 300,
    estimatedDuration: "2-3 Days",

    rating: 4.8,
    totalReviews: 1430,

    featured: true,
    popular: true,

    thingsToDo: [
      "Boat Safari",
      "Wildlife Watching",
      "Photography",
      "Forest Trekking",
      "Bird Watching",
      "River Cruise",
    ],

    highlights: [
      "Mangrove Forest",
      "Wildlife",
      "Boat Safari",
      "Rivers and Canals",
      "Bird Watching",
      "Natural Beauty",
    ],

    nearbyHotels: [
      "Tiger Garden International Hotel",
      "Hotel Castle Salam",
      "Western Inn",
    ],

    hotels: [
      {
        id: "hotel-006",
        slug: "tiger-garden-hotel",
        name: "Tiger Garden International Hotel",
        pricePerNight: 5000,
        rating: 4.4,
      },
      {
        id: "hotel-007",
        slug: "castle-salam",
        name: "Hotel Castle Salam",
        pricePerNight: 4200,
        rating: 4.3,
      },
    ],

    reviews: [
      {
        user: "Arafat",
        rating: 5,
        comment: "The boat journey through the forest was unforgettable.",
        date: "2026-05-14",
      },
      {
        user: "Mim",
        rating: 5,
        comment: "A wonderful destination for nature lovers.",
        date: "2026-05-22",
      },
    ],
  },

  // =====================================================
  // 04. SYLHET
  // =====================================================
  {
    id: "dest-004",
    slug: "sylhet",
    name: "Sylhet",
    district: "Sylhet",
    division: "Sylhet",
    category: "Nature",

    shortDescription:
      "A green destination famous for tea gardens, rivers, hills and natural beauty.",

    description:
      "Sylhet is one of Bangladesh's most scenic regions, surrounded by tea gardens, rivers, hills, forests and beautiful natural attractions.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 24.8949,
    longitude: 91.8687,

    mapUrl: "https://www.google.com/maps?q=24.8949,91.8687",

    bestSeason: "October - March",
    openingHours: "Open 24 Hours",
    entryFee: 0,
    estimatedDuration: "2-3 Days",

    rating: 4.7,
    totalReviews: 1250,

    featured: true,
    popular: true,

    thingsToDo: [
      "Tea Garden Visit",
      "River Cruise",
      "Photography",
      "Nature Walk",
      "Local Food",
      "Sightseeing",
    ],

    highlights: [
      "Tea Gardens",
      "Surma River",
      "Ratargul",
      "Jaflong",
      "Bichanakandi",
      "Lalakhal",
    ],

    nearbyHotels: [
      "Rose View Hotel",
      "Hotel Star Pacific",
      "Nirvana Inn",
    ],

    hotels: [
      {
        id: "hotel-008",
        slug: "rose-view-hotel",
        name: "Rose View Hotel",
        pricePerNight: 6500,
        rating: 4.6,
      },
      {
        id: "hotel-009",
        slug: "star-pacific",
        name: "Hotel Star Pacific",
        pricePerNight: 5200,
        rating: 4.4,
      },
    ],

    reviews: [
      {
        user: "Rafi",
        rating: 5,
        comment: "Sylhet is incredibly green and peaceful.",
        date: "2026-04-11",
      },
      {
        user: "Jannat",
        rating: 4,
        comment: "Perfect for a relaxing nature trip.",
        date: "2026-04-19",
      },
    ],
  },

  // =====================================================
  // 05. SREEMANGAL
  // =====================================================
  {
    id: "dest-005",
    slug: "sreemangal",
    name: "Sreemangal",
    district: "Moulvibazar",
    division: "Sylhet",
    category: "Tea Garden",

    shortDescription:
      "The tea capital of Bangladesh surrounded by endless green tea gardens.",

    description:
      "Sreemangal is famous for its beautiful tea gardens, peaceful forests, lakes and refreshing green landscapes.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 24.3065,
    longitude: 91.7296,

    mapUrl: "https://www.google.com/maps?q=24.3065,91.7296",

    bestSeason: "October - March",
    openingHours: "Open 24 Hours",
    entryFee: 0,
    estimatedDuration: "1-2 Days",

    rating: 4.8,
    totalReviews: 980,

    featured: true,
    popular: true,

    thingsToDo: [
      "Tea Garden Tour",
      "Cycling",
      "Photography",
      "Nature Walk",
      "Bird Watching",
      "Lake Visit",
    ],

    highlights: [
      "Tea Gardens",
      "Lawachara National Park",
      "Madhabpur Lake",
      "Seven Layer Tea",
      "Green Hills",
    ],

    nearbyHotels: [
      "Grand Sultan Tea Resort",
      "Hotel Merina",
      "Tea Heaven Resort",
    ],

    hotels: [
      {
        id: "hotel-010",
        slug: "grand-sultan",
        name: "Grand Sultan Tea Resort",
        pricePerNight: 9000,
        rating: 4.8,
      },
      {
        id: "hotel-011",
        slug: "tea-heaven",
        name: "Tea Heaven Resort",
        pricePerNight: 4500,
        rating: 4.4,
      },
    ],

    reviews: [
      {
        user: "Nabila",
        rating: 5,
        comment: "The tea gardens are incredibly beautiful.",
        date: "2026-03-14",
      },
      {
        user: "Shuvo",
        rating: 5,
        comment: "A perfect peaceful weekend destination.",
        date: "2026-03-21",
      },
    ],
  },

  // =====================================================
  // 06. JAFLONG
  // =====================================================
  {
    id: "dest-006",
    slug: "jaflong",
    name: "Jaflong",
    district: "Sylhet",
    division: "Sylhet",
    category: "Nature",

    shortDescription:
      "A scenic border destination surrounded by hills, rivers and stone beds.",

    description:
      "Jaflong is a beautiful natural destination near the Bangladesh-India border, famous for its green hills, clear river water and stone collections.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 25.1625,
    longitude: 92.0177,

    mapUrl: "https://www.google.com/maps?q=25.1625,92.0177",

    bestSeason: "October - March",
    openingHours: "Open 24 Hours",
    entryFee: 0,
    estimatedDuration: "1 Day",

    rating: 4.7,
    totalReviews: 890,

    featured: false,
    popular: true,

    thingsToDo: [
      "River Visit",
      "Photography",
      "Hill View",
      "Stone Collection",
      "Sightseeing",
    ],

    highlights: [
      "Dawki River",
      "Green Hills",
      "Stone Beds",
      "Border View",
      "Waterfall",
    ],

    nearbyHotels: [
      "Jaflong Green Resort",
      "Nazimgarh Resort",
    ],

    hotels: [
      {
        id: "hotel-012",
        slug: "jaflong-green-resort",
        name: "Jaflong Green Resort",
        pricePerNight: 3500,
        rating: 4.2,
      },
    ],

    reviews: [
      {
        user: "Fahim",
        rating: 5,
        comment: "Beautiful hills and crystal-clear river water.",
        date: "2026-02-15",
      },
      {
        user: "Tania",
        rating: 4,
        comment: "Great place for photography.",
        date: "2026-02-18",
      },
    ],
  },

  // =====================================================
  // 07. BICHANAKANDI
  // =====================================================
  {
    id: "dest-007",
    slug: "bichanakandi",
    name: "Bichanakandi",
    district: "Sylhet",
    division: "Sylhet",
    category: "Waterfall",

    shortDescription:
      "A breathtaking landscape of rocks, streams and green hills.",

    description:
      "Bichanakandi is a naturally beautiful destination where mountain streams flow across large stones surrounded by green hills.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 25.1872,
    longitude: 91.9061,

    mapUrl: "https://www.google.com/maps?q=25.1872,91.9061",

    bestSeason: "June - September",
    openingHours: "Daylight Hours",
    entryFee: 0,
    estimatedDuration: "1 Day",

    rating: 4.8,
    totalReviews: 760,

    featured: false,
    popular: true,

    thingsToDo: [
      "Water Stream Visit",
      "Photography",
      "Boat Ride",
      "Nature Walk",
      "Hill View",
    ],

    highlights: [
      "Mountain Streams",
      "Stone Beds",
      "Green Hills",
      "Waterfalls",
      "Natural Landscape",
    ],

    nearbyHotels: [
      "Bichanakandi Resort",
      "Nazimgarh Resort",
    ],

    hotels: [
      {
        id: "hotel-013",
        slug: "bichanakandi-resort",
        name: "Bichanakandi Resort",
        pricePerNight: 3200,
        rating: 4.2,
      },
    ],

    reviews: [
      {
        user: "Imran",
        rating: 5,
        comment: "Amazing natural scenery.",
        date: "2026-08-05",
      },
      {
        user: "Mahi",
        rating: 4,
        comment: "Beautiful during the rainy season.",
        date: "2026-08-08",
      },
    ],
  },

  // =====================================================
  // 08. BANDARBAN
  // =====================================================
  {
    id: "dest-008",
    slug: "bandarban",
    name: "Bandarban",
    district: "Bandarban",
    division: "Chattogram",
    category: "Hill",

    shortDescription:
      "A spectacular hill destination filled with mountains, clouds and waterfalls.",

    description:
      "Bandarban is one of Bangladesh's most beautiful hill regions, known for mountains, tribal culture, waterfalls, viewpoints and adventurous trails.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 22.1953,
    longitude: 92.2184,

    mapUrl: "https://www.google.com/maps?q=22.1953,92.2184",

    bestSeason: "November - March",
    openingHours: "Open 24 Hours",
    entryFee: 0,
    estimatedDuration: "2-3 Days",

    rating: 4.9,
    totalReviews: 1320,

    featured: true,
    popular: true,

    thingsToDo: [
      "Mountain Hiking",
      "Waterfall Visit",
      "Photography",
      "Cloud Watching",
      "Local Culture",
      "Camping",
    ],

    highlights: [
      "Nilgiri",
      "Nilachal",
      "Boga Lake",
      "Nafakhum",
      "Keokradong",
      "Hill Trails",
    ],

    nearbyHotels: [
      "Hotel Hill View",
      "Venus Resort",
      "Nilgiri Resort",
    ],

    hotels: [
      {
        id: "hotel-014",
        slug: "hotel-hill-view",
        name: "Hotel Hill View",
        pricePerNight: 4200,
        rating: 4.4,
      },
      {
        id: "hotel-015",
        slug: "venus-resort",
        name: "Venus Resort",
        pricePerNight: 5000,
        rating: 4.5,
      },
    ],

    reviews: [
      {
        user: "Arman",
        rating: 5,
        comment: "The mountain views were spectacular.",
        date: "2026-01-12",
      },
      {
        user: "Sumi",
        rating: 5,
        comment: "Perfect destination for adventure lovers.",
        date: "2026-01-20",
      },
    ],
  },

  // =====================================================
  // 09. SAJEK
  // =====================================================
  {
    id: "dest-009",
    slug: "sajek-valley",
    name: "Sajek Valley",
    district: "Rangamati",
    division: "Chattogram",
    category: "Hill",

    shortDescription:
      "A dreamy hill destination famous for clouds, sunrise and mountain views.",

    description:
      "Sajek Valley is a popular hill destination surrounded by mountains and clouds, offering spectacular sunrise and sunset views.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 23.3819,
    longitude: 92.2938,

    mapUrl: "https://www.google.com/maps?q=23.3819,92.2938",

    bestSeason: "October - March",
    openingHours: "Open 24 Hours",
    entryFee: 0,
    estimatedDuration: "2 Days",

    rating: 4.9,
    totalReviews: 1780,

    featured: true,
    popular: true,

    thingsToDo: [
      "Cloud Watching",
      "Sunrise Watching",
      "Mountain Hiking",
      "Photography",
      "Camping",
      "Local Culture",
    ],

    highlights: [
      "Clouds",
      "Sunrise",
      "Sunset",
      "Mountain Views",
      "Konglak Hill",
      "Tribal Culture",
    ],

    nearbyHotels: [
      "Sajek Resort",
      "Megh Machang",
      "Runmoy Resort",
    ],

    hotels: [
      {
        id: "hotel-016",
        slug: "sajek-resort",
        name: "Sajek Resort",
        pricePerNight: 5500,
        rating: 4.5,
      },
      {
        id: "hotel-017",
        slug: "megh-machang",
        name: "Megh Machang",
        pricePerNight: 4500,
        rating: 4.4,
      },
    ],

    reviews: [
      {
        user: "Riad",
        rating: 5,
        comment: "Watching the clouds from the hills was amazing.",
        date: "2026-01-05",
      },
      {
        user: "Lamia",
        rating: 5,
        comment: "One of my favorite places in Bangladesh.",
        date: "2026-01-09",
      },
    ],
  },

  // =====================================================
  // 10. RANGAMATI
  // =====================================================
  {
    id: "dest-010",
    slug: "rangamati",
    name: "Rangamati",
    district: "Rangamati",
    division: "Chattogram",
    category: "Lake",

    shortDescription:
      "A peaceful hill district surrounded by the beautiful Kaptai Lake.",

    description:
      "Rangamati is a scenic hill destination famous for Kaptai Lake, green hills, waterfalls and indigenous culture.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 22.7324,
    longitude: 92.2985,

    mapUrl: "https://www.google.com/maps?q=22.7324,92.2985",

    bestSeason: "November - March",
    openingHours: "Open 24 Hours",
    entryFee: 0,
    estimatedDuration: "2 Days",

    rating: 4.7,
    totalReviews: 920,

    featured: false,
    popular: true,

    thingsToDo: [
      "Boat Ride",
      "Lake Cruise",
      "Photography",
      "Hill Visit",
      "Cultural Tour",
      "Nature Walk",
    ],

    highlights: [
      "Kaptai Lake",
      "Hanging Bridge",
      "Shuvolong Waterfall",
      "Hill Landscape",
      "Indigenous Culture",
    ],

    nearbyHotels: [
      "Parjatan Holiday Complex",
      "Hotel Sufia",
      "Rangamati Waterfront Resort",
    ],

    hotels: [
      {
        id: "hotel-018",
        slug: "parjatan-rangamati",
        name: "Parjatan Holiday Complex",
        pricePerNight: 3800,
        rating: 4.2,
      },
      {
        id: "hotel-019",
        slug: "waterfront-resort",
        name: "Rangamati Waterfront Resort",
        pricePerNight: 4800,
        rating: 4.4,
      },
    ],

    reviews: [
      {
        user: "Sakib",
        rating: 5,
        comment: "Kaptai Lake is absolutely beautiful.",
        date: "2026-02-02",
      },
      {
        user: "Mou",
        rating: 4,
        comment: "A peaceful place for a family trip.",
        date: "2026-02-07",
      },
    ],
  },

  // =====================================================
  // 11. KHAGRACHARI
  // =====================================================
  {
    id: "dest-011",
    slug: "khagrachari",
    name: "Khagrachari",
    district: "Khagrachari",
    division: "Chattogram",
    category: "Hill",

    shortDescription:
      "A peaceful hill destination filled with forests, waterfalls and valleys.",

    description:
      "Khagrachari offers beautiful green hills, forests, waterfalls and cultural attractions, making it an excellent destination for nature lovers.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 23.1193,
    longitude: 91.9847,

    mapUrl: "https://www.google.com/maps?q=23.1193,91.9847",

    bestSeason: "November - March",
    openingHours: "Open 24 Hours",
    entryFee: 0,
    estimatedDuration: "2 Days",

    rating: 4.6,
    totalReviews: 710,

    featured: false,
    popular: true,

    thingsToDo: [
      "Hill Hiking",
      "Waterfall Visit",
      "Photography",
      "Forest Walk",
      "Cultural Tour",
    ],

    highlights: [
      "Alutila Cave",
      "Richhang Waterfall",
      "Hill Views",
      "Forest",
      "Indigenous Culture",
    ],

    nearbyHotels: [
      "Hotel Girish",
      "Khagrachari Tourist Motel",
    ],

    hotels: [
      {
        id: "hotel-020",
        slug: "khagrachari-tourist-motel",
        name: "Khagrachari Tourist Motel",
        pricePerNight: 3000,
        rating: 4.1,
      },
    ],

    reviews: [
      {
        user: "Nayeem",
        rating: 5,
        comment: "A beautiful and quiet hill destination.",
        date: "2026-03-03",
      },
      {
        user: "Rima",
        rating: 4,
        comment: "Loved the caves and green hills.",
        date: "2026-03-10",
      },
    ],
  },

  // =====================================================
  // 12. KUAKATA
  // =====================================================
  {
    id: "dest-012",
    slug: "kuakata",
    name: "Kuakata",
    district: "Patuakhali",
    division: "Barishal",
    category: "Beach",

    shortDescription:
      "A beautiful coastal beach famous for sunrise and sunset views.",

    description:
      "Kuakata is a scenic coastal destination where visitors can enjoy both sunrise and sunset over the Bay of Bengal.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 21.8167,
    longitude: 90.1167,

    mapUrl: "https://www.google.com/maps?q=21.8167,90.1167",

    bestSeason: "November - February",
    openingHours: "Open 24 Hours",
    entryFee: 0,
    estimatedDuration: "1-2 Days",

    rating: 4.6,
    totalReviews: 830,

    featured: false,
    popular: true,

    thingsToDo: [
      "Beach Walking",
      "Sunrise Watching",
      "Sunset Watching",
      "Photography",
      "Cycling",
      "Seafood Tasting",
    ],

    highlights: [
      "Sunrise",
      "Sunset",
      "Bay of Bengal",
      "Fishermen Village",
      "Fatrar Char",
    ],

    nearbyHotels: [
      "Kuakata Grand Hotel",
      "Hotel Khan Palace",
      "Ocean View Resort",
    ],

    hotels: [
      {
        id: "hotel-021",
        slug: "kuakata-grand",
        name: "Kuakata Grand Hotel",
        pricePerNight: 4500,
        rating: 4.3,
      },
      {
        id: "hotel-022",
        slug: "ocean-view-kuakata",
        name: "Ocean View Resort",
        pricePerNight: 3900,
        rating: 4.2,
      },
    ],

    reviews: [
      {
        user: "Ayon",
        rating: 5,
        comment: "Watching the sunrise and sunset was beautiful.",
        date: "2026-02-11",
      },
      {
        user: "Tithi",
        rating: 4,
        comment: "A relaxing coastal destination.",
        date: "2026-02-17",
      },
    ],
  },

  // =====================================================
  // 13. SONARGAON
  // =====================================================
  {
    id: "dest-013",
    slug: "sonargaon",
    name: "Sonargaon",
    district: "Narayanganj",
    division: "Dhaka",
    category: "Historical",

    shortDescription:
      "An ancient historical city filled with heritage and traditional architecture.",

    description:
      "Sonargaon is a historically important destination known for ancient architecture, museums, traditional houses and cultural heritage.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 23.65,
    longitude: 90.6,

    mapUrl: "https://www.google.com/maps?q=23.6500,90.6000",

    bestSeason: "October - March",
    openingHours: "10:00 AM - 5:00 PM",
    entryFee: 50,
    estimatedDuration: "1 Day",

    rating: 4.5,
    totalReviews: 650,

    featured: false,
    popular: false,

    thingsToDo: [
      "Museum Visit",
      "Historical Tour",
      "Photography",
      "Architecture Tour",
      "Cultural Exploration",
    ],

    highlights: [
      "Panam City",
      "Folk Art Museum",
      "Historical Buildings",
      "Traditional Architecture",
      "Heritage Sites",
    ],

    nearbyHotels: [
      "Sonargaon Royal Resort",
      "Narayanganj Hotels",
    ],

    hotels: [
      {
        id: "hotel-023",
        slug: "sonargaon-royal-resort",
        name: "Sonargaon Royal Resort",
        pricePerNight: 4000,
        rating: 4.2,
      },
    ],

    reviews: [
      {
        user: "Hasan",
        rating: 5,
        comment: "A great place to explore Bangladesh's history.",
        date: "2026-04-04",
      },
      {
        user: "Sadia",
        rating: 4,
        comment: "Loved the old architecture.",
        date: "2026-04-09",
      },
    ],
  },

  // =====================================================
  // 14. PAHARPUR
  // =====================================================
  {
    id: "dest-014",
    slug: "paharpur",
    name: "Paharpur Buddhist Vihara",
    district: "Naogaon",
    division: "Rajshahi",
    category: "Historical",

    shortDescription:
      "A remarkable archaeological site representing Bangladesh's ancient heritage.",

    description:
      "Paharpur is an important archaeological and historical destination known for the ancient Somapura Mahavihara and its remarkable Buddhist heritage.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 25.031,
    longitude: 88.976,

    mapUrl: "https://www.google.com/maps?q=25.0310,88.9760",

    bestSeason: "October - March",
    openingHours: "9:00 AM - 5:00 PM",
    entryFee: 30,
    estimatedDuration: "1 Day",

    rating: 4.7,
    totalReviews: 540,

    featured: true,
    popular: false,

    thingsToDo: [
      "Archaeological Tour",
      "Museum Visit",
      "Photography",
      "Historical Exploration",
      "Architecture Study",
    ],

    highlights: [
      "Somapura Mahavihara",
      "Archaeological Museum",
      "Ancient Architecture",
      "Buddhist Heritage",
      "Historical Ruins",
    ],

    nearbyHotels: [
      "Paharpur Tourist Motel",
      "Naogaon Hotels",
    ],

    hotels: [
      {
        id: "hotel-024",
        slug: "paharpur-tourist-motel",
        name: "Paharpur Tourist Motel",
        pricePerNight: 2500,
        rating: 4.0,
      },
    ],

    reviews: [
      {
        user: "Siam",
        rating: 5,
        comment: "A fascinating historical place.",
        date: "2026-03-28",
      },
      {
        user: "Mim",
        rating: 4,
        comment: "Very interesting architecture and history.",
        date: "2026-04-01",
      },
    ],
  },

  // =====================================================
  // 15. BAGHERHAT
  // =====================================================
  {
    id: "dest-015",
    slug: "bagerhat",
    name: "Bagerhat",
    district: "Bagerhat",
    division: "Khulna",
    category: "Historical",

    shortDescription:
      "A historic city famous for its remarkable mosque architecture and heritage.",

    description:
      "Bagerhat is a major historical destination in Bangladesh, known for the Sixty Dome Mosque and other remarkable heritage structures.",

    heroImage: coxHero,
    images: defaultImages,

    latitude: 22.6581,
    longitude: 89.7856,

    mapUrl: "https://www.google.com/maps?q=22.6581,89.7856",

    bestSeason: "October - March",
    openingHours: "9:00 AM - 5:00 PM",
    entryFee: 30,
    estimatedDuration: "1 Day",

    rating: 4.6,
    totalReviews: 480,

    featured: false,
    popular: false,

    thingsToDo: [
      "Historical Tour",
      "Mosque Visit",
      "Photography",
      "Architecture Tour",
      "Heritage Exploration",
    ],

    highlights: [
      "Sixty Dome Mosque",
      "Khan Jahan Ali Tomb",
      "Historic Mosques",
      "Ancient Architecture",
      "Heritage Sites",
    ],

    nearbyHotels: [
      "Hotel Royal Palace",
      "Bagerhat Tourist Motel",
    ],

    hotels: [
      {
        id: "hotel-025",
        slug: "bagerhat-tourist-motel",
        name: "Bagerhat Tourist Motel",
        pricePerNight: 2600,
        rating: 4.0,
      },
    ],

    reviews: [
      {
        user: "Rasel",
        rating: 5,
        comment: "The historical architecture is impressive.",
        date: "2026-05-02",
      },
      {
        user: "Priya",
        rating: 4,
        comment: "A great destination for history lovers.",
        date: "2026-05-07",
      },
    ],
  },

  // =====================================================
  // 16. LALBAGH FORT
  // =====================================================
  createDestination({
    id: "dest-016",
    slug: "lalbagh-fort",
    name: "Lalbagh Fort",
    district: "Dhaka",
    division: "Dhaka",
    category: "Historical",

    shortDescription:
      "A historic Mughal-era fort complex in the heart of Old Dhaka.",

    description:
      "Lalbagh Fort is one of the most recognizable historical landmarks of Dhaka, representing the Mughal architectural heritage of Bangladesh.",

    latitude: 23.7196,
    longitude: 90.3888,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=23.7196,90.3888",

    bestSeason: "November - February",
    openingHours: "Daytime visiting hours",
    entryFee: 0,
    estimatedDuration: "1 - 2 hours",

    thingsToDo: [
      "Explore the Mughal-era architecture",
      "Visit the museum areas",
      "Walk around the historic fort complex",
      "Take architectural photographs",
    ],

    highlights: [
      "Mughal architecture",
      "Historic fort complex",
      "Old Dhaka heritage",
    ],

    featured: true,
    popular: true,
  }),

  // =====================================================
  // 17. AHSAN MANZIL
  // =====================================================
  createDestination({
    id: "dest-017",
    slug: "ahsan-manzil",
    name: "Ahsan Manzil",
    district: "Dhaka",
    division: "Dhaka",
    category: "Historical",

    shortDescription:
      "The famous Pink Palace and former residence of the Nawabs of Dhaka.",

    description:
      "Ahsan Manzil is an important heritage landmark on the banks of the Buriganga River and is now operated as a museum.",

    latitude: 23.7089,
    longitude: 90.4069,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=23.7089,90.4069",

    bestSeason: "November - February",
    openingHours: "Daytime visiting hours",
    entryFee: 0,
    estimatedDuration: "1 - 2 hours",

    thingsToDo: [
      "Visit the museum",
      "Explore the palace architecture",
      "Learn about Dhaka's history",
      "Explore nearby Old Dhaka",
    ],

    highlights: [
      "Pink Palace",
      "Nawab-era heritage",
      "Buriganga riverside location",
    ],

    featured: true,
    popular: true,
  }),

  // =====================================================
  // 18. NATIONAL PARLIAMENT HOUSE
  // =====================================================
  createDestination({
    id: "dest-018",
    slug: "national-parliament-house",
    name: "Jatiya Sangsad Bhaban",
    district: "Dhaka",
    division: "Dhaka",
    category: "Historical",

    shortDescription:
      "The iconic National Parliament complex designed by architect Louis Kahn.",

    description:
      "Jatiya Sangsad Bhaban is one of the most significant examples of modern architecture in Bangladesh and forms the centerpiece of the National Parliament complex.",

    latitude: 23.7625,
    longitude: 90.3782,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=23.7625,90.3782",

    bestSeason: "November - February",
    openingHours: "External viewing and permitted visiting areas",
    entryFee: 0,
    estimatedDuration: "1 - 2 hours",

    thingsToDo: [
      "Explore the surrounding complex",
      "Observe the architectural design",
      "Take photographs",
      "Visit nearby Manik Mia Avenue",
    ],

    highlights: [
      "Louis Kahn architecture",
      "National Parliament complex",
      "Modern architectural landmark",
    ],

    featured: true,
    popular: true,
  }),

  // =====================================================
  // 19. JASIMUDDIN MUSEUM
  // =====================================================
  createDestination({
    id: "dest-019",
    slug: "palli-kabi-jasimuddin-museum",
    name: "Jasimuddin Museum",
    district: "Faridpur",
    division: "Dhaka",
    category: "Historical",

    shortDescription:
      "A heritage site associated with the renowned Bengali poet Jasimuddin.",

    description:
      "The Jasimuddin Museum preserves the memory and cultural heritage associated with Palli Kabi Jasimuddin and his life and literary work.",

    latitude: 23.586,
    longitude: 89.835,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Jasimuddin%20Museum%20Faridpur",

    bestSeason: "November - February",
    openingHours: "Daytime visiting hours",
    entryFee: 0,
    estimatedDuration: "1 - 2 hours",

    thingsToDo: [
      "Explore the museum",
      "Learn about Jasimuddin's literary heritage",
      "Explore the surrounding rural landscape",
    ],

    highlights: [
      "Jasimuddin heritage",
      "Bengali literature",
      "Rural Bengal culture",
    ],

    popular: true,
  }),

  // =====================================================
  // 20. BHAWAL NATIONAL PARK
  // =====================================================
  createDestination({
    id: "dest-020",
    slug: "bhawal-national-park",
    name: "Bhawal National Park",
    district: "Gazipur",
    division: "Dhaka",
    category: "Forest",

    shortDescription:
      "A large forested recreation area known for its sal forests and natural surroundings.",

    description:
      "Bhawal National Park provides visitors with an opportunity to experience a forest environment close to Dhaka and is a popular destination for day trips and nature activities.",

    latitude: 24.0606,
    longitude: 90.386,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Bhawal%20National%20Park",

    bestSeason: "November - February",
    openingHours: "Daytime",
    entryFee: 0,
    estimatedDuration: "3 - 5 hours",

    thingsToDo: [
      "Walk through the forest",
      "Enjoy nature",
      "Take photographs",
      "Have a day trip with family",
    ],

    highlights: [
      "Sal forest",
      "Nature trails",
      "Day-trip destination",
    ],

    featured: true,
    popular: true,
  }),

  // =====================================================
  // 21. NUHASH PALLI
  // =====================================================
  createDestination({
    id: "dest-021",
    slug: "nuhash-palli",
    name: "Nuhash Palli",
    district: "Gazipur",
    division: "Dhaka",
    category: "Nature",

    shortDescription:
      "A distinctive countryside retreat and cultural landscape associated with Humayun Ahmed.",

    description:
      "Nuhash Palli is a well-known cultural and recreational destination in Gazipur, surrounded by greenery and landscaped natural spaces.",

    latitude: 24.0805,
    longitude: 90.378,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Nuhash%20Palli",

    bestSeason: "November - February",
    openingHours: "Check locally before visiting",
    entryFee: 0,
    estimatedDuration: "2 - 4 hours",

    thingsToDo: [
      "Explore the landscaped grounds",
      "Enjoy the natural surroundings",
      "Take photographs",
      "Experience the cultural atmosphere",
    ],

    highlights: [
      "Green surroundings",
      "Cultural heritage",
      "Gazipur countryside",
    ],

    popular: true,
  }),

  // =====================================================
  // 22. TUNGIPARA
  // =====================================================
  createDestination({
    id: "dest-022",
    slug: "tungipara",
    name: "Tungipara",
    district: "Gopalganj",
    division: "Dhaka",
    category: "Historical",

    shortDescription:
      "A historically significant destination in Gopalganj.",

    description:
      "Tungipara is a nationally significant heritage destination and an important place for visitors interested in the modern history of Bangladesh.",

    latitude: 22.899,
    longitude: 89.903,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Tungipara%20Gopalganj",

    bestSeason: "November - February",
    openingHours: "Daytime",
    entryFee: 0,
    estimatedDuration: "1 - 2 hours",

    thingsToDo: [
      "Visit the heritage site",
      "Learn about Bangladesh's history",
      "Explore the surrounding area",
    ],

    highlights: [
      "National historical significance",
      "Heritage destination",
      "Gopalganj",
    ],

    popular: true,
  }),

  // =====================================================
  // 23. NIKLI HAOR
  // =====================================================
  createDestination({
    id: "dest-023",
    slug: "nikli-haor",
    name: "Nikli Haor",
    district: "Kishoreganj",
    division: "Dhaka",
    category: "Haor",

    shortDescription:
      "A scenic haor landscape famous for open water, villages and seasonal beauty.",

    description:
      "Nikli Haor is one of the popular wetland destinations of Kishoreganj, offering a distinctive view of Bangladesh's haor ecosystem, especially during the monsoon season.",

    latitude: 24.546,
    longitude: 90.95,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Nikli%20Haor",

    bestSeason: "June - September",
    openingHours: "Daytime",
    entryFee: 0,
    estimatedDuration: "4 - 6 hours",

    thingsToDo: [
      "Take a boat ride",
      "Enjoy the open-water scenery",
      "Explore nearby villages",
      "Photograph the wetland landscape",
    ],

    highlights: [
      "Haor ecosystem",
      "Boat rides",
      "Monsoon landscape",
    ],

    featured: true,
    popular: true,
  }),

  // =====================================================
  // 24. SHAKUNI LAKE
  // =====================================================
  createDestination({
    id: "dest-024",
    slug: "shakuni-lake",
    name: "Shakuni Lake",
    district: "Madaripur",
    division: "Dhaka",
    category: "Lake",

    shortDescription:
      "A well-known urban lake and recreational destination in Madaripur.",

    description:
      "Shakuni Lake is a notable water-based attraction in Madaripur and provides a relaxing environment for local visitors.",

    latitude: 23.164,
    longitude: 90.189,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Shakuni%20Lake%20Madaripur",

    bestSeason: "November - February",
    openingHours: "Daytime",
    entryFee: 0,
    estimatedDuration: "1 - 2 hours",

    thingsToDo: [
      "Walk around the lake",
      "Enjoy the scenery",
      "Take photographs",
      "Relax by the water",
    ],

    highlights: [
      "Lake scenery",
      "Urban recreation",
      "Madaripur",
    ],

    popular: true,
  }),

  // =====================================================
  // 25. BALIATI PALACE
  // =====================================================
  createDestination({
    id: "dest-025",
    slug: "baliati-palace",
    name: "Baliati Palace",
    district: "Manikganj",
    division: "Dhaka",
    category: "Historical",

    shortDescription:
      "A remarkable nineteenth-century zamindar palace complex.",

    description:
      "Baliati Palace is a major architectural heritage site in Manikganj, featuring an extensive historic palace complex and distinctive architectural details.",

    latitude: 23.954,
    longitude: 90.055,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Baliati%20Palace",

    bestSeason: "November - February",
    openingHours: "Daytime visiting hours",
    entryFee: 0,
    estimatedDuration: "2 - 3 hours",

    thingsToDo: [
      "Explore the palace complex",
      "Study the historic architecture",
      "Take photographs",
      "Learn about zamindar-era history",
    ],

    highlights: [
      "Historic palace",
      "Zamindar architecture",
      "Heritage site",
    ],

    featured: true,
    popular: true,
  }),

  // =====================================================
  // 26. IDRAKPUR FORT
  // =====================================================
  createDestination({
    id: "dest-026",
    slug: "idrackpur-fort",
    name: "Idrakpur Fort",
    district: "Munshiganj",
    division: "Dhaka",
    category: "Historical",

    shortDescription:
      "A historic river-fortification associated with Mughal-era Bengal.",

    description:
      "Idrakpur Fort is a historic defensive structure in Munshiganj and represents the strategic importance of the region's river network.",

    latitude: 23.544,
    longitude: 90.531,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Idrakpur%20Fort",

    bestSeason: "November - February",
    openingHours: "Daytime",
    entryFee: 0,
    estimatedDuration: "1 - 2 hours",

    thingsToDo: [
      "Explore the fort",
      "Learn about river-based defense",
      "Take historical photographs",
    ],

    highlights: [
      "Mughal-era heritage",
      "River fortification",
      "Munshiganj history",
    ],

    popular: true,
  }),

  // =====================================================
  // 27. PANAM CITY
  // =====================================================
  createDestination({
    id: "dest-027",
    slug: "panam-city",
    name: "Panam City",
    district: "Narayanganj",
    division: "Dhaka",
    category: "Historical",

    shortDescription:
      "A historic trading settlement featuring rows of colonial-era buildings.",

    description:
      "Panam City, located in Sonargaon, is one of Bangladesh's best-known archaeological and architectural heritage destinations.",

    latitude: 23.649,
    longitude: 90.598,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Panam%20City%20Sonargaon",

    bestSeason: "November - February",
    openingHours: "Daytime visiting hours",
    entryFee: 0,
    estimatedDuration: "2 - 3 hours",

    thingsToDo: [
      "Walk through the historic street",
      "Explore heritage buildings",
      "Take architectural photographs",
      "Visit nearby Sonargaon attractions",
    ],

    highlights: [
      "Historic trading city",
      "Colonial-era architecture",
      "Sonargaon heritage",
    ],

    featured: true,
    popular: true,
  }),

  // =====================================================
  // 28. WARI-BATESHWAR
  // =====================================================
  createDestination({
    id: "dest-028",
    slug: "wari-bateshwar",
    name: "Wari-Bateshwar",
    district: "Narsingdi",
    division: "Dhaka",
    category: "Historical",

    shortDescription:
      "An important archaeological site associated with ancient Bengal.",

    description:
      "Wari-Bateshwar is a significant archaeological landscape in Narsingdi containing evidence of an ancient settlement and long-distance trade.",

    latitude: 23.952,
    longitude: 90.797,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Wari-Bateshwar",

    bestSeason: "November - February",
    openingHours: "Daytime",
    entryFee: 0,
    estimatedDuration: "2 - 3 hours",

    thingsToDo: [
      "Explore the archaeological area",
      "Learn about ancient settlement history",
      "Observe archaeological remains",
    ],

    highlights: [
      "Ancient archaeological site",
      "Historic settlement",
      "Archaeological heritage",
    ],

    featured: true,
    popular: true,
  }),

  // =====================================================
  // 29. GOALANDA GHAT
  // =====================================================
  createDestination({
    id: "dest-029",
    slug: "goalandaghat",
    name: "Goalanda Ghat",
    district: "Rajbari",
    division: "Dhaka",
    category: "River",

    shortDescription:
      "A historic river-port area at the confluence of major waterways.",

    description:
      "Goalanda Ghat has long been associated with river transportation and the movement of people and goods along the Padma river system.",

    latitude: 23.738,
    longitude: 89.765,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Goalanda%20Ghat",

    bestSeason: "November - February",
    openingHours: "Daytime",
    entryFee: 0,
    estimatedDuration: "1 - 3 hours",

    thingsToDo: [
      "Enjoy the riverside scenery",
      "Observe river transport",
      "Explore the local area",
      "Take photographs",
    ],

    highlights: [
      "Padma river landscape",
      "Historic river port",
      "River transport",
    ],

    popular: true,
  }),

  // =====================================================
  // 30. PADMA RIVER VIEW - SHARIATPUR
  // =====================================================
  createDestination({
    id: "dest-030",
    slug: "padma-river-shariatpur",
    name: "Padma River View",
    district: "Shariatpur",
    division: "Dhaka",
    category: "River",

    shortDescription:
      "A scenic riverside experience along the Padma in Shariatpur.",

    description:
      "The Padma river landscape around Shariatpur offers expansive water views, changing riverbanks and a characteristic riverside atmosphere.",

    latitude: 23.242,
    longitude: 90.434,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Padma%20River%20Shariatpur",

    bestSeason: "November - February",
    openingHours: "Daytime",
    entryFee: 0,
    estimatedDuration: "2 - 4 hours",

    thingsToDo: [
      "Enjoy the riverside scenery",
      "Watch boats and river traffic",
      "Take sunset photographs",
      "Explore nearby riverbank areas",
    ],

    highlights: [
      "Padma River",
      "Riverside landscape",
      "Sunset views",
    ],

    popular: true,
  }),

  // =====================================================
  // 31. MADHUPUR NATIONAL PARK
  // =====================================================
  createDestination({
    id: "dest-031",
    slug: "madhupur-national-park",
    name: "Madhupur National Park",
    district: "Tangail",
    division: "Dhaka",
    category: "Forest",

    shortDescription:
      "A forest destination known for its sal woodland and natural environment.",

    description:
      "Madhupur National Park is an important forest destination in Tangail and provides visitors with opportunities to experience the natural landscape of the Madhupur tract.",

    latitude: 24.673,
    longitude: 90.105,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Madhupur%20National%20Park",

    bestSeason: "November - February",
    openingHours: "Daytime",
    entryFee: 0,
    estimatedDuration: "3 - 5 hours",

    thingsToDo: [
      "Explore the forest",
      "Enjoy nature",
      "Take photographs",
      "Plan a day trip",
    ],

    highlights: [
      "Sal forest",
      "Madhupur tract",
      "Nature experience",
    ],

    featured: true,
    popular: true,
  }),

  // =====================================================
  // 32. ATIA MOSQUE
  // =====================================================
  createDestination({
    id: "dest-032",
    slug: "atia-mosque",
    name: "Atia Mosque",
    district: "Tangail",
    division: "Dhaka",
    category: "Historical",

    shortDescription:
      "A historic mosque known for its traditional Bengal Islamic architecture.",

    description:
      "Atia Mosque is an important historical mosque in Tangail and is recognized for its architectural and cultural significance.",

    latitude: 24.255,
    longitude: 89.974,

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Atia%20Mosque%20Tangail",

    bestSeason: "November - February",
    openingHours: "Daytime and prayer-time restrictions may apply",
    entryFee: 0,
    estimatedDuration: "1 - 2 hours",

    thingsToDo: [
      "Observe the historic architecture",
      "Learn about local heritage",
      "Take architectural photographs",
    ],

    highlights: [
      "Historic mosque",
      "Bengal Islamic architecture",
      "Tangail heritage",
    ],

    popular: true,
  }),
  // ============================================================
// CHATTOGRAM DIVISION
// ============================================================

// ------------------------------------------------------------
// Bandarban
// ------------------------------------------------------------

createDestination({
  id: "dest-033",
  slug: "nilgiri-bandarban",
  name: "Nilgiri",
  district: "Bandarban",
  division: "Chattogram",
  category: "Hill",
  shortDescription:
    "A spectacular hill destination famous for its cloud-covered mountain views.",
  description:
    "Nilgiri is one of the most scenic hill destinations in Bandarban, offering panoramic views of surrounding mountains and valleys. The area is especially attractive during sunrise, sunset, and cloudy weather.",
  latitude: 21.78,
  longitude: 92.36,
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Nilgiri+Bandarban",
  bestSeason: "October - March",
  openingHours: "Open during daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Enjoy mountain views",
    "Watch sunrise and sunset",
    "Photography",
    "Explore the hill roads",
  ],
  highlights: [
    "Cloud-covered mountain scenery",
    "Panoramic hill views",
    "Scenic road journey",
  ],
  popular: true,
}),

createDestination({
  id: "dest-034",
  slug: "boga-lake-bandarban",
  name: "Boga Lake",
  district: "Bandarban",
  division: "Chattogram",
  category: "Lake",
  shortDescription:
    "A remote natural lake surrounded by hills in Bandarban.",
  description:
    "Boga Lake is a beautiful natural lake surrounded by green hills. Reaching the lake involves a challenging journey, making it a popular destination for adventure-loving travelers.",
  latitude: 21.95,
  longitude: 92.55,
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Boga+Lake+Bandarban",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1 Day",
  thingsToDo: [
    "Hiking",
    "Camping",
    "Photography",
    "Enjoy the mountain landscape",
  ],
  highlights: [
    "Natural mountain lake",
    "Remote environment",
    "Adventure trekking",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Brahmanbaria
// ------------------------------------------------------------

createDestination({
  id: "dest-035",
  slug: "haripur-baro-bari",
  name: "Haripur Baro Bari",
  district: "Brahmanbaria",
  division: "Chattogram",
  category: "Historical",
  shortDescription:
    "A historic zamindar-era residence in Haripur, Brahmanbaria.",
  description:
    "Haripur Baro Bari is a historic architectural site associated with the zamindar period. Its old structures provide visitors with an opportunity to explore the architectural heritage of the region.",
  latitude: 24.15,
  longitude: 91.10,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Haripur+Baro+Bari+Brahmanbaria",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore historic architecture",
    "Photography",
    "Learn about local history",
  ],
  highlights: [
    "Zamindar-era architecture",
    "Historical atmosphere",
    "Local heritage",
  ],
}),

// ------------------------------------------------------------
// Chandpur
// ------------------------------------------------------------

createDestination({
  id: "dest-036",
  slug: "three-rivers-confluence-chandpur",
  name: "Three Rivers Confluence",
  district: "Chandpur",
  division: "Chattogram",
  category: "River",
  shortDescription:
    "A scenic river landscape around the meeting point of major rivers near Chandpur.",
  description:
    "Chandpur is well known for its river-based landscape where major waterways meet. The riverfront offers beautiful scenery, boat rides, sunsets, and an authentic riverside experience.",
  latitude: 23.23,
  longitude: 90.67,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Chandpur+Three+Rivers",
  bestSeason: "October - March",
  openingHours: "Daylight and evening",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy river views",
    "Take a boat ride",
    "Watch sunset",
    "Photography",
  ],
  highlights: [
    "River landscape",
    "Boat rides",
    "Sunset views",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Chattogram
// ------------------------------------------------------------

createDestination({
  id: "dest-037",
  slug: "patenga-sea-beach",
  name: "Patenga Sea Beach",
  district: "Chattogram",
  division: "Chattogram",
  category: "Beach",
  shortDescription:
    "A popular seaside destination near Chattogram city.",
  description:
    "Patenga Sea Beach is one of the most accessible coastal attractions in Chattogram. Visitors can enjoy the sea breeze, sunset views, local snacks, and the lively atmosphere around the beach.",
  latitude: 22.23,
  longitude: 91.79,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Patenga+Sea+Beach",
  bestSeason: "November - March",
  openingHours: "Open throughout the day",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy the beach",
    "Watch sunset",
    "Try local snacks",
    "Photography",
  ],
  highlights: [
    "Sea views",
    "Sunset",
    "Easy access from Chattogram city",
  ],
  popular: true,
}),

createDestination({
  id: "dest-038",
  slug: "foys-lake",
  name: "Foy's Lake",
  district: "Chattogram",
  division: "Chattogram",
  category: "Lake",
  shortDescription:
    "A scenic man-made lake surrounded by hills and greenery.",
  description:
    "Foy's Lake is a popular recreational destination in Chattogram surrounded by hills and greenery. It offers boating, scenic views, and recreational activities for visitors.",
  latitude: 22.36,
  longitude: 91.80,
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Foy%27s+Lake",
  bestSeason: "October - March",
  openingHours: "Varies by attraction",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Boating",
    "Enjoy the lake",
    "Photography",
    "Explore recreational areas",
  ],
  highlights: [
    "Lake surrounded by hills",
    "Boating",
    "Family-friendly recreation",
  ],
  popular: true,
}),

createDestination({
  id: "dest-039",
  slug: "chattogram-war-cemetery",
  name: "Chattogram War Cemetery",
  district: "Chattogram",
  division: "Chattogram",
  category: "Historical",
  shortDescription:
    "A peaceful memorial cemetery associated with the Second World War.",
  description:
    "Chattogram War Cemetery is a maintained historical memorial site containing graves of Commonwealth servicemen who died during the Second World War. It is known for its peaceful environment and historical significance.",
  latitude: 22.35,
  longitude: 91.82,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Chattogram+War+Cemetery",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the memorial site",
    "Learn about wartime history",
    "Photography",
  ],
  highlights: [
    "World War II history",
    "Memorial cemetery",
    "Peaceful environment",
  ],
}),

createDestination({
  id: "dest-040",
  slug: "chandranath-temple",
  name: "Chandranath Temple",
  district: "Chattogram",
  division: "Chattogram",
  category: "Historical",
  shortDescription:
    "A famous hilltop temple located near Sitakunda.",
  description:
    "Chandranath Temple is situated on Chandranath Hill in the Sitakunda area. The hill journey combines religious heritage with scenic views of the surrounding landscape.",
  latitude: 22.61,
  longitude: 91.66,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Chandranath+Temple+Sitakunda",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Hiking",
    "Explore the temple",
    "Enjoy hill views",
    "Photography",
  ],
  highlights: [
    "Hilltop location",
    "Religious heritage",
    "Scenic hiking route",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Cox's Bazar
// ------------------------------------------------------------

createDestination({
  id: "dest-041",
  slug: "himchari-national-park",
  name: "Himchari National Park",
  district: "Cox's Bazar",
  division: "Chattogram",
  category: "Nature",
  shortDescription:
    "A scenic coastal nature area featuring hills, forest and waterfalls.",
  description:
    "Himchari National Park combines coastal scenery with green hills and forest. It is a popular stop for travelers exploring the Cox's Bazar coastal belt.",
  latitude: 21.37,
  longitude: 92.05,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Himchari+National+Park",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Explore the hills",
    "Visit the waterfall area",
    "Photography",
    "Enjoy coastal views",
  ],
  highlights: [
    "Green hills",
    "Coastal scenery",
    "Waterfall",
  ],
  popular: true,
}),

createDestination({
  id: "dest-042",
  slug: "inani-beach",
  name: "Inani Beach",
  district: "Cox's Bazar",
  division: "Chattogram",
  category: "Beach",
  shortDescription:
    "A scenic beach known for rocky formations and beautiful coastal views.",
  description:
    "Inani Beach is located along the Cox's Bazar-Teknaf coastal road and is known for its sandy shore and distinctive rocky formations. It offers a quieter coastal experience compared with the main beach area.",
  latitude: 21.18,
  longitude: 92.05,
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Inani+Beach",
  bestSeason: "November - March",
  openingHours: "Open throughout the day",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Walk along the beach",
    "Enjoy sunset",
    "Photography",
    "Explore rocky formations",
  ],
  highlights: [
    "Long sandy beach",
    "Rocky shoreline",
    "Sunset views",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Cumilla
// ------------------------------------------------------------

createDestination({
  id: "dest-043",
  slug: "shalban-vihara",
  name: "Shalban Vihara",
  district: "Cumilla",
  division: "Chattogram",
  category: "Historical",
  shortDescription:
    "An important archaeological Buddhist monastery from ancient Bengal.",
  description:
    "Shalban Vihara is one of the major archaeological sites in the Mainamati-Lalmai area. The remains of the ancient monastery provide an important glimpse into the Buddhist heritage of Bengal.",
  latitude: 23.43,
  longitude: 91.13,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Shalban+Vihara",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore archaeological remains",
    "Visit the museum",
    "Learn about Buddhist heritage",
    "Photography",
  ],
  highlights: [
    "Ancient Buddhist monastery",
    "Archaeological heritage",
    "Mainamati area",
  ],
  popular: true,
}),

createDestination({
  id: "dest-044",
  slug: "mainamati-museum",
  name: "Mainamati Museum",
  district: "Cumilla",
  division: "Chattogram",
  category: "Historical",
  shortDescription:
    "A museum displaying archaeological discoveries from the Mainamati region.",
  description:
    "Mainamati Museum preserves and displays archaeological artifacts discovered around the Mainamati-Lalmai area, helping visitors understand the ancient history and culture of the region.",
  latitude: 23.43,
  longitude: 91.14,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Mainamati+Museum",
  bestSeason: "October - March",
  openingHours: "Museum hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore archaeological artifacts",
    "Learn about ancient Bengal",
    "Visit nearby heritage sites",
  ],
  highlights: [
    "Archaeological artifacts",
    "Ancient history",
    "Mainamati heritage",
  ],
}),

// ------------------------------------------------------------
// Feni
// ------------------------------------------------------------

createDestination({
  id: "dest-045",
  slug: "muhuri-project",
  name: "Muhuri Project",
  district: "Feni",
  division: "Chattogram",
  category: "Nature",
  shortDescription:
    "A scenic water-management project surrounded by rivers and open landscapes.",
  description:
    "Muhuri Project is a notable destination in Feni where visitors can experience an expansive landscape of waterways, embankments and surrounding countryside.",
  latitude: 22.97,
  longitude: 91.36,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Muhuri+Project+Feni",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy the riverside landscape",
    "Photography",
    "Explore the countryside",
  ],
  highlights: [
    "Waterways",
    "Open landscape",
    "Riverside scenery",
  ],
}),

createDestination({
  id: "dest-046",
  slug: "bijoy-singh-dighi",
  name: "Bijoy Singh Dighi",
  district: "Feni",
  division: "Chattogram",
  category: "Historical",
  shortDescription:
    "A historic large pond associated with the heritage of Feni.",
  description:
    "Bijoy Singh Dighi is a well-known historic water body in Feni. The site reflects the traditional water-management and local heritage of the region.",
  latitude: 23.01,
  longitude: 91.40,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Bijoy+Singh+Dighi+Feni",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the historic site",
    "Enjoy the surroundings",
    "Photography",
  ],
  highlights: [
    "Historic water body",
    "Local heritage",
    "Peaceful environment",
  ],
}),

// ------------------------------------------------------------
// Khagrachari
// ------------------------------------------------------------

createDestination({
  id: "dest-047",
  slug: "alutila-cave",
  name: "Alutila Cave",
  district: "Khagrachari",
  division: "Chattogram",
  category: "Hill",
  shortDescription:
    "A popular hill destination featuring a natural cave and scenic surroundings.",
  description:
    "Alutila is a popular attraction in Khagrachari known for its natural cave and surrounding hills. Visitors can combine cave exploration with the scenic mountain landscape.",
  latitude: 23.00,
  longitude: 91.95,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Alutila+Cave+Khagrachari",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore the cave",
    "Hiking",
    "Enjoy hill views",
    "Photography",
  ],
  highlights: [
    "Natural cave",
    "Hill scenery",
    "Adventure experience",
  ],
  popular: true,
}),

createDestination({
  id: "dest-048",
  slug: "richang-waterfall",
  name: "Richang Waterfall",
  district: "Khagrachari",
  division: "Chattogram",
  category: "Waterfall",
  shortDescription:
    "A refreshing waterfall surrounded by the green hills of Khagrachari.",
  description:
    "Richang Waterfall is a natural attraction surrounded by the green landscape of the Chittagong Hill Tracts. The journey to the waterfall offers a combination of walking, nature and hill scenery.",
  latitude: 22.98,
  longitude: 91.93,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Richang+Waterfall+Khagrachari",
  bestSeason: "June - October",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Hiking",
    "Enjoy the waterfall",
    "Nature photography",
    "Explore the surrounding hills",
  ],
  highlights: [
    "Natural waterfall",
    "Green hills",
    "Adventure trail",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Lakshmipur
// ------------------------------------------------------------

createDestination({
  id: "dest-049",
  slug: "dalal-bazar-zamindar-bari",
  name: "Dalal Bazar Zamindar Bari",
  district: "Lakshmipur",
  division: "Chattogram",
  category: "Historical",
  shortDescription:
    "A historic zamindar residence representing the architectural heritage of Lakshmipur.",
  description:
    "Dalal Bazar Zamindar Bari is a historic heritage site associated with the zamindar period. The old architecture provides an interesting glimpse into the area's social and cultural history.",
  latitude: 22.95,
  longitude: 90.83,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Dalal+Bazar+Zamindar+Bari",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore historic architecture",
    "Photography",
    "Learn about local heritage",
  ],
  highlights: [
    "Zamindar-era architecture",
    "Local history",
    "Cultural heritage",
  ],
}),

// ------------------------------------------------------------
// Noakhali
// ------------------------------------------------------------

createDestination({
  id: "dest-050",
  slug: "nijhum-dwip",
  name: "Nijhum Dwip",
  district: "Noakhali",
  division: "Chattogram",
  category: "Island",
  shortDescription:
    "A remote island destination famous for mangrove forests, wildlife and coastal landscapes.",
  description:
    "Nijhum Dwip is a remote coastal island in Noakhali known for its mangrove vegetation, mudflats, open beaches and natural environment. It is particularly attractive to travelers interested in nature and wildlife.",
  latitude: 22.05,
  longitude: 91.07,
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Nijhum+Dwip",
  bestSeason: "November - February",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Days",
  thingsToDo: [
    "Explore mangrove areas",
    "Wildlife observation",
    "Beach walking",
    "Photography",
  ],
  highlights: [
    "Island environment",
    "Mangrove forest",
    "Wildlife",
    "Coastal scenery",
  ],
  popular: true,
}),

createDestination({
  id: "dest-051",
  slug: "bajra-shahi-mosque",
  name: "Bajra Shahi Mosque",
  district: "Noakhali",
  division: "Chattogram",
  category: "Historical",
  shortDescription:
    "A historic Mughal-era mosque and important architectural heritage site.",
  description:
    "Bajra Shahi Mosque is a historic mosque known for its traditional architectural character and cultural importance. It is one of the notable heritage attractions of the Noakhali region.",
  latitude: 22.87,
  longitude: 91.08,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Bajra+Shahi+Mosque",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the architecture",
    "Learn about local history",
    "Photography",
  ],
  highlights: [
    "Historic mosque",
    "Traditional architecture",
    "Cultural heritage",
  ],
}),

// ------------------------------------------------------------
// Rangamati
// ------------------------------------------------------------

createDestination({
  id: "dest-052",
  slug: "kaptai-lake",
  name: "Kaptai Lake",
  district: "Rangamati",
  division: "Chattogram",
  category: "Lake",
  shortDescription:
    "A vast lake surrounded by green hills and islands in Rangamati.",
  description:
    "Kaptai Lake is one of the most iconic natural landscapes of Rangamati. The large lake is surrounded by hills and numerous islands, making boat trips and scenic exploration popular activities.",
  latitude: 22.65,
  longitude: 92.17,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Kaptai+Lake+Rangamati",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day - 1 Day",
  thingsToDo: [
    "Boat ride",
    "Explore lake islands",
    "Photography",
    "Enjoy mountain scenery",
  ],
  highlights: [
    "Large lake",
    "Hill scenery",
    "Boat trips",
    "Island landscapes",
  ],
  popular: true,
}),

createDestination({
  id: "dest-053",
  slug: "shuvolong-waterfall",
  name: "Shuvolong Waterfall",
  district: "Rangamati",
  division: "Chattogram",
  category: "Waterfall",
  shortDescription:
    "A scenic waterfall destination reached through the waterways of Rangamati.",
  description:
    "Shuvolong is a popular natural attraction in Rangamati where waterfalls and green hills meet the lake environment. Reaching the area by boat is part of the overall travel experience.",
  latitude: 22.73,
  longitude: 92.22,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Shuvolong+Waterfall",
  bestSeason: "June - October",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Boat ride",
    "Visit the waterfall",
    "Explore the hills",
    "Photography",
  ],
  highlights: [
    "Waterfall",
    "Boat journey",
    "Green hills",
  ],
  popular: true,
}),

createDestination({
  id: "dest-054",
  slug: "rangamati-hanging-bridge",
  name: "Rangamati Hanging Bridge",
  district: "Rangamati",
  division: "Chattogram",
  category: "Nature",
  shortDescription:
    "An iconic bridge overlooking the scenic lake and surrounding landscape.",
  description:
    "The Rangamati Hanging Bridge is one of the best-known attractions in the district. The bridge and its surrounding lake landscape create a popular viewpoint for visitors.",
  latitude: 22.63,
  longitude: 92.20,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Rangamati+Hanging+Bridge",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Walk across the bridge",
    "Enjoy lake views",
    "Photography",
    "Explore nearby attractions",
  ],
  highlights: [
    "Iconic bridge",
    "Kaptai Lake views",
    "Hill landscape",
  ],
  popular: true,
}),
// ============================================================
// RAJSHAHI DIVISION
// ============================================================

// ------------------------------------------------------------
// Bogura
// ------------------------------------------------------------

createDestination({
  id: "dest-055",
  slug: "mahasthangarh",
  name: "Mahasthangarh",
  district: "Bogura",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "One of the oldest archaeological urban sites in Bangladesh and the ancient city of Pundranagara.",
  description:
    "Mahasthangarh is one of the most important archaeological sites in Bangladesh. The ancient fortified settlement and surrounding archaeological remains provide a glimpse into the history of ancient Bengal.",
  latitude: 24.96,
  longitude: 89.34,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Mahasthangarh",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Explore the ancient citadel",
    "Visit archaeological remains",
    "Visit the nearby museum",
    "Photography",
  ],
  highlights: [
    "Ancient fortified city",
    "Archaeological heritage",
    "Historic Pundranagara",
  ],
  popular: true,
}),

createDestination({
  id: "dest-056",
  slug: "gokul-medh",
  name: "Gokul Medh",
  district: "Bogura",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "An important archaeological mound near Mahasthangarh associated with the Behula-Lakshindar legend.",
  description:
    "Gokul Medh is an archaeological site located near Mahasthangarh. Its distinctive mound structure and connection with local historical and legendary traditions make it a notable attraction in Bogura.",
  latitude: 24.91,
  longitude: 89.36,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Gokul+Medh",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the archaeological mound",
    "Learn about local legends",
    "Photography",
  ],
  highlights: [
    "Archaeological site",
    "Behula-Lakshindar tradition",
    "Historic landscape",
  ],
}),

createDestination({
  id: "dest-057",
  slug: "vasu-bihar",
  name: "Vasu Bihar",
  district: "Bogura",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "An ancient Buddhist archaeological site in Bogura.",
  description:
    "Vasu Bihar is an archaeological site containing remains associated with the Buddhist period of Bengal. It forms part of the rich archaeological heritage of Bogura district.",
  latitude: 24.97,
  longitude: 89.35,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Vasu+Bihar+Bogura",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore archaeological remains",
    "Learn about Buddhist heritage",
    "Photography",
  ],
  highlights: [
    "Buddhist heritage",
    "Archaeological remains",
    "Historic site",
  ],
}),

// ------------------------------------------------------------
// Chapainawabganj
// ------------------------------------------------------------

createDestination({
  id: "dest-058",
  slug: "choto-sona-mosque",
  name: "Choto Sona Mosque",
  district: "Chapainawabganj",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A renowned historic mosque and one of the finest examples of medieval Islamic architecture in Bangladesh.",
  description:
    "Choto Sona Mosque is an important historical monument in Chapainawabganj. Its stone construction and decorative architectural details reflect the rich Sultanate-era heritage of the region.",
  latitude: 24.88,
  longitude: 88.28,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Choto+Sona+Mosque",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the mosque exterior",
    "Study historic architecture",
    "Photography",
  ],
  highlights: [
    "Sultanate-era architecture",
    "Historic mosque",
    "Decorative stonework",
  ],
  popular: true,
}),

createDestination({
  id: "dest-059",
  slug: "darasbari-mosque",
  name: "Darasbari Mosque",
  district: "Chapainawabganj",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A historic mosque representing the medieval architectural heritage of the former Gaur region.",
  description:
    "Darasbari Mosque is an important archaeological monument in the Gaur region of Chapainawabganj. The remains reflect the architectural and cultural history of medieval Bengal.",
  latitude: 24.87,
  longitude: 88.27,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Darasbari+Mosque",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the historic ruins",
    "Photography",
    "Learn about medieval Bengal",
  ],
  highlights: [
    "Medieval architecture",
    "Archaeological ruins",
    "Gaur heritage",
  ],
}),

createDestination({
  id: "dest-060",
  slug: "khania-dighi-mosque",
  name: "Khania Dighi Mosque",
  district: "Chapainawabganj",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A historic mosque associated with the archaeological heritage of Chapainawabganj.",
  description:
    "Khania Dighi Mosque is one of the historical monuments found in the ancient Gaur region. The site contributes to the rich collection of medieval Islamic architecture in Chapainawabganj.",
  latitude: 24.87,
  longitude: 88.29,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Khania+Dighi+Mosque",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the historic site",
    "Photography",
    "Learn about local heritage",
  ],
  highlights: [
    "Historic mosque",
    "Gaur archaeological region",
    "Medieval heritage",
  ],
}),

// ------------------------------------------------------------
// Joypurhat
// ------------------------------------------------------------

createDestination({
  id: "dest-061",
  slug: "barashibaloy-joypurhat",
  name: "Barashibaloy Temple",
  district: "Joypurhat",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A historic religious and architectural site representing the heritage of Joypurhat.",
  description:
    "Barashibaloy is a traditional heritage site in Joypurhat associated with the religious and architectural history of northern Bangladesh.",
  latitude: 25.10,
  longitude: 89.02,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Barashibaloy+Joypurhat",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the heritage site",
    "Photography",
    "Learn about local culture",
  ],
  highlights: [
    "Religious heritage",
    "Traditional architecture",
    "Local history",
  ],
}),

createDestination({
  id: "dest-062",
  slug: "hinda-qasba-shahi-mosque",
  name: "Hinda-Kasba Shahi Mosque",
  district: "Joypurhat",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A historic mosque reflecting the architectural heritage of Joypurhat.",
  description:
    "Hinda-Kasba Shahi Mosque is a notable heritage monument in Joypurhat. Its historic character makes it an interesting destination for travelers exploring northern Bangladesh.",
  latitude: 25.00,
  longitude: 89.12,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Hinda+Kasba+Shahi+Mosque",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the mosque",
    "Photography",
    "Learn about local heritage",
  ],
  highlights: [
    "Historic mosque",
    "Traditional architecture",
    "Cultural heritage",
  ],
}),

// ------------------------------------------------------------
// Naogaon
// ------------------------------------------------------------

createDestination({
  id: "dest-063",
  slug: "kusumba-mosque",
  name: "Kusumba Mosque",
  district: "Naogaon",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A famous historic mosque known for its stone architecture and archaeological significance.",
  description:
    "Kusumba Mosque is one of the important historical monuments of Naogaon. Built during the Sultanate period, the mosque is recognized for its distinctive stone construction and architectural details.",
  latitude: 24.75,
  longitude: 88.98,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Kusumba+Mosque",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the architecture",
    "Photography",
    "Learn about Sultanate history",
  ],
  highlights: [
    "Sultanate architecture",
    "Stone construction",
    "Historic mosque",
  ],
  popular: true,
}),

createDestination({
  id: "dest-064",
  slug: "patisar-rabindra-kacharibari",
  name: "Patisar Rabindra Kacharibari",
  district: "Naogaon",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A heritage site associated with poet Rabindranath Tagore and his connection with Patisar.",
  description:
    "Patisar Rabindra Kacharibari is a cultural heritage site associated with Rabindranath Tagore. The site provides visitors with an opportunity to explore the literary and cultural history of rural Bengal.",
  latitude: 24.64,
  longitude: 89.55,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Patisar+Rabindra+Kacharibari",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore the heritage house",
    "Learn about Tagore's connection",
    "Photography",
  ],
  highlights: [
    "Rabindranath Tagore heritage",
    "Literary history",
    "Rural Bengal",
  ],
}),

// ------------------------------------------------------------
// Natore
// ------------------------------------------------------------

createDestination({
  id: "dest-065",
  slug: "natorerajbari",
  name: "Natore Rajbari",
  district: "Natore",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A historic palace complex associated with the royal heritage of Natore.",
  description:
    "Natore Rajbari is an important historical palace complex representing the region's royal and zamindar heritage. The surviving buildings and grounds attract visitors interested in architecture and history.",
  latitude: 24.42,
  longitude: 89.00,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Natore+Rajbari",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore the palace grounds",
    "Photography",
    "Learn about Natore's history",
  ],
  highlights: [
    "Royal heritage",
    "Historic palace",
    "Traditional architecture",
  ],
  popular: true,
}),

createDestination({
  id: "dest-066",
  slug: "uttara-ganabhaban",
  name: "Uttara Ganabhaban",
  district: "Natore",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A historic palace complex surrounded by gardens and associated with the heritage of Natore.",
  description:
    "Uttara Ganabhaban is a notable historic palace complex in Natore. Its architecture, landscaped surroundings and historical associations make it an important heritage attraction.",
  latitude: 24.44,
  longitude: 89.02,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Uttara+Ganabhaban",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore the palace surroundings",
    "Photography",
    "Learn about local history",
  ],
  highlights: [
    "Historic palace",
    "Gardens",
    "Royal heritage",
  ],
  popular: true,
}),

createDestination({
  id: "dest-067",
  slug: "chalan-beel",
  name: "Chalan Beel",
  district: "Natore",
  division: "Rajshahi",
  category: "Nature",
  shortDescription:
    "One of the major wetland landscapes of northern Bangladesh.",
  description:
    "Chalan Beel is a large wetland region extending across parts of northern Bangladesh. During the monsoon, its waterways and surrounding landscapes create a distinctive natural environment.",
  latitude: 24.55,
  longitude: 89.48,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Chalan+Beel",
  bestSeason: "July - October",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day - 1 Day",
  thingsToDo: [
    "Boat ride",
    "Explore wetland scenery",
    "Bird watching",
    "Photography",
  ],
  highlights: [
    "Large wetland",
    "Waterways",
    "Seasonal natural scenery",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Pabna
// ------------------------------------------------------------

createDestination({
  id: "dest-068",
  slug: "hardinge-bridge",
  name: "Hardinge Bridge",
  district: "Pabna",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A historic railway bridge over the Padma River and an important engineering landmark.",
  description:
    "Hardinge Bridge is a historic railway bridge crossing the Padma River near Paksey. Its engineering significance and riverside setting make it an important landmark in the region.",
  latitude: 24.07,
  longitude: 89.05,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Hardinge+Bridge+Paksey",
  bestSeason: "October - March",
  openingHours: "View from accessible public areas",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Enjoy river views",
    "Photography",
    "Explore Paksey area",
  ],
  highlights: [
    "Historic railway bridge",
    "Padma River",
    "Engineering heritage",
  ],
  popular: true,
}),

createDestination({
  id: "dest-069",
  slug: "pakshi-railway-colony",
  name: "Paksey Railway Colony",
  district: "Pabna",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A heritage railway landscape surrounding the historic Paksey railway area.",
  description:
    "Paksey Railway Colony is associated with the development of the railway network around the Padma River. The area offers a distinctive combination of railway heritage, old structures and riverside scenery.",
  latitude: 24.07,
  longitude: 89.00,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Paksey+Railway+Colony",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore railway heritage",
    "Photography",
    "Enjoy riverside surroundings",
  ],
  highlights: [
    "Railway heritage",
    "Historic Paksey area",
    "Riverside landscape",
  ],
}),

createDestination({
  id: "dest-070",
  slug: "chatmohar-shahi-mosque",
  name: "Chatmohar Shahi Mosque",
  district: "Pabna",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A historic mosque representing the architectural heritage of Pabna.",
  description:
    "Chatmohar Shahi Mosque is a notable historical monument in Pabna. Its traditional architecture contributes to the cultural heritage of the region.",
  latitude: 24.23,
  longitude: 89.22,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Chatmohar+Shahi+Mosque",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the historic mosque",
    "Photography",
    "Learn about local heritage",
  ],
  highlights: [
    "Historic mosque",
    "Traditional architecture",
    "Cultural heritage",
  ],
}),

// ------------------------------------------------------------
// Rajshahi
// ------------------------------------------------------------

createDestination({
  id: "dest-071",
  slug: "varendra-research-museum",
  name: "Varendra Research Museum",
  district: "Rajshahi",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A major museum preserving archaeological and cultural heritage from Bengal.",
  description:
    "Varendra Research Museum in Rajshahi houses a significant collection of archaeological artifacts, sculptures, inscriptions and cultural objects from Bengal's history.",
  latitude: 24.37,
  longitude: 88.57,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Varendra+Research+Museum",
  bestSeason: "October - March",
  openingHours: "Museum hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore museum collections",
    "Study archaeological artifacts",
    "Learn about Bengal history",
  ],
  highlights: [
    "Archaeological collection",
    "Cultural heritage",
    "Historic museum",
  ],
  popular: true,
}),

createDestination({
  id: "dest-072",
  slug: "puthia-rajbari-complex",
  name: "Puthia Rajbari Complex",
  district: "Rajshahi",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A remarkable palace and temple complex showcasing the architectural heritage of Puthia.",
  description:
    "Puthia Rajbari Complex is one of the most impressive heritage areas in Rajshahi. The palace and surrounding temples create a concentrated architectural landscape reflecting the region's royal and religious history.",
  latitude: 24.36,
  longitude: 88.83,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Puthia+Rajbari",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Explore the palace",
    "Visit surrounding temples",
    "Photography",
    "Explore terracotta architecture",
  ],
  highlights: [
    "Historic palace",
    "Temple complex",
    "Terracotta architecture",
  ],
  popular: true,
}),

createDestination({
  id: "dest-073",
  slug: "bagha-mosque",
  name: "Bagha Mosque",
  district: "Rajshahi",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A celebrated Sultanate-era mosque and important archaeological monument of Rajshahi.",
  description:
    "Bagha Mosque is a historic mosque known for its distinctive architecture and terracotta decoration. It is one of the major archaeological attractions of Rajshahi district.",
  latitude: 24.20,
  longitude: 88.75,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Bagha+Mosque",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the mosque",
    "Observe terracotta details",
    "Photography",
  ],
  highlights: [
    "Sultanate architecture",
    "Terracotta decoration",
    "Historic mosque",
  ],
  popular: true,
}),

createDestination({
  id: "dest-074",
  slug: "padma-river-rajshahi",
  name: "Padma River Bank",
  district: "Rajshahi",
  division: "Rajshahi",
  category: "River",
  shortDescription:
    "A scenic riverside area along the Padma River known for sunsets and open landscapes.",
  description:
    "The Padma River bank is one of Rajshahi's most recognizable natural landscapes. The riverside provides open views, fresh air and beautiful sunset scenery.",
  latitude: 24.36,
  longitude: 88.60,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Padma+River+Rajshahi",
  bestSeason: "October - March",
  openingHours: "Daylight and evening",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy the river",
    "Watch sunset",
    "Walk along the riverfront",
    "Photography",
  ],
  highlights: [
    "Padma River",
    "Sunset views",
    "Riverside landscape",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Sirajganj
// ------------------------------------------------------------

createDestination({
  id: "dest-075",
  slug: "bangabandhu-bridge",
  name: "Bangabandhu Bridge",
  district: "Sirajganj",
  division: "Rajshahi",
  category: "River",
  shortDescription:
    "A major bridge across the Jamuna River connecting eastern and western Bangladesh.",
  description:
    "Bangabandhu Bridge crosses the Jamuna River and is one of Bangladesh's major transport landmarks. The surrounding river landscape offers an impressive view of the country's large river system.",
  latitude: 24.40,
  longitude: 89.77,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Bangabandhu+Bridge",
  bestSeason: "October - March",
  openingHours: "View from permitted public areas",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Enjoy river scenery",
    "Photography",
    "Explore nearby river landscapes",
  ],
  highlights: [
    "Jamuna River",
    "Major bridge",
    "Engineering landmark",
  ],
  popular: true,
}),

createDestination({
  id: "dest-076",
  slug: "rabindranath-tagore-kacharibari",
  name: "Rabindranath Tagore Kacharibari",
  district: "Sirajganj",
  division: "Rajshahi",
  category: "Historical",
  shortDescription:
    "A heritage site associated with Rabindranath Tagore in Shahjadpur.",
  description:
    "Rabindranath Tagore Kacharibari in Shahjadpur is a cultural heritage site associated with the life and work of Rabindranath Tagore. The site reflects the literary history of rural Bengal.",
  latitude: 24.17,
  longitude: 89.60,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Rabindranath+Tagore+Kacharibari+Shahjadpur",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore the heritage house",
    "Learn about Tagore",
    "Visit the museum area",
    "Photography",
  ],
  highlights: [
    "Rabindranath Tagore heritage",
    "Literary history",
    "Shahjadpur culture",
  ],
  popular: true,
}),

createDestination({
  id: "dest-077",
  slug: "jamuna-river-sirajganj",
  name: "Jamuna River",
  district: "Sirajganj",
  division: "Rajshahi",
  category: "River",
  shortDescription:
    "A powerful river landscape offering wide open views and seasonal riverside scenery.",
  description:
    "The Jamuna River shapes much of Sirajganj's landscape. Its wide river channel, chars and changing seasonal scenery create an important natural attraction for visitors interested in river life and photography.",
  latitude: 24.45,
  longitude: 89.72,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Jamuna+River+Sirajganj",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy river views",
    "Photography",
    "Observe riverside life",
    "Explore seasonal char areas",
  ],
  highlights: [
    "Jamuna River",
    "Riverine landscape",
    "Seasonal char scenery",
  ],
}),
// ============================================================
// KHULNA DIVISION
// ============================================================

// ------------------------------------------------------------
// Bagerhat
// ------------------------------------------------------------

createDestination({
  id: "dest-078",
  slug: "sixty-dome-mosque",
  name: "Sixty Dome Mosque",
  district: "Bagerhat",
  division: "Khulna",
  category: "Historical",
  shortDescription:
    "A UNESCO World Heritage monument and one of the most important medieval mosques in Bangladesh.",
  description:
    "The Sixty Dome Mosque is a remarkable medieval mosque complex in Bagerhat associated with Khan Jahan Ali. Its distinctive brick architecture and numerous domes make it one of Bangladesh's most significant historical landmarks.",
  latitude: 22.67,
  longitude: 89.74,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Sixty+Dome+Mosque+Bagerhat",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore the mosque",
    "Visit the surrounding archaeological sites",
    "Photography",
    "Learn about medieval Bengal",
  ],
  highlights: [
    "UNESCO World Heritage Site",
    "Medieval architecture",
    "Khan Jahan Ali heritage",
  ],
  popular: true,
}),

createDestination({
  id: "dest-079",
  slug: "khan-jahan-ali-mausoleum",
  name: "Khan Jahan Ali Mausoleum",
  district: "Bagerhat",
  division: "Khulna",
  category: "Historical",
  shortDescription:
    "A historic mausoleum associated with the founder of the medieval city of Khalifatabad.",
  description:
    "The mausoleum of Khan Jahan Ali is an important historical and religious site in Bagerhat. The surrounding dighi and architectural setting form part of the medieval heritage of the region.",
  latitude: 22.67,
  longitude: 89.75,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Khan+Jahan+Ali+Mausoleum",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Visit the mausoleum",
    "Explore the historic surroundings",
    "Photography",
  ],
  highlights: [
    "Khan Jahan Ali heritage",
    "Historic mausoleum",
    "Medieval Bagerhat",
  ],
}),

// ------------------------------------------------------------
// Chuadanga
// ------------------------------------------------------------

createDestination({
  id: "dest-080",
  slug: "dattatreya-kali-temple",
  name: "Dattatreya Kali Temple",
  district: "Chuadanga",
  division: "Khulna",
  category: "Historical",
  shortDescription:
    "A historic religious heritage site reflecting the cultural traditions of Chuadanga.",
  description:
    "Dattatreya Kali Temple is a local heritage attraction associated with the religious and cultural history of Chuadanga. The site offers visitors an opportunity to experience the traditional heritage of the district.",
  latitude: 23.64,
  longitude: 88.84,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Dattatreya+Kali+Temple+Chuadanga",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the temple",
    "Learn about local heritage",
    "Photography",
  ],
  highlights: [
    "Religious heritage",
    "Local culture",
    "Traditional architecture",
  ],
}),

// ------------------------------------------------------------
// Jashore
// ------------------------------------------------------------

createDestination({
  id: "dest-081",
  slug: "sagardari-michael-madhusudan-dutt-birthplace",
  name: "Sagardari",
  district: "Jashore",
  division: "Khulna",
  category: "Historical",
  shortDescription:
    "The birthplace of renowned Bengali poet Michael Madhusudan Dutt.",
  description:
    "Sagardari is a culturally important heritage destination associated with poet Michael Madhusudan Dutt. The memorial complex and surrounding area preserve an important chapter of Bengali literary history.",
  latitude: 23.17,
  longitude: 89.13,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Sagardari+Michael+Madhusudan+Dutt",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Visit the poet's birthplace",
    "Explore the memorial museum",
    "Learn about Bengali literature",
    "Photography",
  ],
  highlights: [
    "Literary heritage",
    "Michael Madhusudan Dutt",
    "Cultural history",
  ],
  popular: true,
}),

createDestination({
  id: "dest-082",
  slug: "benapole-land-port-area",
  name: "Benapole",
  district: "Jashore",
  division: "Khulna",
  category: "Nature",
  shortDescription:
    "A major border region of Bangladesh known for its distinctive cross-border landscape and local culture.",
  description:
    "Benapole is one of Bangladesh's most important land-border areas. Beyond its economic importance, the surrounding region offers travelers a glimpse into the culture and landscape of southwestern Bangladesh.",
  latitude: 23.04,
  longitude: 88.87,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Benapole+Jashore",
  bestSeason: "October - March",
  openingHours: "Varies by location",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Explore the local area",
    "Experience border-region culture",
    "Photography",
  ],
  highlights: [
    "Major border region",
    "Southwestern Bangladesh",
    "Local culture",
  ],
}),

// ------------------------------------------------------------
// Jhenaidah
// ------------------------------------------------------------

createDestination({
  id: "dest-083",
  slug: "naldanga-temple-complex",
  name: "Naldanga Temple Complex",
  district: "Jhenaidah",
  division: "Khulna",
  category: "Historical",
  shortDescription:
    "A historic temple complex representing the architectural and religious heritage of Jhenaidah.",
  description:
    "Naldanga Temple Complex is an important cultural heritage site in Jhenaidah. The historic temples and surrounding environment reflect the region's traditional religious architecture.",
  latitude: 23.55,
  longitude: 89.18,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Naldanga+Temple+Jhenaidah",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the temples",
    "Photography",
    "Learn about local heritage",
  ],
  highlights: [
    "Temple architecture",
    "Religious heritage",
    "Local history",
  ],
}),

// ------------------------------------------------------------
// Khulna
// ------------------------------------------------------------

createDestination({
  id: "dest-084",
  slug: "rupsha-river",
  name: "Rupsha River",
  district: "Khulna",
  division: "Khulna",
  category: "River",
  shortDescription:
    "A major river flowing beside Khulna city and an important part of its urban landscape.",
  description:
    "The Rupsha River is closely connected with Khulna's history and daily life. Its riverfront landscape, boats and changing light make it a popular setting for photography and riverside exploration.",
  latitude: 22.82,
  longitude: 89.56,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Rupsha+River+Khulna",
  bestSeason: "October - March",
  openingHours: "Daylight and evening",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy riverside views",
    "Watch sunset",
    "Photography",
    "Observe river life",
  ],
  highlights: [
    "Riverside landscape",
    "Boats and river life",
    "Sunset views",
  ],
  popular: true,
}),

createDestination({
  id: "dest-085",
  slug: "khan-jahan-ali-bridge",
  name: "Khan Jahan Ali Bridge",
  district: "Khulna",
  division: "Khulna",
  category: "River",
  shortDescription:
    "A major bridge over the Rupsha River offering broad views of the surrounding waterways.",
  description:
    "Khan Jahan Ali Bridge crosses the Rupsha River near Khulna and is an important transportation landmark. The surrounding river landscape is particularly attractive around sunset.",
  latitude: 22.78,
  longitude: 89.60,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Khan+Jahan+Ali+Bridge+Khulna",
  bestSeason: "October - March",
  openingHours: "View from permitted public areas",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Enjoy river views",
    "Photography",
    "Watch sunset",
  ],
  highlights: [
    "Rupsha River",
    "Bridge landmark",
    "River scenery",
  ],
}),

// ------------------------------------------------------------
// Kushtia
// ------------------------------------------------------------

createDestination({
  id: "dest-086",
  slug: "shilaidaha-kuthibari",
  name: "Shilaidaha Kuthibari",
  district: "Kushtia",
  division: "Khulna",
  category: "Historical",
  shortDescription:
    "A famous heritage site associated with Rabindranath Tagore and his literary life.",
  description:
    "Shilaidaha Kuthibari is one of the most important literary heritage destinations in Bangladesh. Rabindranath Tagore spent significant periods here, and the site is closely connected with his literary work.",
  latitude: 23.93,
  longitude: 89.16,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Shilaidaha+Kuthibari",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Visit the Kuthibari",
    "Explore the museum",
    "Learn about Tagore",
    "Photography",
  ],
  highlights: [
    "Rabindranath Tagore heritage",
    "Literary history",
    "Historic residence",
  ],
  popular: true,
}),

createDestination({
  id: "dest-087",
  slug: "lalan-shah-mazar",
  name: "Lalon Shah Mazar",
  district: "Kushtia",
  division: "Khulna",
  category: "Historical",
  shortDescription:
    "A cultural heritage destination associated with mystic philosopher and Baul icon Lalon Shah.",
  description:
    "Lalon Shah Mazar at Cheuriya is an important cultural destination associated with Lalon Shah and the Baul tradition. The site attracts visitors interested in Bengali folk philosophy, music and culture.",
  latitude: 23.88,
  longitude: 89.14,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Lalon+Shah+Mazar",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore the cultural complex",
    "Learn about Baul philosophy",
    "Experience folk culture",
    "Photography",
  ],
  highlights: [
    "Lalon Shah heritage",
    "Baul culture",
    "Folk philosophy",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Magura
// ------------------------------------------------------------

createDestination({
  id: "dest-088",
  slug: "siddheshwari-math",
  name: "Siddheshwari Math",
  district: "Magura",
  division: "Khulna",
  category: "Historical",
  shortDescription:
    "A historic religious heritage site reflecting the traditional culture of Magura.",
  description:
    "Siddheshwari Math is a notable religious heritage site in Magura. The historic complex reflects the region's longstanding cultural and architectural traditions.",
  latitude: 23.49,
  longitude: 89.42,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Siddheshwari+Math+Magura",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the heritage site",
    "Photography",
    "Learn about local culture",
  ],
  highlights: [
    "Religious heritage",
    "Traditional architecture",
    "Local culture",
  ],
}),

// ------------------------------------------------------------
// Meherpur
// ------------------------------------------------------------

createDestination({
  id: "dest-089",
  slug: "mujibnagar-complex",
  name: "Mujibnagar Memorial Complex",
  district: "Meherpur",
  division: "Khulna",
  category: "Historical",
  shortDescription:
    "A major historical memorial site associated with the Bangladesh Liberation War.",
  description:
    "Mujibnagar Memorial Complex commemorates the historical formation and oath-taking of Bangladesh's first government during the Liberation War. It is an important destination for understanding the country's political and national history.",
  latitude: 23.76,
  longitude: 88.63,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Mujibnagar+Memorial+Complex",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore the memorial",
    "Learn about the Liberation War",
    "Visit historical landmarks",
    "Photography",
  ],
  highlights: [
    "Liberation War history",
    "National heritage",
    "Mujibnagar government history",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Narail
// ------------------------------------------------------------

createDestination({
  id: "dest-090",
  slug: "s-m-sultan-museum",
  name: "S M Sultan Memorial Museum",
  district: "Narail",
  division: "Khulna",
  category: "Historical",
  shortDescription:
    "A cultural museum dedicated to renowned Bangladeshi artist S M Sultan.",
  description:
    "The S M Sultan Memorial Museum in Narail preserves the memory and artistic legacy of one of Bangladesh's notable painters. The museum provides insight into his life, work and connection with rural Bengal.",
  latitude: 23.17,
  longitude: 89.50,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=S+M+Sultan+Memorial+Museum",
  bestSeason: "October - March",
  openingHours: "Museum hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore artworks",
    "Learn about S M Sultan",
    "Photography",
  ],
  highlights: [
    "Bangladeshi art heritage",
    "S M Sultan",
    "Cultural museum",
  ],
}),

// ------------------------------------------------------------
// Satkhira
// ------------------------------------------------------------

createDestination({
  id: "dest-091",
  slug: "burigoalini-sundarbans-gateway",
  name: "Burigoalini",
  district: "Satkhira",
  division: "Khulna",
  category: "Forest",
  shortDescription:
    "A gateway area for exploring the western side of the Sundarbans.",
  description:
    "Burigoalini and the surrounding Shyamnagar region provide access to the western Sundarbans landscape. The area is known for waterways, mangrove ecosystems and communities living alongside the forest.",
  latitude: 22.33,
  longitude: 89.10,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Burigoalini+Satkhira",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day - 1 Day",
  thingsToDo: [
    "Explore mangrove surroundings",
    "Boat journey",
    "Wildlife observation",
    "Photography",
  ],
  highlights: [
    "Sundarbans gateway",
    "Mangrove ecosystem",
    "River waterways",
  ],
  popular: true,
}),

createDestination({
  id: "dest-092",
  slug: "kalimandir-kaliganj-satkhira",
  name: "Kaliganj Heritage Area",
  district: "Satkhira",
  division: "Khulna",
  category: "Historical",
  shortDescription:
    "A local heritage landscape reflecting the historical and cultural traditions of Satkhira.",
  description:
    "The Kaliganj area contains several elements of local cultural and religious heritage. It offers an opportunity to explore the traditional rural landscape of southwestern Bangladesh.",
  latitude: 22.46,
  longitude: 89.05,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Kaliganj+Satkhira",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore local heritage",
    "Photography",
    "Experience rural culture",
  ],
  highlights: [
    "Local heritage",
    "Rural landscape",
    "Cultural traditions",
  ],
}),
// ============================================================
// BARISHAL DIVISION
// ============================================================

// ------------------------------------------------------------
// Barguna
// ------------------------------------------------------------

createDestination({
  id: "dest-093",
  slug: "taltali-sonakata-beach",
  name: "Taltali Sonakata",
  district: "Barguna",
  division: "Barishal",
  category: "Beach",
  shortDescription:
    "A scenic coastal destination in Barguna featuring sea, forest and open natural landscapes.",
  description:
    "Taltali Sonakata is a coastal destination in Barguna where visitors can experience the natural beauty of southern Bangladesh. The area combines coastal scenery, greenery and a relatively quiet environment.",
  latitude: 22.10,
  longitude: 90.17,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Taltali+Sonakata+Barguna",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day - 1 Day",
  thingsToDo: [
    "Explore the coast",
    "Enjoy natural scenery",
    "Photography",
    "Watch sunset",
  ],
  highlights: [
    "Coastal landscape",
    "Natural environment",
    "Quiet beach experience",
  ],
  popular: true,
}),

createDestination({
  id: "dest-094",
  slug: "payra-river-barguna",
  name: "Payra River",
  district: "Barguna",
  division: "Barishal",
  category: "River",
  shortDescription:
    "A major river landscape associated with the coastal waterways of Barguna.",
  description:
    "The Payra River forms an important part of the waterways of southern Bangladesh. Its surrounding landscape provides opportunities to experience river life, boat traffic and coastal scenery.",
  latitude: 22.16,
  longitude: 90.12,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Payra+River+Barguna",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy riverside views",
    "Watch sunset",
    "Photography",
    "Observe local river life",
  ],
  highlights: [
    "Coastal river",
    "Riverside scenery",
    "Local waterways",
  ],
}),

// ------------------------------------------------------------
// Barishal
// ------------------------------------------------------------

createDestination({
  id: "dest-095",
  slug: "durga-sagor-dighi",
  name: "Durga Sagar Dighi",
  district: "Barishal",
  division: "Barishal",
  category: "Lake",
  shortDescription:
    "A historic large waterbody surrounded by greenery near Barishal city.",
  description:
    "Durga Sagar Dighi is one of the well-known heritage waterbodies of Barishal. Its large pond, greenery and peaceful surroundings make it a popular destination for visitors exploring the region.",
  latitude: 22.79,
  longitude: 90.35,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Durga+Sagar+Dighi",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Walk around the lake",
    "Enjoy the natural surroundings",
    "Photography",
    "Bird watching",
  ],
  highlights: [
    "Historic waterbody",
    "Green surroundings",
    "Peaceful environment",
  ],
  popular: true,
}),

createDestination({
  id: "dest-096",
  slug: "oxford-epiphany-cathedral",
  name: "Oxford Mission Church",
  district: "Barishal",
  division: "Barishal",
  category: "Historical",
  shortDescription:
    "A historic landmark in Barishal known for its distinctive Gothic architectural character.",
  description:
    "The Oxford Mission Church is one of the notable architectural landmarks of Barishal. Its historic setting and distinctive architecture make it an important cultural attraction in the city.",
  latitude: 22.70,
  longitude: 90.37,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Oxford+Mission+Church+Barishal",
  bestSeason: "October - March",
  openingHours: "Varies by access and religious schedule",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Admire the architecture",
    "Explore the historic surroundings",
    "Photography",
  ],
  highlights: [
    "Historic architecture",
    "Gothic architectural character",
    "Barishal city heritage",
  ],
  popular: true,
}),

createDestination({
  id: "dest-097",
  slug: "bell-island-barishal",
  name: "Bell's Park",
  district: "Barishal",
  division: "Barishal",
  category: "Nature",
  shortDescription:
    "A historic urban park and recreational area in Barishal city.",
  description:
    "Bell's Park is a familiar recreational landmark in Barishal. The green open space provides a simple place for walking, relaxation and experiencing the city's local atmosphere.",
  latitude: 22.70,
  longitude: 90.37,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Bells+Park+Barishal",
  bestSeason: "October - March",
  openingHours: "Daylight and evening",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Walking",
    "Relax in the park",
    "Photography",
    "Experience local city life",
  ],
  highlights: [
    "Urban greenery",
    "Recreational space",
    "Local heritage",
  ],
}),

// ------------------------------------------------------------
// Bhola
// ------------------------------------------------------------

createDestination({
  id: "dest-098",
  slug: "monpura-island",
  name: "Monpura Island",
  district: "Bhola",
  division: "Barishal",
  category: "Island",
  shortDescription:
    "A peaceful river island destination surrounded by the waterways of southern Bangladesh.",
  description:
    "Monpura is an island upazila in Bhola known for its riverside landscape, open fields and quiet rural environment. The island offers visitors a distinctive experience of riverine Bangladesh.",
  latitude: 22.18,
  longitude: 90.98,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Monpura+Island+Bhola",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Days",
  thingsToDo: [
    "Explore the island",
    "Boat ride",
    "Watch sunrise and sunset",
    "Photography",
  ],
  highlights: [
    "River island",
    "Rural landscape",
    "Waterways",
  ],
  popular: true,
}),

createDestination({
  id: "dest-099",
  slug: "char-kukri-mukri",
  name: "Char Kukri Mukri",
  district: "Bhola",
  division: "Barishal",
  category: "Forest",
  shortDescription:
    "A coastal island destination known for mangrove vegetation and wildlife.",
  description:
    "Char Kukri Mukri is a coastal forest and island destination in Bhola. Its mangrove vegetation, waterways and wildlife make it an attractive destination for nature-focused travelers.",
  latitude: 21.93,
  longitude: 90.77,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Char+Kukri+Mukri",
  bestSeason: "November - February",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1 Day",
  thingsToDo: [
    "Explore mangrove forest",
    "Boat ride",
    "Bird watching",
    "Wildlife observation",
    "Photography",
  ],
  highlights: [
    "Coastal forest",
    "Mangrove ecosystem",
    "Wildlife",
    "Island environment",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Jhalokathi
// ------------------------------------------------------------

createDestination({
  id: "dest-100",
  slug: "floating-guava-market",
  name: "Floating Guava Market",
  district: "Jhalokathi",
  division: "Barishal",
  category: "River",
  shortDescription:
    "A unique seasonal floating market showcasing the traditional waterways and guava trade of southern Bangladesh.",
  description:
    "The floating guava market is a distinctive seasonal attraction of the Jhalokathi-Barishal region. During the guava season, boats gather on the waterways to transport and trade locally grown guava.",
  latitude: 22.64,
  longitude: 90.17,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Floating+Guava+Market+Jhalokathi",
  bestSeason: "July - September",
  openingHours: "Morning to afternoon during season",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Explore the floating market",
    "Take a boat ride",
    "Photography",
    "Experience local trade",
  ],
  highlights: [
    "Floating market",
    "Seasonal guava trade",
    "Traditional waterways",
  ],
  popular: true,
}),

createDestination({
  id: "dest-101",
  slug: "sugandha-river-jhalokathi",
  name: "Sugandha River",
  district: "Jhalokathi",
  division: "Barishal",
  category: "River",
  shortDescription:
    "A scenic river flowing through the waterways and settlements of Jhalokathi.",
  description:
    "The Sugandha River is an important part of Jhalokathi's riverine landscape. The river and surrounding waterways provide an authentic glimpse into the life and geography of southern Bangladesh.",
  latitude: 22.64,
  longitude: 90.20,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Sugandha+River+Jhalokathi",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy riverside views",
    "Boat ride",
    "Photography",
    "Observe local river life",
  ],
  highlights: [
    "River landscape",
    "Waterways",
    "Local culture",
  ],
}),

// ------------------------------------------------------------
// Patuakhali
// ------------------------------------------------------------

createDestination({
  id: "dest-102",
  slug: "gangamati-reserve-forest",
  name: "Gangamati Reserved Forest",
  district: "Patuakhali",
  division: "Barishal",
  category: "Forest",
  shortDescription:
    "A coastal forest landscape near Kuakata featuring mangroves and sea-facing scenery.",
  description:
    "Gangamati Reserved Forest is located near the Kuakata coastal region. The forest and adjacent coastline provide a combination of mangrove vegetation, sandy shore and natural scenery.",
  latitude: 21.84,
  longitude: 90.16,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Gangamati+Reserved+Forest",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Explore the forest",
    "Walk along the coast",
    "Photography",
    "Enjoy nature",
  ],
  highlights: [
    "Coastal forest",
    "Mangrove vegetation",
    "Sea-facing landscape",
  ],
  popular: true,
}),

createDestination({
  id: "dest-103",
  slug: "andharmanik-river",
  name: "Andharmanik River",
  district: "Patuakhali",
  division: "Barishal",
  category: "River",
  shortDescription:
    "A coastal river landscape connected with the waterways of Patuakhali.",
  description:
    "The Andharmanik River is part of the extensive river network of coastal Patuakhali. Its waterways and surrounding landscape provide opportunities for boat trips, photography and observing rural river life.",
  latitude: 21.90,
  longitude: 90.15,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Andharmanik+River+Patuakhali",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Boat ride",
    "Enjoy river views",
    "Photography",
    "Observe local life",
  ],
  highlights: [
    "Coastal river",
    "Boat journey",
    "Rural landscape",
  ],
}),

// ------------------------------------------------------------
// Pirojpur
// ------------------------------------------------------------

createDestination({
  id: "dest-104",
  slug: "swarupkathi-floating-market",
  name: "Swarupkathi Floating Market",
  district: "Pirojpur",
  division: "Barishal",
  category: "River",
  shortDescription:
    "A traditional floating market surrounded by the waterways of Pirojpur.",
  description:
    "Swarupkathi is known for its waterways and traditional floating markets. The area offers visitors a distinctive experience of boat-based commerce and riverine life in southern Bangladesh.",
  latitude: 22.75,
  longitude: 90.13,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Swarupkathi+Floating+Market",
  bestSeason: "July - September",
  openingHours: "Morning to afternoon",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Explore the floating market",
    "Take a boat ride",
    "Photography",
    "Experience local commerce",
  ],
  highlights: [
    "Floating market",
    "Traditional waterways",
    "Boat-based commerce",
  ],
  popular: true,
}),

createDestination({
  id: "dest-105",
  slug: "andharmanik-pirojpur-river",
  name: "Baleshwar River",
  district: "Pirojpur",
  division: "Barishal",
  category: "River",
  shortDescription:
    "A major riverine landscape contributing to the natural character of Pirojpur.",
  description:
    "The Baleshwar River is part of the extensive network of rivers in southern Bangladesh. Its surrounding waterways, boats and rural settlements provide an authentic riverine travel experience.",
  latitude: 22.58,
  longitude: 89.98,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Baleshwar+River+Pirojpur",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy river views",
    "Boat ride",
    "Photography",
    "Observe riverside life",
  ],
  highlights: [
    "Major river",
    "Riverine landscape",
    "Local waterways",
  ],
}),
// ============================================================
// SYLHET DIVISION
// ============================================================

// ------------------------------------------------------------
// Habiganj
// ------------------------------------------------------------

createDestination({
  id: "dest-106",
  slug: "satchari-national-park",
  name: "Satchari National Park",
  district: "Habiganj",
  division: "Sylhet",
  category: "Forest",
  shortDescription:
    "A protected forest destination known for rich biodiversity and natural trails.",
  description:
    "Satchari National Park is a protected forest area in Habiganj known for its evergreen vegetation, wildlife and peaceful natural environment. It is a popular destination for visitors interested in forests, biodiversity and nature walks.",
  latitude: 24.13,
  longitude: 91.58,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Satchari+National+Park+Habiganj",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day - 1 Day",
  thingsToDo: [
    "Explore forest trails",
    "Bird watching",
    "Wildlife observation",
    "Photography",
  ],
  highlights: [
    "Protected forest",
    "Biodiversity",
    "Nature trails",
  ],
  popular: true,
}),

createDestination({
  id: "dest-107",
  slug: "rema-kalenga-wildlife-sanctuary",
  name: "Rema-Kalenga Wildlife Sanctuary",
  district: "Habiganj",
  division: "Sylhet",
  category: "Forest",
  shortDescription:
    "A rich forest sanctuary offering one of the important wildlife habitats of northeastern Bangladesh.",
  description:
    "Rema-Kalenga Wildlife Sanctuary is a protected forest landscape in Habiganj. The sanctuary is known for its biodiversity, dense vegetation and wildlife, making it an attractive destination for nature-focused travelers.",
  latitude: 24.10,
  longitude: 91.55,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Rema+Kalenga+Wildlife+Sanctuary",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day - 1 Day",
  thingsToDo: [
    "Explore the forest",
    "Bird watching",
    "Wildlife observation",
    "Nature photography",
  ],
  highlights: [
    "Wildlife sanctuary",
    "Forest biodiversity",
    "Natural landscape",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Moulvibazar
// ------------------------------------------------------------

createDestination({
  id: "dest-108",
  slug: "lawachara-national-park",
  name: "Lawachara National Park",
  district: "Moulvibazar",
  division: "Sylhet",
  category: "Forest",
  shortDescription:
    "A renowned tropical rainforest destination known for biodiversity and scenic forest trails.",
  description:
    "Lawachara National Park is one of the best-known protected forest destinations in Bangladesh. Its evergreen forest, wildlife and walking trails make it a major attraction for visitors exploring the Sylhet region.",
  latitude: 24.32,
  longitude: 91.78,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Lawachara+National+Park",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day - 1 Day",
  thingsToDo: [
    "Explore forest trails",
    "Bird watching",
    "Wildlife observation",
    "Photography",
  ],
  highlights: [
    "Tropical rainforest",
    "Wildlife",
    "Forest trails",
    "Biodiversity",
  ],
  popular: true,
  featured: true,
}),

createDestination({
  id: "dest-109",
  slug: "madhabkunda-waterfall",
  name: "Madhabkunda Waterfall",
  district: "Moulvibazar",
  division: "Sylhet",
  category: "Waterfall",
  shortDescription:
    "One of Bangladesh's best-known waterfalls surrounded by hills and greenery.",
  description:
    "Madhabkunda Waterfall is a major natural attraction in Moulvibazar. The waterfall and surrounding rocky landscape, forest and hills create a scenic destination for nature lovers and photographers.",
  latitude: 24.59,
  longitude: 92.23,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Madhabkunda+Waterfall",
  bestSeason: "June - February",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Visit the waterfall",
    "Enjoy the surrounding nature",
    "Photography",
    "Explore nearby trails",
  ],
  highlights: [
    "Waterfall",
    "Rocky landscape",
    "Green hills",
    "Natural scenery",
  ],
  popular: true,
  featured: true,
}),

createDestination({
  id: "dest-110",
  slug: "hamham-waterfall",
  name: "Ham Ham Waterfall",
  district: "Moulvibazar",
  division: "Sylhet",
  category: "Waterfall",
  shortDescription:
    "A remote waterfall destination surrounded by forest and hilly terrain.",
  description:
    "Ham Ham Waterfall is a remote natural attraction in the forested hills of Moulvibazar. Reaching the waterfall involves a challenging trek, making it particularly attractive to adventure-oriented travelers.",
  latitude: 24.22,
  longitude: 91.93,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Ham+Ham+Waterfall+Moulvibazar",
  bestSeason: "August - February",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1 Day",
  thingsToDo: [
    "Trekking",
    "Explore forest trails",
    "Visit the waterfall",
    "Photography",
  ],
  highlights: [
    "Remote waterfall",
    "Forest trekking",
    "Hilly landscape",
    "Adventure travel",
  ],
  popular: true,
}),

createDestination({
  id: "dest-111",
  slug: "madhabpur-lake",
  name: "Madhabpur Lake",
  district: "Moulvibazar",
  division: "Sylhet",
  category: "Lake",
  shortDescription:
    "A scenic lake surrounded by tea gardens and green hills in Kamalganj.",
  description:
    "Madhabpur Lake is a picturesque natural destination surrounded by tea gardens and rolling green landscapes. The peaceful setting makes it a popular place for photography and relaxation.",
  latitude: 24.23,
  longitude: 91.79,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Madhabpur+Lake+Moulvibazar",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy lake views",
    "Photography",
    "Explore nearby tea gardens",
    "Relax in nature",
  ],
  highlights: [
    "Scenic lake",
    "Tea garden surroundings",
    "Green hills",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Sunamganj
// ------------------------------------------------------------

createDestination({
  id: "dest-112",
  slug: "tanguar-haor",
  name: "Tanguar Haor",
  district: "Sunamganj",
  division: "Sylhet",
  category: "Haor",
  shortDescription:
    "A vast wetland ecosystem known for migratory birds, waterways and seasonal beauty.",
  description:
    "Tanguar Haor is one of the most important wetland ecosystems of Bangladesh. During the monsoon it becomes a vast water landscape, while winter attracts numerous migratory birds.",
  latitude: 25.12,
  longitude: 91.07,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Tanguar+Haor+Sunamganj",
  bestSeason: "June - February",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Days",
  thingsToDo: [
    "Boat ride",
    "Bird watching",
    "Explore wetland villages",
    "Photography",
  ],
  highlights: [
    "Large wetland ecosystem",
    "Migratory birds",
    "Boat travel",
    "Seasonal landscape",
  ],
  popular: true,
  featured: true,
}),

createDestination({
  id: "dest-113",
  slug: "jadukata-river",
  name: "Jadukata River",
  district: "Sunamganj",
  division: "Sylhet",
  category: "River",
  shortDescription:
    "A clear-water river surrounded by hills and scenic rural landscapes in Sunamganj.",
  description:
    "The Jadukata River is known for its striking water and surrounding hills in the northern part of Sunamganj. The river landscape is especially attractive during the dry season.",
  latitude: 25.17,
  longitude: 91.10,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Jadukata+River+Sunamganj",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Enjoy river views",
    "Boat ride",
    "Photography",
    "Explore nearby villages",
  ],
  highlights: [
    "Clear river water",
    "Hill scenery",
    "Riverside landscape",
  ],
  popular: true,
}),

createDestination({
  id: "dest-114",
  slug: "barikka-tilla",
  name: "Barikka Tilla",
  district: "Sunamganj",
  division: "Sylhet",
  category: "Hill",
  shortDescription:
    "A scenic hill viewpoint overlooking the Jadukata River and surrounding landscape.",
  description:
    "Barikka Tilla offers elevated views across the Jadukata River and the surrounding landscape near the Bangladesh-India border region. Its combination of hills, river and open scenery makes it a popular viewpoint.",
  latitude: 25.16,
  longitude: 91.08,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Barikka+Tilla+Sunamganj",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy panoramic views",
    "Photography",
    "Explore the hills",
    "Watch sunset",
  ],
  highlights: [
    "Hill viewpoint",
    "Jadukata River views",
    "Border landscape",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Sylhet
// ------------------------------------------------------------

createDestination({
  id: "dest-115",
  slug: "ratargul-swamp-forest",
  name: "Ratargul Swamp Forest",
  district: "Sylhet",
  division: "Sylhet",
  category: "Forest",
  shortDescription:
    "A unique freshwater swamp forest where visitors explore flooded woodland by boat.",
  description:
    "Ratargul Swamp Forest is one of Bangladesh's most distinctive natural attractions. During the rainy season, water covers much of the forest floor and visitors can explore the flooded woodland by boat.",
  latitude: 25.00,
  longitude: 91.97,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Ratargul+Swamp+Forest",
  bestSeason: "June - September",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Boat ride",
    "Explore the swamp forest",
    "Photography",
    "Observe aquatic nature",
  ],
  highlights: [
    "Freshwater swamp forest",
    "Boat exploration",
    "Unique ecosystem",
    "Monsoon scenery",
  ],
  popular: true,
  featured: true,
}),

createDestination({
  id: "dest-116",
  slug: "bisnakandi",
  name: "Bichanakandi",
  district: "Sylhet",
  division: "Sylhet",
  category: "Nature",
  shortDescription:
    "A scenic stone-filled river landscape surrounded by hills and flowing streams.",
  description:
    "Bichanakandi is a popular natural destination in Sylhet where streams, stones and hills create a distinctive landscape. During the monsoon, the flowing water makes the area especially scenic.",
  latitude: 25.17,
  longitude: 91.91,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Bichanakandi+Sylhet",
  bestSeason: "June - September",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Explore the stone beds",
    "Enjoy the streams",
    "Photography",
    "Enjoy the hill scenery",
  ],
  highlights: [
    "Stone landscape",
    "Hill streams",
    "Monsoon scenery",
  ],
  popular: true,
}),

createDestination({
  id: "dest-117",
  slug: "jaflong",
  name: "Jaflong",
  district: "Sylhet",
  division: "Sylhet",
  category: "Nature",
  shortDescription:
    "A famous border-region destination known for hills, rivers and stone landscapes.",
  description:
    "Jaflong is one of the most popular tourist destinations in Sylhet. The area combines hills, the Dawki River, stone beds and views toward the surrounding border landscape.",
  latitude: 25.16,
  longitude: 92.02,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Jaflong+Sylhet",
  bestSeason: "June - February",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Enjoy river views",
    "Explore the stone areas",
    "Photography",
    "Enjoy hill scenery",
  ],
  highlights: [
    "Dawki River",
    "Hill landscape",
    "Stone beds",
    "Border scenery",
  ],
  popular: true,
  featured: true,
}),

createDestination({
  id: "dest-118",
  slug: "shahjalal-dargah-sylhet",
  name: "Hazrat Shah Jalal Mazar",
  district: "Sylhet",
  division: "Sylhet",
  category: "Historical",
  shortDescription:
    "A major religious and cultural landmark in Sylhet associated with Hazrat Shah Jalal.",
  description:
    "Hazrat Shah Jalal Mazar is one of the most important religious and cultural landmarks of Sylhet. The shrine is closely connected with the history and cultural identity of the city.",
  latitude: 24.90,
  longitude: 91.87,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Hazrat+Shah+Jalal+Mazar+Sylhet",
  bestSeason: "October - March",
  openingHours: "Varies by religious schedule",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Visit the shrine",
    "Explore the historic surroundings",
    "Learn about Sylhet's heritage",
  ],
  highlights: [
    "Religious heritage",
    "Sylhet history",
    "Cultural landmark",
  ],
  popular: true,
}),

createDestination({
  id: "dest-119",
  slug: "shah-paran-mazar",
  name: "Hazrat Shah Paran Mazar",
  district: "Sylhet",
  division: "Sylhet",
  category: "Historical",
  shortDescription:
    "A significant religious heritage site associated with Hazrat Shah Paran.",
  description:
    "Hazrat Shah Paran Mazar is an important religious and cultural site in Sylhet. The shrine and its surrounding environment form part of the city's historic spiritual heritage.",
  latitude: 24.94,
  longitude: 91.92,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Hazrat+Shah+Paran+Mazar+Sylhet",
  bestSeason: "October - March",
  openingHours: "Varies by religious schedule",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Visit the shrine",
    "Explore the surroundings",
    "Learn about local heritage",
  ],
  highlights: [
    "Religious heritage",
    "Historic site",
    "Cultural traditions",
  ],
}),
// ============================================================
// RANGPUR DIVISION
// ============================================================

// ------------------------------------------------------------
// Dinajpur
// ------------------------------------------------------------

createDestination({
  id: "dest-120",
  slug: "kantajew-temple",
  name: "Kantajew Temple",
  district: "Dinajpur",
  division: "Rangpur",
  category: "Historical",
  shortDescription:
    "A magnificent terracotta Hindu temple and one of the finest examples of medieval temple architecture in Bangladesh.",
  description:
    "Kantajew Temple is a renowned terracotta temple in Dinajpur. Its richly decorated exterior features detailed terracotta artwork depicting scenes from mythology, daily life and history.",
  latitude: 25.78,
  longitude: 88.72,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Kantajew+Temple+Dinajpur",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore the temple",
    "Admire terracotta artwork",
    "Photography",
    "Learn about local heritage",
  ],
  highlights: [
    "Terracotta architecture",
    "Historic temple",
    "Cultural heritage",
  ],
  popular: true,
  featured: true,
}),

createDestination({
  id: "dest-121",
  slug: "ram-sagar-national-park",
  name: "Ramsagar National Park",
  district: "Dinajpur",
  division: "Rangpur",
  category: "Lake",
  shortDescription:
    "A large historic lake surrounded by greenery and a peaceful recreational landscape.",
  description:
    "Ramsagar is a historic large waterbody and surrounding park in Dinajpur. Its open water, greenery and peaceful environment make it a popular destination for family outings and nature lovers.",
  latitude: 25.61,
  longitude: 88.68,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Ramsagar+National+Park+Dinajpur",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Walk around the lake",
    "Enjoy nature",
    "Photography",
    "Bird watching",
  ],
  highlights: [
    "Large historic lake",
    "Green surroundings",
    "Recreational area",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Gaibandha
// ------------------------------------------------------------

createDestination({
  id: "dest-122",
  slug: "balashi-ghat",
  name: "Balashi Ghat",
  district: "Gaibandha",
  division: "Rangpur",
  category: "River",
  shortDescription:
    "A scenic riverside destination on the Jamuna known for broad waterways and riverine landscapes.",
  description:
    "Balashi Ghat is a notable riverfront area of Gaibandha associated with the Jamuna River. The surrounding landscape provides an opportunity to experience the scale and beauty of northern Bangladesh's river systems.",
  latitude: 25.24,
  longitude: 89.65,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Balashi+Ghat+Gaibandha",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy river views",
    "Photography",
    "Watch sunset",
    "Observe river life",
  ],
  highlights: [
    "Jamuna River",
    "Riverfront scenery",
    "Riverside life",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Kurigram
// ------------------------------------------------------------

createDestination({
  id: "dest-123",
  slug: "char-rajibpur",
  name: "Char Rajibpur",
  district: "Kurigram",
  division: "Rangpur",
  category: "River",
  shortDescription:
    "A riverine landscape shaped by chars, waterways and rural life in northern Bangladesh.",
  description:
    "Char Rajibpur is an upazila and riverine area of Kurigram surrounded by waterways and seasonal char landscapes. Visitors can experience the changing geography and rural lifestyle of northern Bangladesh.",
  latitude: 25.35,
  longitude: 89.76,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Char+Rajibpur+Kurigram",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Explore riverine landscapes",
    "Boat ride",
    "Photography",
    "Observe rural life",
  ],
  highlights: [
    "Char landscape",
    "River waterways",
    "Rural Bangladesh",
  ],
}),

createDestination({
  id: "dest-124",
  slug: "dharla-river-kurigram",
  name: "Dharla River",
  district: "Kurigram",
  division: "Rangpur",
  category: "River",
  shortDescription:
    "A major river landscape contributing to the distinctive geography of Kurigram.",
  description:
    "The Dharla River is an important river of northern Bangladesh and is closely connected with the landscape and livelihoods of Kurigram. Its banks offer scenic views of the region's riverine environment.",
  latitude: 25.81,
  longitude: 89.65,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Dharla+River+Kurigram",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy riverside views",
    "Photography",
    "Watch sunset",
    "Observe local river life",
  ],
  highlights: [
    "Northern river landscape",
    "Riverside scenery",
    "Local waterways",
  ],
}),

// ------------------------------------------------------------
// Lalmonirhat
// ------------------------------------------------------------

createDestination({
  id: "dest-125",
  slug: "tin-bigha-corridor",
  name: "Tin Bigha Corridor",
  district: "Lalmonirhat",
  division: "Rangpur",
  category: "Historical",
  shortDescription:
    "A historically significant border corridor representing an important chapter in Bangladesh's regional history.",
  description:
    "Tin Bigha Corridor is a notable border landmark in Lalmonirhat. Its unique geographical and historical significance makes it an interesting destination for travelers exploring northern Bangladesh.",
  latitude: 26.03,
  longitude: 88.76,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Tin+Bigha+Corridor+Lalmonirhat",
  bestSeason: "October - March",
  openingHours: "Subject to border-area access rules",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the border landscape",
    "Learn about regional history",
    "Photography",
  ],
  highlights: [
    "Border landmark",
    "Historical significance",
    "Unique geography",
  ],
}),

// ------------------------------------------------------------
// Nilphamari
// ------------------------------------------------------------

createDestination({
  id: "dest-126",
  slug: "nilphamari-nil-sagar",
  name: "Nil Sagar",
  district: "Nilphamari",
  division: "Rangpur",
  category: "Lake",
  shortDescription:
    "A large historic waterbody and popular recreational destination in Nilphamari.",
  description:
    "Nil Sagar is a well-known waterbody in Nilphamari surrounded by open landscapes and greenery. The site provides a peaceful environment for visitors and is particularly attractive during the cooler months.",
  latitude: 25.93,
  longitude: 88.83,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Nil+Sagar+Nilphamari",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy lake views",
    "Photography",
    "Relax by the water",
    "Bird watching",
  ],
  highlights: [
    "Historic waterbody",
    "Green surroundings",
    "Peaceful environment",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Panchagarh
// ------------------------------------------------------------

createDestination({
  id: "dest-127",
  slug: "tetulia-tea-garden",
  name: "Tetulia Tea Gardens",
  district: "Panchagarh",
  division: "Rangpur",
  category: "Tea Garden",
  shortDescription:
    "A scenic tea-growing landscape in northern Bangladesh near the Himalayas.",
  description:
    "Tetulia is known for its tea gardens and distinctive northern landscape. The combination of green tea fields, open countryside and distant Himalayan views on clear days makes the area an attractive destination.",
  latitude: 26.49,
  longitude: 88.35,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Tetulia+Tea+Garden+Panchagarh",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Explore tea gardens",
    "Enjoy countryside views",
    "Photography",
    "Watch sunrise",
  ],
  highlights: [
    "Tea gardens",
    "Northern landscape",
    "Himalayan views on clear days",
  ],
  popular: true,
  featured: true,
}),

createDestination({
  id: "dest-128",
  slug: "boda-temple-panchagarh",
  name: "Boda Temple Heritage Area",
  district: "Panchagarh",
  division: "Rangpur",
  category: "Historical",
  shortDescription:
    "A cultural heritage destination representing the traditional religious history of Panchagarh.",
  description:
    "The Boda area of Panchagarh contains several cultural and religious heritage locations. Exploring these sites offers visitors a glimpse into the district's traditional architecture and local history.",
  latitude: 26.20,
  longitude: 88.76,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Boda+Panchagarh+Bangladesh",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore local heritage",
    "Photography",
    "Learn about local history",
  ],
  highlights: [
    "Cultural heritage",
    "Religious traditions",
    "Northern Bangladesh",
  ],
}),

// ------------------------------------------------------------
// Rangpur
// ------------------------------------------------------------

createDestination({
  id: "dest-129",
  slug: "tajhat-palace",
  name: "Tajhat Palace",
  district: "Rangpur",
  division: "Rangpur",
  category: "Historical",
  shortDescription:
    "A grand historic palace in Rangpur known for its impressive architecture and museum collection.",
  description:
    "Tajhat Palace is one of the most prominent historical landmarks of Rangpur. The palace's distinctive architecture and museum displays make it an important cultural destination in northern Bangladesh.",
  latitude: 25.70,
  longitude: 89.28,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Tajhat+Palace+Rangpur",
  bestSeason: "October - March",
  openingHours: "Museum hours",
  entryFee: 0,
  estimatedDuration: "2-3 Hours",
  thingsToDo: [
    "Explore the palace",
    "Visit the museum",
    "Admire the architecture",
    "Photography",
  ],
  highlights: [
    "Historic palace",
    "Museum",
    "Architectural heritage",
  ],
  popular: true,
  featured: true,
}),

createDestination({
  id: "dest-130",
  slug: "carmichael-college-rangpur",
  name: "Carmichael College",
  district: "Rangpur",
  division: "Rangpur",
  category: "Historical",
  shortDescription:
    "A historic educational institution known for its heritage architecture and cultural importance.",
  description:
    "Carmichael College is one of the historic educational institutions of Rangpur. Its campus and architecture reflect an important chapter in the educational and cultural history of northern Bangladesh.",
  latitude: 25.75,
  longitude: 89.25,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Carmichael+College+Rangpur",
  bestSeason: "October - March",
  openingHours: "Subject to campus access",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Admire historic architecture",
    "Explore permitted areas",
    "Photography",
  ],
  highlights: [
    "Educational heritage",
    "Historic architecture",
    "Cultural landmark",
  ],
}),

// ------------------------------------------------------------
// Thakurgaon
// ------------------------------------------------------------

createDestination({
  id: "dest-131",
  slug: "balia-mosque",
  name: "Balia Mosque",
  district: "Thakurgaon",
  division: "Rangpur",
  category: "Historical",
  shortDescription:
    "A historic mosque representing the architectural heritage of Thakurgaon.",
  description:
    "Balia Mosque is a local heritage landmark in Thakurgaon that reflects the traditional religious architecture and cultural history of northern Bangladesh.",
  latitude: 26.01,
  longitude: 88.47,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Balia+Mosque+Thakurgaon",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the mosque",
    "Admire the architecture",
    "Photography",
    "Learn about local heritage",
  ],
  highlights: [
    "Historic mosque",
    "Religious architecture",
    "Local heritage",
  ],
}),

createDestination({
  id: "dest-132",
  slug: "haripur-rajbari-thakurgaon",
  name: "Haripur Rajbari",
  district: "Thakurgaon",
  division: "Rangpur",
  category: "Historical",
  shortDescription:
    "A historic zamindar-era heritage site reflecting the architectural history of Thakurgaon.",
  description:
    "Haripur Rajbari is associated with the zamindar-era heritage of Thakurgaon. The historic remains and surrounding landscape provide an opportunity to explore the district's architectural and cultural history.",
  latitude: 25.89,
  longitude: 88.18,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Haripur+Rajbari+Thakurgaon",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the heritage site",
    "Photography",
    "Learn about local history",
  ],
  highlights: [
    "Zamindar heritage",
    "Historic architecture",
    "Local history",
  ],
}),

// ------------------------------------------------------------
// Rangpur Division - Additional
// ------------------------------------------------------------

createDestination({
  id: "dest-133",
  slug: "chilmari-port",
  name: "Chilmari River Port",
  district: "Kurigram",
  division: "Rangpur",
  category: "River",
  shortDescription:
    "A historic river port on the Brahmaputra-Jamuna river system with a strong connection to riverine life.",
  description:
    "Chilmari is a historic river port in Kurigram known for its connection with the Brahmaputra-Jamuna river system. The area provides visitors with an authentic view of northern Bangladesh's river-based communities.",
  latitude: 25.56,
  longitude: 89.67,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Chilmari+River+Port+Kurigram",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Explore the river port",
    "Enjoy river views",
    "Photography",
    "Observe local river life",
  ],
  highlights: [
    "Historic river port",
    "Brahmaputra-Jamuna waterways",
    "Riverine culture",
  ],
  popular: true,
}),
// ============================================================
// MYMENSINGH DIVISION
// ============================================================

// ------------------------------------------------------------
// Jamalpur
// ------------------------------------------------------------

createDestination({
  id: "dest-134",
  slug: "laukathi-eco-park",
  name: "Laukathi River Area",
  district: "Jamalpur",
  division: "Mymensingh",
  category: "River",
  shortDescription:
    "A peaceful riverine landscape showcasing the natural beauty and rural life of Jamalpur.",
  description:
    "The riverine areas of Jamalpur offer visitors an opportunity to experience the waterways, open landscapes and rural lifestyle of northern-central Bangladesh.",
  latitude: 24.92,
  longitude: 89.95,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Jamalpur+River+Bangladesh",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Enjoy riverside views",
    "Photography",
    "Observe local river life",
    "Explore rural surroundings",
  ],
  highlights: [
    "Riverine landscape",
    "Rural Bangladesh",
    "Local waterways",
  ],
}),

createDestination({
  id: "dest-135",
  slug: "laukathi-railway-bridge-jamalpur",
  name: "Jamalpur Railway Bridge Area",
  district: "Jamalpur",
  division: "Mymensingh",
  category: "River",
  shortDescription:
    "A scenic riverside area where transportation infrastructure meets the waterways of Jamalpur.",
  description:
    "The river and railway landscapes around Jamalpur provide an interesting combination of waterways, bridges and local transportation. The area offers opportunities for photography and observing everyday life.",
  latitude: 24.92,
  longitude: 90.42,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Jamalpur+Railway+Bridge",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Enjoy the river scenery",
    "Photography",
    "Observe local transportation",
  ],
  highlights: [
    "River landscape",
    "Railway heritage",
    "Local life",
  ],
}),

// ------------------------------------------------------------
// Mymensingh
// ------------------------------------------------------------

createDestination({
  id: "dest-136",
  slug: "mymensingh-museum",
  name: "Mymensingh Museum",
  district: "Mymensingh",
  division: "Mymensingh",
  category: "Historical",
  shortDescription:
    "A cultural museum preserving archaeological, historical and artistic heritage of the Mymensingh region.",
  description:
    "Mymensingh Museum is an important cultural institution showcasing historical and archaeological materials associated with the region. It provides visitors with an introduction to the cultural heritage of Mymensingh.",
  latitude: 24.75,
  longitude: 90.41,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Mymensingh+Museum",
  bestSeason: "October - March",
  openingHours: "Museum hours",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore museum collections",
    "Learn about regional history",
    "Photography where permitted",
  ],
  highlights: [
    "Regional heritage",
    "Museum collection",
    "Cultural history",
  ],
  popular: true,
}),

createDestination({
  id: "dest-137",
  slug: "shashi-lodge",
  name: "Shashi Lodge",
  district: "Mymensingh",
  division: "Mymensingh",
  category: "Historical",
  shortDescription:
    "A historic palace complex representing the architectural heritage of Mymensingh.",
  description:
    "Shashi Lodge is a prominent historical landmark in Mymensingh. The palace complex and its architectural features reflect the history and cultural heritage of the region.",
  latitude: 24.75,
  longitude: 90.41,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Shashi+Lodge+Mymensingh",
  bestSeason: "October - March",
  openingHours: "Subject to site access",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Explore the historic complex",
    "Admire the architecture",
    "Photography",
    "Learn about local history",
  ],
  highlights: [
    "Historic palace",
    "Architectural heritage",
    "Mymensingh history",
  ],
  popular: true,
}),

createDestination({
  id: "dest-138",
  slug: "zainul-abedin-park",
  name: "Zainul Abedin Park",
  district: "Mymensingh",
  division: "Mymensingh",
  category: "Nature",
  shortDescription:
    "A riverside recreational area along the Brahmaputra offering greenery and open space.",
  description:
    "Zainul Abedin Park is a popular recreational area in Mymensingh associated with the city's riverside landscape. Its open spaces and proximity to the Brahmaputra make it a pleasant destination for relaxation.",
  latitude: 24.76,
  longitude: 90.40,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Zainul+Abedin+Park+Mymensingh",
  bestSeason: "October - March",
  openingHours: "Daylight and evening",
  entryFee: 0,
  estimatedDuration: "1-2 Hours",
  thingsToDo: [
    "Walk around the park",
    "Enjoy riverside scenery",
    "Photography",
    "Relax in nature",
  ],
  highlights: [
    "Riverside park",
    "Brahmaputra scenery",
    "Urban greenery",
  ],
  popular: true,
}),

// ------------------------------------------------------------
// Netrokona
// ------------------------------------------------------------

createDestination({
  id: "dest-139",
  slug: "birishiri-durgapur",
  name: "Birishiri",
  district: "Netrokona",
  division: "Mymensingh",
  category: "Nature",
  shortDescription:
    "A scenic destination in Durgapur known for hills, rivers and distinctive natural landscapes.",
  description:
    "Birishiri in Durgapur is one of Netrokona's best-known tourist areas. The region features hills, rivers, indigenous cultural heritage and striking natural scenery.",
  latitude: 25.12,
  longitude: 90.69,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Birishiri+Durgapur+Netrokona",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "1 Day",
  thingsToDo: [
    "Explore the natural landscape",
    "Enjoy river views",
    "Photography",
    "Explore local culture",
  ],
  highlights: [
    "Scenic landscape",
    "River and hills",
    "Cultural heritage",
  ],
  popular: true,
  featured: true,
}),

createDestination({
  id: "dest-140",
  slug: "someshwari-river",
  name: "Someshwari River",
  district: "Netrokona",
  division: "Mymensingh",
  category: "River",
  shortDescription:
    "A scenic river flowing through the Durgapur region and surrounded by hills and rural landscapes.",
  description:
    "The Someshwari River is one of the defining natural features of Durgapur, Netrokona. Its clear water, surrounding hills and riverside landscapes make it a popular destination for nature lovers.",
  latitude: 25.10,
  longitude: 90.68,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Someshwari+River+Netrokona",
  bestSeason: "November - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Enjoy river views",
    "Photography",
    "Explore the riverside",
    "Enjoy the surrounding hills",
  ],
  highlights: [
    "Scenic river",
    "Hill landscape",
    "Clear water",
    "Rural scenery",
  ],
  popular: true,
}),

createDestination({
  id: "dest-141",
  slug: "china-mati-pahar",
  name: "China Matir Pahar",
  district: "Netrokona",
  division: "Mymensingh",
  category: "Hill",
  shortDescription:
    "A distinctive hilly landscape near Durgapur known for colorful soil and scenic surroundings.",
  description:
    "China Matir Pahar is a notable natural landscape in the Durgapur area of Netrokona. The area's distinctive soil formations, hills and surrounding greenery attract visitors interested in photography and nature.",
  latitude: 25.13,
  longitude: 90.70,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=China+Matir+Pahar+Netrokona",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "2-4 Hours",
  thingsToDo: [
    "Explore the hills",
    "Photography",
    "Enjoy the landscape",
    "Explore nearby villages",
  ],
  highlights: [
    "Distinctive soil formations",
    "Hilly landscape",
    "Natural scenery",
  ],
}),

// ------------------------------------------------------------
// Sherpur
// ------------------------------------------------------------

createDestination({
  id: "dest-142",
  slug: "gajni-obokash-kendra",
  name: "Gajni Obokash Kendra",
  district: "Sherpur",
  division: "Mymensingh",
  category: "Nature",
  shortDescription:
    "A popular recreational destination surrounded by hills and greenery in Sherpur.",
  description:
    "Gajni Obokash Kendra is a well-known recreational destination in Sherpur's hilly region. The area combines forests, hills, ponds and open spaces for visitors seeking a nature-focused outing.",
  latitude: 25.06,
  longitude: 90.02,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Gajni+Obokash+Kendra+Sherpur",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Explore the hills",
    "Enjoy nature",
    "Photography",
    "Relax in the recreational area",
  ],
  highlights: [
    "Hilly landscape",
    "Green surroundings",
    "Recreational destination",
  ],
  popular: true,
  featured: true,
}),

createDestination({
  id: "dest-143",
  slug: "madhutila-eco-park",
  name: "Madhutila Eco Park",
  district: "Sherpur",
  division: "Mymensingh",
  category: "Forest",
  shortDescription:
    "A forest-based eco-tourism destination surrounded by hills and natural greenery.",
  description:
    "Madhutila Eco Park is a popular nature destination in Sherpur featuring forest landscapes, hills and recreational facilities. It provides visitors with an accessible way to experience the natural environment of the region.",
  latitude: 25.09,
  longitude: 90.04,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Madhutila+Eco+Park+Sherpur",
  bestSeason: "October - March",
  openingHours: "Daylight hours",
  entryFee: 0,
  estimatedDuration: "Half Day",
  thingsToDo: [
    "Explore forest areas",
    "Enjoy nature",
    "Photography",
    "Family recreation",
  ],
  highlights: [
    "Eco-park",
    "Forest landscape",
    "Hills and greenery",
  ],
  popular: true,
}),

];