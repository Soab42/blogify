import React from "react";
import ProfileImage from "./ProfileImage";
import Bio from "./Bio";
import { getName } from "../../utils.js/getName";
export default function ProfileInfo({ info }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      {/* <!-- profile image --> */}

      <ProfileImage author={info} />

      {/* <!-- name , email --> */}
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {getName(info)}
        </h3>
        <p className="leading-[231%] lg:text-lg">{info?.email}</p>
      </div>

      {/* <!-- bio --> */}
      <Bio info={info} />
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
}
