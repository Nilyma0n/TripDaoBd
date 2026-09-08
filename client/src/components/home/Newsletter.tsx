import {
  ArrowRight,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";

const Newsletter = () => {
  return (
    <section className="bg-[#f7f5ef] py-14">
      <Container>

        <div className="rounded-[28px] border border-[#e4e2d8] bg-white p-7 md:p-10">

          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf3ee] text-[#1f5b43]">
                <Mail size={22} />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#293a32]">
                  Get travel inspiration
                </h2>

                <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500">
                  Receive destination guides, travel ideas and useful updates
                  from TripDaoBD.
                </p>
              </div>

            </div>

            <Link
              to="/newsletter"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1f5b43] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#174a36]"
            >
              Learn more
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default Newsletter;