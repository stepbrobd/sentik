import Year from "../components/year";
import Clock from "./clock";

const Hero = () => {
  return (
    <span className="relative z-0">
      <div className="absolute z-10 w-full rounded-lg bg-[#84367C] px-8 py-10">
        <Year />

        <h1 className="flex items-center justify-between">
          <span>From: Twitter</span>
          <span>To: You</span>
        </h1>

        <h2 className="flex items-center justify-between">
          <span className="text-yellow-500">LIVE</span>
          <span>stock sentiment report</span>
        </h2>

        <p>
          <span>We get you </span>
          <span>money advice</span>
          <span>and save you the only non-monetary currency:</span>
          <span>your time</span>
          <span>.</span>
        </p>

        <Clock />
      </div>
      <div className="z-0 w-full rounded-lg bg-[#84367C] px-8 py-10 blur-lg"></div>
    </span>
  );
};

export default Hero;
