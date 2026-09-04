import { ArrowRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";

const stories = [
  {
    title: "A Complete Guide to Cox's Bazar",
    category: "Travel Guide",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1602303611362-3d0d1f6e8f91?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Hidden Gems of Bangladesh",
    category: "Inspiration",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Essential Tips for Your Next Trip",
    category: "Travel Tips",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=85",
  },
];

const TravelBlog = () => {
  return (
    <section className="bg-[#f7f5ef] py-20 sm:py-24">
      <Container>

        {/* HEADER */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-[#e99a36]" />

              <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#1f5b43]">
                Need Inspiration?
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#172c23] sm:text-4xl">
              Travel Stories & Guides
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Get travel ideas, destination guides and useful tips for
              exploring Bangladesh.
            </p>
          </div>

          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 self-start text-sm font-bold text-[#1f5b43] sm:self-auto"
          >
            Read All Stories

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* STORIES */}
        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <Link
              key={story.title}
              to="/blog"
              className="group overflow-hidden rounded-[24px] border border-[#e8e6de] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(20,50,35,0.12)]"
            >
              {/* IMAGE */}
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#1f5b43]">
                  {story.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-lg font-bold leading-6 text-[#1d3128] transition-colors group-hover:text-[#1f5b43]">
                  {story.title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  <Clock3 size={14} />

                  {story.readTime}
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#1f5b43]">
                  Read Story

                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </Container>
    </section>
  );
};

export default TravelBlog;