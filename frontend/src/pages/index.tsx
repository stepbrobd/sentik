import Hero from "../components/hero";
import Meta from "../components/meta";

const Index = () => {
  return (
    <>
      <Meta
        title="TwiTick - HackMIT 2022"
        description="TwiTick - a HackMIT 2022 project"
        image="/404.webp"
        keywords="HackMIT, HackMIT 2022, TwiTick, Twitter, Stocks"
        slug="/"
      />

      <Hero />
    </>
  );
};

export default Index;
