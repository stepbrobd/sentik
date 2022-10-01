import Meta from "../components/meta";
import dynamic from "next/dynamic";

const Chart: any = dynamic(import("../components/chart"), {
  ssr: false,
});

const Index = () => {
  return (
    <>
      <Meta
        title="HackMIT-2022"
        description="HackMIT Project from group Tabe#94"
        image="/404.webp"
        keywords="404, not found, error"
        slug="/404"
      />

      <h1>Sample Plots below</h1>

      <Chart />
    </>
  );
};

export default Index;
