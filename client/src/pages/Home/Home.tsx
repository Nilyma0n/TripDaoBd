import Hero from "../../components/hero/Hero";
import SearchBox from "../../components/hero/SearchBox";
import Stats from "../../components/home/Stats";
import Categories from "../../components/home/Categories";
import FeaturedDestinations from "../../components/home/FeaturedDestinations";
import WhyChoose from "../../components/home/WhyChoose";
import PopularHotels from "../../components/home/PopularHotels";
import TravelBlog from "../../components/home/TravelBlog";
import EmergencySection from "../../components/home/EmergencySection";
import Newsletter from "../../components/home/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <SearchBox />
      <Stats />
      <Categories />
      <FeaturedDestinations />
      <WhyChoose />
      <PopularHotels />
      <TravelBlog />
      <EmergencySection />
      <Newsletter />
    </>
  );
};

export default Home;