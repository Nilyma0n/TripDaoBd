import Container from "../ui/Container";

const stats = [
  {
    number: "64+",
    title: "Districts Covered",
  },
  {
    number: "300+",
    title: "Tourist Destinations",
  },
  {
    number: "500+",
    title: "Hotels & Resorts",
  },
  {
    number: "10K+",
    title: "Happy Travelers",
  },
];

const Stats = () => {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="text-center bg-gray-50 rounded-2xl p-8 shadow hover:shadow-lg transition"
            >
              <h2 className="text-4xl font-bold text-blue-700">
                {item.number}
              </h2>

              <p className="mt-2 text-gray-600 font-medium">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Stats;