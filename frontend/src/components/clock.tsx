import { useEffect, useState } from "react";

const Clock = () => {
  const currentTime = () =>
    new Date().toLocaleString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  const [time, setTime] = useState(currentTime);
  useEffect(() => {
    let timer = setInterval(() => {
      setTime(currentTime);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-row items-center justify-center">
      <h1
        className="rounded-full bg-[#F5FA09] p-4 text-neutral-500 drop-shadow"
        suppressHydrationWarning={true}
      >
        {time.slice(0, 2)}
      </h1>
      <h1 className="-mx-2 rounded-full bg-[#F5FA09] p-4 text-neutral-500 drop-shadow">
        :
      </h1>
      <h1
        className="rounded-full bg-[#F5FA09] p-4 text-neutral-500 drop-shadow"
        suppressHydrationWarning={true}
      >
        {time.slice(3, 5)}
      </h1>
      <h1 className="-mx-2 rounded-full bg-[#F5FA09] p-4 text-neutral-500 drop-shadow">
        :
      </h1>
      <h1
        className="rounded-full bg-[#F5FA09] p-4 text-neutral-500 drop-shadow"
        suppressHydrationWarning={true}
      >
        {time.slice(6, 8)}
      </h1>
    </div>
  );
};

export default Clock;
