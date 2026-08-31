import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import DestinationCard from "./DestinationCard";
import { destinations } from "../../data/mock/destinations";

const FeaturedDestinations = () => {
  return (
    <section className="py-20 bg-white">
      <Container>

        <SectionTitle
          title="Featured Destinations"
          subtitle="Discover Bangladesh's most beautiful places"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {destinations
            .filter((destination) => destination.featured)
            .slice(0, 9)
            .map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
        </div>

      </Container>
    </section>
  );
};

export default FeaturedDestinations;