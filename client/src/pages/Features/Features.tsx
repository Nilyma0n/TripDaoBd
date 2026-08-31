import Container from "../../components/ui/Container";

const featureList = [
  {
    title: "Explore 64 Districts",
    description:
      "Discover attractions, historical places, beaches, mountains, forests and hidden gems across Bangladesh.",
  },
  {
    title: "Smart Destination Search",
    description:
      "Search destinations by district, division, category or season.",
  },
  {
    title: "Hotel & Resort Booking",
    description:
      "Find the best hotels and accommodations with ratings and reviews.",
  },
  {
    title: "Travel Blogs",
    description:
      "Read travel experiences and guides written by travelers.",
  },
  {
    title: "Emergency Support",
    description:
      "Access emergency contacts, hospitals and police stations nearby.",
  },
  {
    title: "Weather Updates",
    description:
      "View live weather information before starting your journey.",
  },
  {
    title: "AI Travel Assistant",
    description:
      "Receive personalized travel recommendations and trip planning.",
  },
  {
    title: "Travel Budget Planner",
    description:
      "Estimate transportation, hotel and food expenses before travelling.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold">
            TripDaoBD Features
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            Everything you need to explore Bangladesh from one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl duration-300"
            >
              <h2 className="text-2xl font-bold text-blue-700">
                {feature.title}
              </h2>

              <p className="mt-4 text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;