import FavouriteCard from "./FavouriteCard";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

export default function FavouriteBlogs() {
  const { api } = useAxios();
  const retrieveFavPost = async ({ queryKey }) => {
    const response = await api.get(`${queryKey[0]}/${queryKey[1]}`);
    return response.data;
  };
  const {
    data: favPost,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogs", "favourites"],
    queryFn: retrieveFavPost,
  });

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favourites ❤️
      </h3>

      <ul className="space-y-5 my-5">
        {favPost?.blogs?.map((favBlog) => (
          <FavouriteCard key={favBlog.id} blog={favBlog} />
        ))}
      </ul>
    </div>
  );
}
