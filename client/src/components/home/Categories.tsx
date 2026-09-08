import {
  Waves,
  Mountain,
  Trees,
  Landmark,
  Coffee,
  Droplets,
  CircleDot,
} from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";
import { categories } from "../../data/mock/categories";

const iconMap = {
  Beach: Waves,
  Mountain,
  Forest: Trees,
  Historical: Landmark,
  "Tea Garden": Coffee,
  Haor: Droplets,
  Waterfall: Droplets,
};

const fallbackIcon = CircleDot;

const Categories = () => {
  return (
    <section className="bg-white py-20 md:py-24">
      <Container>

        {/* ================= HEADER ================= */}

        <div className="mx-auto max-w-2xl text-center">

          <span className="text-xs font-bold uppercase tracking-[1.8px] text-[#e99a36]">
            Find your experience
          </span>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#26382f] sm:text-4xl">
            Explore by Category
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500 md:text-base">
            Choose the kind of experience you want and discover places
            around Bangladesh.
          </p>

        </div>

        {/* ================= CATEGORY GRID ================= */}

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-8">

          {categories.map((category) => {
            const Icon =
              iconMap[
                category.name as keyof typeof iconMap
              ] || fallbackIcon;

            return (
              <Link
                key={category.id}
                to={`/explore?category=${encodeURIComponent(
                  category.name
                )}`}
                className="group flex flex-col items-center text-center"
              >

                {/* ICON */}

                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#e4e2d9] bg-[#faf9f5] text-[#1f5b43] shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-[#d5e1d8] group-hover:bg-[#edf3ee] group-hover:shadow-md sm:h-[86px] sm:w-[86px]">

                  <Icon
                    size={28}
                    strokeWidth={1.5}
                  />

                </div>

                {/* NAME */}

                <h3 className="mt-4 text-sm font-bold text-[#33453b] transition group-hover:text-[#1f5b43]">
                  {category.name}
                </h3>

              </Link>
            );
          })}

        </div>

      </Container>
    </section>
  );
};

export default Categories;