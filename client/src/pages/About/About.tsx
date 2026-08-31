import Container from "../../components/ui/Container";

const About = () => {
  return (
    <section className="py-20 min-h-screen bg-gray-50">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-blue-700">
            About TripDaoBD
          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-8">
            TripDaoBD is Bangladesh's Digital Travel & Tourism Ecosystem.
            Our mission is to help travelers discover destinations,
            hotels, transportation, restaurants, emergency services,
            and local experiences through one smart platform.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default About;