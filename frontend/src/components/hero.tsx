import Year from "./year";
import Clock from "./clock";


const Hero = () => {
  return (
    <>
      <div className="z-10 w-full rounded-lg bg-[#84367C] px-8 py-10 text-white">
        <Year />

        <h1 className="tracking-normal text-white flex items-center mt-4 mb-6 justify-between leading-4">
          <span>From: Twitter</span>
          <span>To: <b className="text-yellow-500">You</b></span>
        </h1>

        <h2 className="tracking-normal text-white leading-5 mt-4 flex items-center justify-between">
          <span> <b className="text-yellow-500">LIVE</b> stock sentiment report</span>
        </h2>

        <p className="font-light mt-10 leading-2 text-white">
          <span>We get you </span>
          <span>money advice</span>
          <span> and save you the only non-monetary currency: </span>
          <span className="text-yellow-500"> your time</span>
        </p>

        <div className="rounded-full -mt-3 float-right bg-yellow-400 pl-2 pr-20 -pt-3"> <p className="text-align-left leading-1 mt-4 mb-2 text-black">Select a stock</p> <image> ></image></div>

      </div>
      <div className="py-3"></div>
      <Clock />
      </>
  );
};

export default Hero;
