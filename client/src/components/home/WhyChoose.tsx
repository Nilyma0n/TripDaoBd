import Container from "../ui/Container";
import {
  FaMapMarkedAlt,
  FaRobot,
  FaHotel,
  FaShieldAlt,
  FaCloudSun,
  FaWallet,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <FaMapMarkedAlt size={40} />,
    title: "Explore All 64 Districts",
    description:
      "Discover beaches, hills, tea gardens, historical sites, islands, forests and hidden gems across Bangladesh.",
  },
  {
    icon: <FaRobot size={40} />,
    title: "AI Travel Assistant",
    description:
      "Receive smart destination recommendations, travel plans and personalized suggestions.",
  },
  {
    icon: <FaHotel size={40} />,
    title: "Hotels & Accommodation",
    description:
      "Search verified hotels, resorts and guest houses with ratings and reviews.",
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: "Travel Safely",
    description:
      "Quickly access emergency contacts, hospitals, police stations and travel safety information.",
  },
  {
    icon: <FaCloudSun size={40} />,
    title: "Live Weather Updates",
    description:
      "Check weather forecasts before planning your trip to avoid unexpected conditions.",
  },
  {
    icon: <FaWallet size={40} />,
    title: "Budget Friendly Planning",
    description:
      "Estimate transportation, accommodation and food expenses before you travel.",
  },
];

const WhyChoose = () => {
  return (
    <section className="py-24 bg-gray-50">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Why Choose TripDaoBD?
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            TripDaoBD brings together everything you need for exploring
            Bangladesh—from discovering destinations to planning trips,
            finding hotels, staying safe, and making your journey easier.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="text-blue-700 mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/features"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition duration-300"
          >
            Explore All Features →
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default WhyChoose;