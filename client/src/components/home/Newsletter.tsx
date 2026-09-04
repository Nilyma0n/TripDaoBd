import { ArrowRight, Mail } from "lucide-react";
import Container from "../ui/Container";

const Newsletter = () => {
  return (
    <section className="bg-white py-14 sm:py-16">
      <Container>

        <div className="mx-auto max-w-3xl rounded-[26px] border border-[#e4e3da] bg-[#f7f5ef] px-6 py-9 text-center sm:px-10">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1f5b43] shadow-sm">
            <Mail size={21} />
          </div>

          <p className="mt-4 text-[10px] font-bold uppercase tracking-[2.5px] text-[#1f5b43]">
            Stay Inspired
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#172c23] sm:text-3xl">
            Travel inspiration, delivered
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Get destination ideas, travel tips and useful updates from
            TripDaoBD.
          </p>

          <form className="mx-auto mt-6 flex max-w-lg flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-full border border-[#dcdcd3] bg-white px-5 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#1f5b43]"
            />

            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1f5b43] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#174a36]"
            >
              Subscribe

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

        </div>

      </Container>
    </section>
  );
};

export default Newsletter;