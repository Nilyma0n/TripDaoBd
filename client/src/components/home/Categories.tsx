import Container from "../ui/Container";
import {
  Waves,
  Mountain,
  Trees,
  Landmark,
  TreePalm,
  Sailboat,
  Church,
  Droplets,
} from "lucide-react";

const categories = [
  {
    title: "Beach",
    icon: <Waves size={40} />,
  },
  {
    title: "Mountain",
    icon: <Mountain size={40} />,
  },
  {
    title: "Forest",
    icon: <Trees size={40} />,
  },
  {
    title: "Historical",
    icon: <Landmark size={40} />,
  },
  {
    title: "Island",
    icon: <TreePalm size={40} />,
  },
  {
    title: "River",
    icon: <Sailboat size={40} />,
  },
  {
    title: "Religious",
    icon: <Church size={40} />,
  },
  {
    title: "Waterfall",
    icon: <Droplets size={40} />,
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Explore by Category
          </h2>

          <p className="text-gray-600 mt-3">
            Find destinations based on your travel interests.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 text-center cursor-pointer"
            >
              <div className="flex justify-center text-blue-700 mb-4">
                {category.icon}
              </div>

              <h3 className="font-semibold text-lg">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Categories;