import React from "react";
import MainCard from "../blog/MainCard";
import ProfileInfo from "../profile/ProfileInfo";
<title>Profile | Facehook</title>;

export default function Profile() {
  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        {/* <!-- profile info --> */}
        <ProfileInfo />
        {/* <!-- end profile info --> */}

        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
        <div className="my-6 space-y-4">
          {/* <!-- Blog Card Start --> */}
          <MainCard />
          <MainCard />
          <MainCard />
          <MainCard />
          {/* <!-- Blog Card End --> */}
        </div>
      </div>
    </main>
  );
}
