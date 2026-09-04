import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import heroImage from "../../assets/images/hero.jpg";

const SpecialOffer = () => {
  return (
    <section className="bg-white py-10 sm:py-14">
      <Container>

        <div className="relative min-h-[330px] overflow-hidden rounded-[28px] bg-[#174a36] shadow-[0_18px_50px_rgba(20,60,40,0.15)]">

          {/* IMAGE */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[57%]">
            <img
              src={heroImage}
              alt="Bangladesh travel destination"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#174a36]/10 to-[#174a36] md:bg-gradient-to-r" />
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative ml-auto flex min-h-[330px] w-full items-center px-7 py-10 sm:px-10 md:w-[52%] lg:px-14">

            <div className="max-w-lg">

              <div className="mb-4 flex items-center gap-2 text-[#f3b35b]">
                <Sparkles size={15} />

                <span className="text-[10px] font-bold uppercase tracking-[2.5px]">
                  Special Offer
                </span>
              </div>

              <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Your Next Adventure
                <br />
                <span className="text-[#e9a044]">
                  Starts Here
                </span>
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/75 sm:text-base">
                Discover amazing places, plan memorable trips and explore
                Bangladesh with TripDaoBD.
              </p>

              <Link
                to="/explore"
                className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#e99a36] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#d98925]"
              >
                Discover Destinations

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
};

export default SpecialOffer;