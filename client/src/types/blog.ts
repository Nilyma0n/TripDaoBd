export interface Blog {
  id: string;
  slug: string;

  title: string;

  excerpt: string;

  content: string;

  image: string;

  author: string;

  publishedDate: string;

  readingTime: string;

  category:
    | "Travel Guide"
    | "Food"
    | "Adventure"
    | "Culture"
    | "Safety"
    | "Tips";

  destination?: string;

  featured: boolean;
}