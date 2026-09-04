import {
  Waves,
  Mountain,
  Trees,
  Landmark,
  TreePalm,
  Sailboat,
  Church,
  Droplets,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import { categories } from "../../data/mock/categories";

const iconMap: Record<string, React.ElementType> = {
  Beach: Waves,
  Mountain: Mountain,
  Forest: Trees,
  Historical: Landmark,
  "Tea Garden": Trees,
  Island: TreePalm,
  Haor: Sailboat,
  Waterfall: Droplets,
  Religious: Church,
};

const Categories = () => {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>

        {/* ================= HEADER ================= */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-[#e99a36]" />

              <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#1f5b43]">
                Find Your Experience
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#172c23] sm:text-4xl">
              Explore by Category
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Choose what inspires you and discover the perfect place to
              explore.
            </p>
          </div>

          <Link
            to="/explore"
            className="group inline-flex items-center gap-2 self-start text-sm font-bold text-[#1f5b43] sm:self-auto"
          >
            Explore All

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ================= CATEGORY LIST ================= */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">

          {categories.map((category) => {
            const Icon = iconMap[category.name] || Landmark;

            return (
              <Link
                key={category.id}
                to={`/explore?category=${encodeURIComponent(category.name)}`}
                className="group flex min-h-[145px] flex-col items-center justify-center rounded-[22px] border border-[#e9e9e3] bg-[#fbfbf8] px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#cfded4] hover:bg-[#edf3ee] hover:shadow-[0_12px_30px_rgba(20,60,40,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1f5b43] shadow-sm transition-all duration-300 group-hover:bg-[#1f5b43] group-hover:text-white">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <h3 className="mt-4 text-sm font-bold text-[#25372e]">
                  {category.name}
                </h3>

                <p className="mt-1 text-[10px] text-gray-400">
                  {category.totalPlaces} places
                </p>
              </Link>
            );
          })}

        </div>

      </Container>
    </section>
  );
};

export default Categories;