import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import PopularCard from "./PopularCard";
import { actions } from "../../actions";

export default function PopularBlogs() {
  const { state, dispatch } = usePost();
  const { api } = useAxios();
  // console.log(state);
  useEffect(() => {
    dispatch({ type: actions.post.POPULAR_DATA_FETCHING });
    async function fetchData() {
      const res = await api.get(`/blogs/popular`);
      // console.log(res);
      dispatch({
        type: actions.post.POPULAR_DATA_FETCHED,
        data: res.data.blogs,
      });
    }
    fetchData();
  }, []);

  if (state?.popular_loading) {
    return <div>loading....</div>;
  }
  if (state?.popular_error) {
    return <div>something is error....</div>;
  }

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      <ul className="space-y-5 my-5">
        {state?.popularPost?.map((popular) => (
          <PopularCard key={popular.id} data={popular} />
        ))}
      </ul>
    </div>
  );
}
