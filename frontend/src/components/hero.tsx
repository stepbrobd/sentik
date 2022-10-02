import Year from "./year";
import Clock from "./clock";

const Hero = () => {
  return (
      <div className="z-10 w-full rounded-lg bg-[#84367C] px-8 py-10">
        <Year />

        <h1 className="flex items-center justify-between">
          <span>From: Twitter</span>
          <span>To: <b className="text-yellow-500">You</b></span>
        </h1>

        <h2 className="flex items-center justify-between">
          <span> <b className="text-yellow-500">LIVE</b> stock sentiment report</span>
        </h2>

        <p>
          <span>We get you </span>
          <span>money advice</span>
          <span> and save you the only non-monetary currency: </span>
          <span className="text-yellow-500"> your time</span>
          <span>.</span>
        </p>

        <Clock />
      </div>
  );
};

export default Hero;
