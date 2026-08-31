import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://beautifulbangladesh.gov.bd/storage/backend/images/upload/thumbnil/nilgiri-2020-06-07-5edc99c426aa6.jpeg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
        <div className="max-w-3xl text-white">

          <p className="uppercase tracking-[4px] text-yellow-400 font-semibold">
            Welcome to TripDaoBD
          </p>

          <h1 className="mt-5 text-6xl font-extrabold leading-tight">
            Explore the Beauty of Bangladesh
          </h1>

          <p className="mt-6 text-xl text-gray-200 leading-8">
            Discover breathtaking beaches, tea gardens,
            hills, forests, islands and historical places.
            Plan your journey, book hotels, explore transport
            and travel safely—all from one platform.
          </p>

          <div className="flex gap-5 mt-10">

<Link
  to="/explore"
  className="bg-blue-700 hover:bg-blue-800 px-8 py-4 rounded-full font-semibold"
>
  Explore Now
</Link>

            <Link
              to="/features"
              className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-semibold duration-300"
            >
              Learn More
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;