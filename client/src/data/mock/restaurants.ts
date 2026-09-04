export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  district: string;
  division: string;
  destination: string;
  cuisine: string[];
  description: string;
  image: string;
  rating: number;
  totalReviews: number;
  priceRange: string;
  openingHours: string;
  mapUrl: string;
  featured: boolean;
}

export const restaurants: Restaurant[] = [
  {
    id: "restaurant-001",
    slug: "the-red-pear-cafe",
    name: "The Red Pear Cafe",
    district: "Dhaka",
    division: "Dhaka",
    destination: "dhaka",
    cuisine: ["Cafe", "Italian", "Dessert"],
    description:
      "A cozy cafe with handcrafted coffee, light bites, and a comfortable rooftop ambiance.",
    image: "/images/restaurants/red-pear.jpg",
    rating: 4.8,
    totalReviews: 420,
    priceRange: "৳ 800-1500",
    openingHours: "10:00 AM - 11:00 PM",
    mapUrl: "https://www.google.com/maps?q=Dhaka+Bangladesh",
    featured: true,
  },
  {
    id: "restaurant-002",
    slug: "bengal-bistro",
    name: "Bengal Bistro",
    district: "Chattogram",
    division: "Chattogram",
    destination: "chattogram",
    cuisine: ["Bangla", "Seafood", "Grill"],
    description:
      "Popular for traditional Bangla dishes and fresh seafood served in a lively family setting.",
    image: "/images/restaurants/bengal-bistro.jpg",
    rating: 4.7,
    totalReviews: 390,
    priceRange: "৳ 900-1800",
    openingHours: "12:00 PM - 10:30 PM",
    mapUrl: "https://www.google.com/maps?q=Chattogram+Bangladesh",
    featured: true,
  },
  {
    id: "restaurant-003",
    slug: "sundarbans-fish-house",
    name: "Sundarbans Fish House",
    district: "Khulna",
    division: "Khulna",
    destination: "khulna",
    cuisine: ["Seafood", "Local", "BBQ"],
    description:
      "A riverside favorite serving rich local flavors, grilled fish, and signature Bengali preparations.",
    image: "/images/restaurants/sundarbans-fish-house.jpg",
    rating: 4.6,
    totalReviews: 280,
    priceRange: "৳ 700-1600",
    openingHours: "11:30 AM - 11:00 PM",
    mapUrl: "https://www.google.com/maps?q=Khulna+Bangladesh",
    featured: false,
  },
  {
    id: "restaurant-004",
    slug: "himalayan-hut",
    name: "Himalayan Hut",
    district: "Sylhet",
    division: "Sylhet",
    destination: "sylhet",
    cuisine: ["Tea House", "Snacks", "South Asian"],
    description:
      "Enjoy aromatic tea, local snacks, and mountain-view dining in a tranquil hill atmosphere.",
    image: "/images/restaurants/himalayan-hut.jpg",
    rating: 4.9,
    totalReviews: 510,
    priceRange: "৳ 500-1200",
    openingHours: "9:00 AM - 9:00 PM",
    mapUrl: "https://www.google.com/maps?q=Sylhet+Bangladesh",
    featured: true,
  },
  {
    id: "restaurant-005",
    slug: "cox-bazar-sea-breeze",
    name: "Cox's Bazar Sea Breeze",
    district: "Cox's Bazar",
    division: "Chattogram",
    destination: "coxs-bazar",
    cuisine: ["Seafood", "Bangla", "Family Dining"],
    description:
      "A beachside dining spot offering fresh seafood, ocean views, and classic Bangla hospitality.",
    image: "/images/restaurants/sea-breeze.jpg",
    rating: 4.8,
    totalReviews: 640,
    priceRange: "৳ 1000-2200",
    openingHours: "10:00 AM - 10:30 PM",
    mapUrl: "https://www.google.com/maps?q=Coxs+Bazar+Bangladesh",
    featured: true,
  },
  {
    id: "restaurant-006",
    slug: "lalbagh-plate",
    name: "Lalbagh Plate",
    district: "Rajshahi",
    division: "Rajshahi",
    destination: "rajshahi",
    cuisine: ["Biryani", "Kebab", "North Indian"],
    description:
      "An elegant restaurant for biryani lovers, kebabs, and a relaxed evening meal with friends.",
    image: "/images/restaurants/lalbagh-plate.jpg",
    rating: 4.5,
    totalReviews: 250,
    priceRange: "৳ 800-1700",
    openingHours: "12:00 PM - 11:00 PM",
    mapUrl: "https://www.google.com/maps?q=Rajshahi+Bangladesh",
    featured: false,
  },
];
