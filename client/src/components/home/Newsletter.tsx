import { Link } from "react-router-dom";
import Container from "../ui/Container";

const Newsletter = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-700 to-blue-700 text-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-4xl font-bold">
            Stay Updated with TripDaoBD
          </h2>

          <p className="mt-5 text-lg text-gray-100">
            Receive travel inspiration, exclusive offers, destination guides,
            and important travel updates directly in your inbox.
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-xl text-gray-900 outline-none"
            />

            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-xl duration-300">
              Subscribe
            </button>

          </div>

          <div className="mt-8">
            <Link
              to="/newsletter"
              className="underline hover:text-yellow-300 duration-300"
            >
              Learn more about our Newsletter →
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default Newsletter;