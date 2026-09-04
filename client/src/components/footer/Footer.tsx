import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Globe,
} from "lucide-react";
import Container from "../ui/Container";

const Footer = () => {
  return (
    <footer className="border-t border-[#deded6] bg-[#f7f5ef]">

      {/* =====================================================
          NEWSLETTER
      ===================================================== */}
      <section className="border-b border-[#deded6] bg-white py-14 sm:py-16">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            {/* Text */}
            <div className="max-w-xl">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[2.5px] text-[#1f5b43]">
                Stay Inspired
              </p>

              <h2 className="text-2xl font-extrabold tracking-tight text-[#172c23] sm:text-3xl">
                Get travel inspiration in your inbox
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Discover new destinations, travel tips and special offers
                from TripDaoBD.
              </p>
            </div>

            {/* Email Form */}
            <div className="w-full max-w-md">
              <div className="flex rounded-full border border-[#deded6] bg-[#f9f9f6] p-1.5 focus-within:border-[#1f5b43]">

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-transparent px-4 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  className="flex shrink-0 items-center gap-2 rounded-full bg-[#1f5b43] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#174a36]"
                >
                  Subscribe
                  <ArrowRight size={14} />
                </button>

              </div>
            </div>

          </div>
        </Container>
      </section>


      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}
      <div className="py-14 sm:py-16">
        <Container>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

            {/* =================================================
                BRAND
            ================================================= */}
            <div className="max-w-sm">

              {/* Logo */}
              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e7efe9]">
                  <MapPin
                    size={22}
                    className="text-[#1f5b43]"
                  />
                </div>

                <div>
                  <div className="text-xl font-extrabold tracking-tight text-[#173c2d]">
                    TripDaoBD
                  </div>

                  <div className="mt-1 text-[8px] font-semibold tracking-[2px] text-gray-400">
                    EXPLORE • DREAM • DISCOVER
                  </div>
                </div>
              </Link>


              {/* Description */}
              <p className="mt-5 text-sm leading-6 text-gray-500">
                Explore the beauty of Bangladesh with trusted destination
                information, travel inspiration and easy trip planning.
              </p>


              {/* =================================================
                  SOCIAL MEDIA
              ================================================= */}
              <div className="mt-6 flex items-center gap-2">

                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1f5b43] shadow-sm transition hover:bg-[#1f5b43] hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M14 8h3V4h-3c-3.3 0-5 1.7-5 5v3H6v4h3v8h4v-8h3.2l.8-4H13V9c0-.7.3-1 1-1z" />
                  </svg>
                </a>


                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1f5b43] shadow-sm transition hover:bg-[#1f5b43] hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                    />

                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>


                {/* YouTube */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1f5b43] shadow-sm transition hover:bg-[#1f5b43] hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M23 12s0-3.5-.4-5.1c-.2-1-1-1.8-2-2C19 4.5 12 4.5 12 4.5s-7 0-8.6.4c-1 .2-1.8 1-2 2C1 8.5 1 12 1 12s0 3.5.4 5.1c.2 1 1 1.8 2 2 1.6.4 8.6.4 8.6.4s7 0 8.6-.4c1-.2 1.8-1 2-2C23 15.5 23 12 23 12zM10 15.5v-7l6 3.5-6 3.5z" />
                  </svg>
                </a>


                {/* Website */}
                <a
                  href="#"
                  aria-label="Website"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1f5b43] shadow-sm transition hover:bg-[#1f5b43] hover:text-white"
                >
                  <Globe size={16} />
                </a>

              </div>
            </div>


            {/* =================================================
                COMPANY
            ================================================= */}
            <div>
              <h3 className="text-sm font-bold text-[#1d3128]">
                Company
              </h3>

              <div className="mt-5 flex flex-col gap-3">

                <Link
                  to="/about"
                  className="text-sm text-gray-500 transition hover:text-[#1f5b43]"
                >
                  About Us
                </Link>

                <Link
                  to="/contact"
                  className="text-sm text-gray-500 transition hover:text-[#1f5b43]"
                >
                  Contact Us
                </Link>

                <Link
                  to="/blog"
                  className="text-sm text-gray-500 transition hover:text-[#1f5b43]"
                >
                  Travel Blog
                </Link>

                <Link
                  to="/explore"
                  className="text-sm text-gray-500 transition hover:text-[#1f5b43]"
                >
                  Destinations
                </Link>

              </div>
            </div>


            {/* =================================================
                EXPLORE
            ================================================= */}
            <div>
              <h3 className="text-sm font-bold text-[#1d3128]">
                Explore
              </h3>

              <div className="mt-5 flex flex-col gap-3">

                <Link
                  to="/hotels"
                  className="text-sm text-gray-500 transition hover:text-[#1f5b43]"
                >
                  Hotels
                </Link>

                <Link
                  to="/restaurants"
                  className="text-sm text-gray-500 transition hover:text-[#1f5b43]"
                >
                  Restaurants
                </Link>

                <Link
                  to="/transportation"
                  className="text-sm text-gray-500 transition hover:text-[#1f5b43]"
                >
                  Transportation
                </Link>

                <Link
                  to="/emergency"
                  className="text-sm text-gray-500 transition hover:text-[#1f5b43]"
                >
                  Emergency Help
                </Link>

              </div>
            </div>


            {/* =================================================
                SUPPORT
            ================================================= */}
            <div>
              <h3 className="text-sm font-bold text-[#1d3128]">
                Support
              </h3>

              <div className="mt-5 space-y-4">

                {/* Phone */}
                <div className="flex items-start gap-3">

                  <Phone
                    size={16}
                    className="mt-0.5 shrink-0 text-[#1f5b43]"
                  />

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Hotline
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-600">
                      +880 1XXX-XXXXXX
                    </p>
                  </div>

                </div>


                {/* Email */}
                <div className="flex items-start gap-3">

                  <Mail
                    size={16}
                    className="mt-0.5 shrink-0 text-[#1f5b43]"
                  />

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold text-gray-600">
                      support@tripdaobd.com
                    </p>
                  </div>

                </div>

              </div>
            </div>

          </div>


          {/* =================================================
              FOOTER BOTTOM
          ================================================= */}
          <div className="mt-12 flex flex-col gap-4 border-t border-[#deded6] pt-6 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} by Nilima-TripDaoBD. All rights reserved.
            </p>

            <div className="flex gap-5">

              {/* Keep these as normal links until routes exist */}
              <a
                href="#"
                className="transition hover:text-[#1f5b43]"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="transition hover:text-[#1f5b43]"
              >
                Terms & Conditions
              </a>

            </div>

          </div>

        </Container>
      </div>
    </footer>
  );
};

export default Footer;