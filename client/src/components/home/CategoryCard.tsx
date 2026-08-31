import type { Category } from "../../types/category";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
      <div className="text-5xl">{category.icon}</div>

      <h3 className="mt-4 text-xl font-bold">
        {category.name}
      </h3>

      <p className="mt-2 text-gray-500">
        {category.totalPlaces} Places
      </p>
    </div>
  );
};

export default CategoryCard;