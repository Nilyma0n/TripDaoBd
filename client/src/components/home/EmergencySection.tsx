import {
  ArrowRight,
  PhoneCall,
  ShieldAlert,
  Hospital,
  Siren,
} from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";

const EmergencySection = () => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>

        <div className="relative overflow-hidden rounded-[28px] border border-[#e7ddd0] bg-[#f8f3e9]">

          {/* Decorative circle */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#eadfcf]/70" />

          <div className="relative grid items-center gap-8 px-6 py-9 sm:px-10 sm:py-11 lg:grid-cols-[1.2fr_0.8fr] lg:px-14">

            {/* LEFT */}
            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#b64a3b] shadow-sm">
                  <ShieldAlert size={23} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#b64a3b]">
                    Travel Safety
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold text-[#27372f] sm:text-3xl">
                    Need help while travelling?
                  </h2>
                </div>

              </div>

              <p className="mt-5 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                Quickly find emergency contacts, hospitals, police stations,
                fire services and tourist police when you need assistance.
              </p>

              <Link
                to="/emergency"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#1f5b43] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#174a36]"
              >
                Emergency Contacts

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-3 gap-3">

              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <PhoneCall
                  size={21}
                  className="mx-auto text-[#b64a3b]"
                />

                <p className="mt-3 text-xs font-bold text-[#293a32]">
                  Emergency
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                  Quick access
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <Hospital
                  size={21}
                  className="mx-auto text-[#1f5b43]"
                />

                <p className="mt-3 text-xs font-bold text-[#293a32]">
                  Hospitals
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                  Find nearby
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <Siren
                  size={21}
                  className="mx-auto text-[#1f5b43]"
                />

                <p className="mt-3 text-xs font-bold text-[#293a32]">
                  Police
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                  Get assistance
                </p>
              </div>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default EmergencySection;