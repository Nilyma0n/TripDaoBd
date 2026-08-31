import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const hotels = [
  {
    id: 1,
    name: "Sea Pearl Beach Resort",
    place: "Cox's Bazar",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  {
    id: 2,
    name: "Grand Sultan Resort",
    place: "Sreemangal",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  },
  {
    id: 3,
    name: "Hotel Rose View",
    place: "Sylhet",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
  },
];

const PopularHotels = () => {
  return (
    <section className="py-20 bg-gray-50">
      <Container>

        <SectionTitle
          title="Popular Hotels"
          subtitle="Best rated hotels across Bangladesh"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {hotels.map((hotel) => (

            <div
              key={hotel.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={hotel.image}
                className="h-60 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold">
                  {hotel.name}
                </h3>

                <p className="text-gray-500">
                  📍 {hotel.place}
                </p>
              </div>

            </div>

          ))}

        </div>

      </Container>
    </section>
  );
};

export default PopularHotels;