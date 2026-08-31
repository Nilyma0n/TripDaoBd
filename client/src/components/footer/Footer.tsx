import Container from "../ui/Container";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">
      <Container>
        <div className="grid md:grid-cols-4 gap-10 py-16">

          <div>
            <h2 className="text-3xl font-bold text-white">
              🌍 TripDaoBD
            </h2>

            <p className="mt-4 text-gray-400">
              Bangladesh's Digital Travel & Tourism Ecosystem.
              Discover destinations, hotels, restaurants,
              transport and emergency services from one platform.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Explore</h3>

            <ul className="space-y-2">
              <li>Destinations</li>
              <li>Hotels</li>
              <li>Restaurants</li>
              <li>Transport</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">
              Company
            </h3>

            <ul className="space-y-2">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">
              Contact
            </h3>

            <p>Sylhet, Bangladesh</p>
            <p>support@tripdaobd.com</p>
            <p>+880 1700-000000</p>
          </div>

        </div>

        <div className="border-t border-slate-700 py-6 text-center text-sm text-gray-400">
          © 2026 TripDaoBD. Made by Nilyma. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;