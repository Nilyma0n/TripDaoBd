import type { EmergencyService } from "../../types/emergency";

import hospitalImg from "../../assets/images/emergency/hospital.jpg";
import policeImg from "../../assets/images/emergency/police.jpg";
import fireImg from "../../assets/images/emergency/fire-service.jpg";
import touristPoliceImg from "../../assets/images/emergency/tourist-police.jpg";
import ambulanceImg from "../../assets/images/emergency/ambulance.jpg";

export const emergencyServices: EmergencyService[] = [
  {
    id: "em-001",
    slug: "coxs-bazar-sadar-hospital",
    name: "Cox's Bazar District Sadar Hospital",
    type: "Hospital",
    district: "Cox's Bazar",
    division: "Chattogram",
    address: "Main Road, Cox's Bazar",
    phone: "+8801711000001",
    email: "hospital@example.com",
    website: "https://example.com",
    latitude: 21.4272,
    longitude: 92.0058,
    mapUrl: "https://maps.google.com/?q=21.4272,92.0058",
    image: hospitalImg,
    description:
      "Government hospital providing emergency medical services 24 hours a day.",
    available24Hours: true,
    featured: true,
  },

  {
    id: "em-002",
    slug: "coxs-bazar-police",
    name: "Cox's Bazar Police Station",
    type: "Police",
    district: "Cox's Bazar",
    division: "Chattogram",
    address: "Police Plaza, Cox's Bazar",
    phone: "999",
    latitude: 21.4300,
    longitude: 92.0080,
    mapUrl: "https://maps.google.com/?q=21.4300,92.0080",
    image: policeImg,
    description:
      "Police station serving tourists and local residents.",
    available24Hours: true,
    featured: true,
  },

  {
    id: "em-003",
    slug: "coxs-bazar-fire-service",
    name: "Fire Service & Civil Defence",
    type: "Fire Service",
    district: "Cox's Bazar",
    division: "Chattogram",
    address: "Fire Station Road",
    phone: "16163",
    latitude: 21.4350,
    longitude: 92.0120,
    mapUrl: "https://maps.google.com/?q=21.4350,92.0120",
    image: fireImg,
    description:
      "Emergency fire rescue and disaster response service.",
    available24Hours: true,
    featured: true,
  },

  {
    id: "em-004",
    slug: "tourist-police-coxs-bazar",
    name: "Tourist Police Cox's Bazar",
    type: "Tourist Police",
    district: "Cox's Bazar",
    division: "Chattogram",
    address: "Laboni Beach Area",
    phone: "+8801711000004",
    latitude: 21.4250,
    longitude: 92.0065,
    mapUrl: "https://maps.google.com/?q=21.4250,92.0065",
    image: touristPoliceImg,
    description:
      "Special police unit dedicated to tourist safety.",
    available24Hours: true,
    featured: true,
  },

  {
    id: "em-005",
    slug: "ambulance-coxs-bazar",
    name: "Emergency Ambulance Service",
    type: "Ambulance",
    district: "Cox's Bazar",
    division: "Chattogram",
    address: "Central Medical Point",
    phone: "1994",
    latitude: 21.4280,
    longitude: 92.0075,
    mapUrl: "https://maps.google.com/?q=21.4280,92.0075",
    image: ambulanceImg,
    description:
      "24-hour ambulance support for medical emergencies.",
    available24Hours: true,
    featured: false,
  },
];