import Container from "../ui/Container";

const EmergencySection = () => {
  return (
    <section className="bg-red-600 py-16 text-white">

      <Container>

        <h2 className="text-4xl font-bold">
          Emergency Support
        </h2>

        <p className="mt-4">
          Need immediate assistance while traveling?
        </p>

        <button className="mt-8 bg-white text-red-600 px-8 py-3 rounded-xl font-bold">
          Emergency Contacts
        </button>

      </Container>

    </section>
  );
};

export default EmergencySection;