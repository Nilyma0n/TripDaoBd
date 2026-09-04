import Hero from "../../components/hero/Hero";
import SearchBox from "../../components/hero/SearchBox";

import TrustBar from "../../components/home/TrustBar";
import FeaturedDestinations from "../../components/home/FeaturedDestinations";
import Categories from "../../components/home/Categories";

import TravelBlog from "../../components/home/TravelBlog";
import SpecialOffer from "../../components/home/SpecialOffer";

import WhyChoose from "../../components/home/WhyChoose";
import PopularHotels from "../../components/home/PopularHotels";
import PopularRestaurants from "../../components/home/PopularRestaurants";

import EmergencySection from "../../components/home/EmergencySection";
import Stats from "../../components/home/Stats";

const Home = () => {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* FLOATING SEARCH */}
      <SearchBox />

      {/* TRUST */}
      <TrustBar />

      {/* DESTINATIONS */}
      <FeaturedDestinations />

      {/* CATEGORIES */}
      <Categories />

      {/* STORIES */}
      <TravelBlog />

      {/* SPECIAL OFFER */}
      <SpecialOffer />

      {/* WHY TRIPDAO */}
      <WhyChoose />

      {/* HOTELS */}
      <PopularHotels />

      {/* RESTAURANTS */}
      <PopularRestaurants />

      {/* TRAVEL SAFETY */}
      <EmergencySection />

      {/* STATS */}
      <Stats />
    </>
  );
};

export default Home;