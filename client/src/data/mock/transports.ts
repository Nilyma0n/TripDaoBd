import type { Transport } from "../../types/transport";

import bus from "../../assets/images/transports/bus.jpg";
import train from "../../assets/images/transports/train.jpg";
import flight from "../../assets/images/transports/flight.jpg";
import launch from "../../assets/images/transports/launch.jpg";
import car from "../../assets/images/transports/car.jpg";

export const transports: Transport[] = [
  {
    id: "transport-001",
    slug: "green-line",

    name: "Green Line Paribahan",

    type: "Bus",

    company: "Green Line",

    from: "Dhaka",
    to: "Cox's Bazar",

    duration: "10 Hours",

    departureTime: "10:00 PM",

    arrivalTime: "08:00 AM",

    price: 1800,

    rating: 4.7,

    totalReviews: 980,

    image: bus,

    gallery: [bus],

    amenities: [
      "AC",
      "WiFi",
      "Charging Port",
      "Water"
    ],

    description:
      "Premium AC coach service from Dhaka to Cox's Bazar.",

    bookingUrl: "https://greenlinebd.com",
    mapUrl: "https://www.google.com/maps?q=Dhaka+Cox's+Bazar",

    featured: true,
  },

  {
    id: "transport-002",
    slug: "parabat-express",

    name: "Parabat Express",

    type: "Train",

    company: "Bangladesh Railway",

    from: "Dhaka",

    to: "Sylhet",

    duration: "7 Hours",

    departureTime: "06:30 AM",

    arrivalTime: "01:30 PM",

    price: 780,

    rating: 4.6,

    totalReviews: 680,

    image: train,

    gallery: [train],

    amenities: [
      "AC Cabin",
      "Food",
      "Charging"
    ],

    description:
      "Intercity train service between Dhaka and Sylhet.",

    bookingUrl: "https://eticket.railway.gov.bd",
    mapUrl: "https://www.google.com/maps?q=Dhaka+Cox's+Bazar",

    featured: true,
  },

  {
    id: "transport-003",
    slug: "biman-dhaka-sylhet",

    name: "Biman Bangladesh",

    type: "Flight",

    company: "Biman Bangladesh Airlines",

    from: "Dhaka",

    to: "Sylhet",

    duration: "50 Minutes",

    departureTime: "09:00 AM",

    arrivalTime: "09:50 AM",

    price: 5200,

    rating: 4.8,

    totalReviews: 540,

    image: flight,

    gallery: [flight],

    amenities: [
      "Meal",
      "20kg Baggage"
    ],

    description:
      "Domestic flight operated by Biman Bangladesh Airlines.",

    bookingUrl: "https://www.biman-airlines.com",

    mapUrl: "https://www.google.com/maps?q=Dhaka+Cox's+Bazar",

    featured: true,
  },

  {
    id: "transport-004",
    slug: "sundarban-launch",

    name: "Sundarban Launch",

    type: "Launch",

    company: "Sundarban Navigation",

    from: "Dhaka",

    to: "Barishal",

    duration: "8 Hours",

    departureTime: "09:00 PM",

    arrivalTime: "05:00 AM",

    price: 1300,

    rating: 4.4,

    totalReviews: 300,

    image: launch,

    gallery: [launch],

    amenities: [
      "Cabin",
      "Restaurant"
    ],

    description:
      "Comfortable overnight launch service.",

    bookingUrl: "https://biwta.gov.bd",

    mapUrl: "https://www.google.com/maps?q=Dhaka+Cox's+Bazar",

    featured: false,
  },

  {
    id: "transport-005",
    slug: "tripdao-car-rental",

    name: "TripDaoBD Car Rental",

    type: "Car Rental",

    company: "TripDaoBD",

    from: "Anywhere",

    to: "Anywhere",

    duration: "Flexible",

    departureTime: "-",

    arrivalTime: "-",

    price: 5000,

    rating: 4.9,

    totalReviews: 120,

    image: car,

    gallery: [car],

    amenities: [
      "Driver",
      "AC",
      "Fuel Included"
    ],

    description:
      "Private car rental for tours anywhere in Bangladesh.",

    bookingUrl: "#",
    mapUrl: "https://www.google.com/maps?q=Dhaka+Cox's+Bazar",

    featured: true,
  }
];