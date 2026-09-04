import Hero from "../../components/hero/Hero";
import SearchBox from "../../components/hero/SearchBox";
import Stats from "../../components/home/Stats";
import TrustBar from "../../components/home/TrustBar";
import Categories from "../../components/home/Categories";
import FeaturedDestinations from "../../components/home/FeaturedDestinations";
import WhyChoose from "../../components/home/WhyChoose";
import PopularHotels from "../../components/home/PopularHotels";
import PopularRestaurants from "../../components/home/PopularRestaurants";
import TravelBlog from "../../components/home/TravelBlog";
import EmergencySection from "../../components/home/EmergencySection";
import Newsletter from "../../components/home/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <SearchBox />
      <Stats />
      <TrustBar />
      <Categories />
      <FeaturedDestinations />
      <WhyChoose />
      <PopularHotels />
      <PopularRestaurants />
      <TravelBlog />
      <EmergencySection />
      <Newsletter />
    </>
  );
};

export default Home;