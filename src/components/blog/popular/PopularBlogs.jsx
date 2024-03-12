import PopularCard from "./PopularCard";
import PopularCardLoader from "../../loader/PopularCardLoader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retrievePopularPost = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};
export default function PopularBlogs() {
  const {
    data: popularPost,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogs", "popular"],
    queryFn: retrievePopularPost,
  });

  let content;
  if (isLoading) {
    content = <PopularCardLoader />;
  } else if (error) {
    content = <div>something is error....</div>;
  } else if (popularPost?.blogs?.length === 0) {
    content = <div>No Popular Post Found</div>;
  } else {
    content = (
      <ul className="space-y-5 my-5">
        {popularPost?.blogs?.map((popular) => (
          <PopularCard key={popular.id} data={popular} />
        ))}
      </ul>
    );
  }

  return (
    <div className="sidebar-card">
      <h3 className="dark:text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>
      {content}
    </div>
  );
}
