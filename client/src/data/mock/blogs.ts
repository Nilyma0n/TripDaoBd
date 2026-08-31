import type { Blog } from "../../types/blog";

import coxImage from "../../assets/images/blogs/coxs-bazar-guide.jpg";

export const blogs: Blog[] = [
  {
    id: "blog-001",

    slug: "coxs-bazar-travel-guide",

    title: "Complete Cox's Bazar Travel Guide",

    excerpt:
      "Everything you need to know before visiting Cox's Bazar.",

    content:
      "Cox's Bazar is the world's longest natural sea beach. This guide covers hotels, transportation, foods, nearby attractions and travel tips.",

    image: coxImage,

    author: "TripDaoBD",

    publishedDate: "2026-08-01",

    readingTime: "6 min",

    category: "Travel Guide",

    destination: "Cox's Bazar",

    featured: true,
  },
];