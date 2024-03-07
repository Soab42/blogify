import React, { useEffect, useState } from "react";
import MainCard from "../blog/MainCard";
import PopularBlogs from "../blog/PopularBlogs";
import FavouriteBlogs from "../blog/FavouriteBlogs";
import { usePost } from "../../hooks/usePost";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import Test from "../common/Test";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import { useUser } from "../../hooks/useUser";

export default function Home() {
  const [ref, isVisible] = useIntersectionObserver({
    root: null,
    rootMargin: "50px",
    threshold: 1,
  });
  const [page, setPage] = useState(1);
  const { state, dispatch } = usePost();
  const { user } = useUser();
  const { api } = useAxios();
  // console.log(state);
  // console.log(state);
  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    async function fetchData() {
      const res = await api.get(`/blogs?page=${page}&limit=3`);
      // console.log(res);
      dispatch({ type: actions.post.DATA_FETCHED_MORE, data: res.data });
    }
    fetchData();
  }, [page]);

  useEffect(() => {
    // console.log(state.hasMore);
    if (isVisible && state.hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isVisible, state.hasMore]);

  useDynamicTitle(state?.loading ? "loading" : undefined);
  // if (state?.loading) {
  //   return <div>loading....</div>;
  // }
  // if (state?.error) {
  //   return <div>something is error....</div>;
  // }
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {/* <!-- Blog Contents --> */}
        <div className="space-y-3 md:col-span-5">
          {/* <!-- Blog Card Start --> */}
          {state?.posts?.map((post) => (
            <MainCard data={post} key={post.id} />
          ))}
          {state.hasMore && <div ref={ref}>loading</div>}
          {/* <!-- Blog Card End --> */}
        </div>

        {/* <!-- Sidebar --> */}
        <div className="md:col-span-2 h-full w-full space-y-5">
          <PopularBlogs />
          {user && <FavouriteBlogs />}

          <Test />
        </div>
      </div>
    </div>
  );
}
