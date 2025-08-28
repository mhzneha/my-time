import React, { useEffect, useState } from "react";

export default function DateTime() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  //   const locale = "en";
  const day = currentTime.toLocaleDateString(undefined, { weekday: "long" });
  const date = `${day}, ${currentTime.getDate()} ${currentTime.toLocaleDateString(
    undefined,
    { month: "long" }
  )}`;

  const hour = currentTime.getHours();
  const wish = `Good ${
    (hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
  } `;

  const time = currentTime.toLocaleTimeString(undefined, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });
  return (
    <div className="flex justify-between p-8">
      <div className="font-bold text-[28px] text-cyan-800">{wish}</div>
      <div className="font-bold text-cyan-800">
        <div className="text-[22px]"> {date} </div>
        <div className="text-[18px]">{time}</div>
      </div>
    </div>
  );
}
