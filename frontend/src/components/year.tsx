import { useEffect, useState } from "react";

const Year = () => {
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
    <div className="flex flex-row items-center justify-between">
      <p className="text-sm" suppressHydrationWarning={true}>
        {time}
      </p>
    </div>
  );
};

export default Year;
