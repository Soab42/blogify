import React from "react";
import NightLogo from "../../../assets/night.svg";
import DayLogo from "../../../assets/day.svg";
import useActive from "../../../hooks/useActive";
export default function ThemeNevigation() {
  const [active, handleActive] = useActive();

  return (
    <li
      className="text-white flex justify-center items-center cursor-pointer"
      onClick={handleActive}
    >
      {active ? (
        <img src={NightLogo} alt="night" className=" w-6 m-2" />
      ) : (
        <img src={DayLogo} alt="day" className=" w-6 m-2" />
      )}
    </li>
  );
}
