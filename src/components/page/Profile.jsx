import MainCard from "../blog/MainCard";
import ProfileInfo from "../profile/ProfileInfo";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useProfile } from "../../hooks/useProfile";
import { getName } from "../../utils.js/getName";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import { pageVariants } from "../animated/variants";
import { motion } from "framer-motion";
import ProfileLoader from "../loader/ProfileLoader";

const retrieveProfile = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};
export default function Profile() {
  const params = useParams();
  const id = params?.name?.split("-").pop();
  const {
    data: profile,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: retrieveProfile,
  });
  const { isUser } = useProfile(profile);
  useDynamicTitle(isLoading ? "loading" : getName(profile));

  let content;

  if (isLoading) {
    content = <ProfileLoader />;
  } else if (error) {
    content = <div>{error.message}</div>;
  } else {
    content = (
      <div className="container">
        {/* <!-- profile info --> */}
        <ProfileInfo info={profile} />
        {/* <!-- end profile info --> */}

        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">
          {isUser ? "Your" : getName(profile)} Blogs
        </h4>
        <div className="my-6 space-y-4">
          {/* <!-- Blog Card Start --> */}
          {profile?.blogs.map((data) => (
            <MainCard data={data} key={data.id} />
          ))}
          {/* <MainCard /> */}
          {/* <!-- Blog Card End --> */}
        </div>
      </div>
    );
  }
  return (
    <motion.main
      className="mx-auto max-w-[1020px] py-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container">{content}</div>
    </motion.main>
  );
}
