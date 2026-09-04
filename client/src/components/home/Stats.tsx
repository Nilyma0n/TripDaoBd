import {
  MapPinned,
  UsersRound,
  Star,
  Headphones,
} from "lucide-react";
import Container from "../ui/Container";

const stats = [
  {
    icon: MapPinned,
    value: "50+",
    label: "Destinations",
  },
  {
    icon: UsersRound,
    value: "10K+",
    label: "Happy Travelers",
  },
  {
    icon: Star,
    value: "4.8",
    label: "Average Rating",
  },
  {
    icon: Headphones,
    value: "24/7",
    label: "Travel Support",
  },
];

const Stats = () => {
  return (
    <section className="border-y border-[#e5e4dc] bg-[#f7f5ef] py-8">
      <Container>

        <div className="grid grid-cols-2 divide-x divide-[#dfded6] lg:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-3 px-4 py-3 sm:gap-4"
              >
                <Icon
                  size={23}
                  strokeWidth={1.7}
                  className="text-[#1f5b43]"
                />

                <div>
                  <p className="text-xl font-extrabold tracking-tight text-[#1c3027] sm:text-2xl">
                    {stat.value}
                  </p>

                  <p className="mt-0.5 text-[10px] font-medium text-gray-500 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}

        </div>

      </Container>
    </section>
  );
};

export default Stats;