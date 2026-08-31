import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const TravelBlog = () => {
  return (
    <section className="py-20">
      <Container>

        <SectionTitle
          title="Latest Travel Guides"
          subtitle="Tips for your next journey"
        />

        <div className="grid md:grid-cols-3 gap-8">

          {[1,2,3].map((item)=>(

            <div
              key={item}
              className="bg-white rounded-xl shadow-lg p-6"
            >

              <h3 className="font-bold text-xl">
                Travel Guide #{item}
              </h3>

              <p className="mt-3 text-gray-600">
                Discover hidden places and travel tips around Bangladesh.
              </p>

            </div>

          ))}

        </div>

      </Container>
    </section>
  );
};

export default TravelBlog;