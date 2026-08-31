import Container from "../../components/ui/Container";

const NewsletterPage = () => {
  return (
    <section className="py-20 min-h-screen bg-sky-50">
      <Container>

        <div className="max-w-3xl mx-auto text-center">

          <h1 className="text-5xl font-bold text-blue-700">
            Newsletter
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Stay connected with TripDaoBD and receive travel updates,
            exclusive offers, festival information, hotel discounts,
            and tourism news directly in your inbox.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 mt-12">

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-xl px-5 py-4"
            />

            <button className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-semibold">
              Subscribe
            </button>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default NewsletterPage;