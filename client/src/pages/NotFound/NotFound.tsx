import { Link } from "react-router-dom";
import { Compass, Home } from "lucide-react";
import Container from "../../components/ui/Container";

const NotFound = () => {
  return (
    <section className="py-24 min-h-screen bg-gray-50 flex items-center">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 text-blue-700 rounded-full p-5">
              <Compass size={48} strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-7xl font-bold text-blue-700">404</h1>

          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            Page Not Found
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            Mone hocche tumi je route-ta khujcho seta exist kore na, ba
            move kora hoyeche. Chalo tomake abar right pothe niye jai.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 duration-300 text-white px-6 py-3 rounded-xl font-semibold"
            >
              <Home size={18} />
              Back to Home
            </Link>

            <Link
              to="/explore"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 duration-300 text-blue-700 border border-blue-200 px-6 py-3 rounded-xl font-semibold"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;