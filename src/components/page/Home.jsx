import { useEffect, useState } from "react";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { usePost } from "../../hooks/usePost";
import { useProfile } from "../../hooks/useProfile";
import MainCard from "../blog/MainCard";
import FavouriteBlogs from "../blog/favourite/FavouriteBlogs";
import PopularBlogs from "../blog/popular/PopularBlogs";
import Test from "../common/Test";
import { motion } from "framer-motion";
import { pageVariants } from "../animated/variants";
export default function Home() {
  const [ref, isVisible] = useIntersectionObserver({
    root: null,
    rootMargin: "50px",
    threshold: 1,
  });
  const [page, setPage] = useState(1);
  const { state, dispatch } = usePost();
  const { user } = useProfile();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    async function fetchData() {
      const res = await api.get(`/blogs?page=${page}&limit=10`);
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

  return (
    <motion.div
      className="container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="space-y-3 md:col-span-5">
          {state?.posts?.map((post) => (
            <MainCard data={post} key={post.id} />
          ))}
          {state.hasMore && <div ref={ref}>loading</div>}
        </div>

        <div className="md:col-span-2 h-full w-full space-y-5">
          <PopularBlogs />
          {user && <FavouriteBlogs />}

          <Test />
        </div>
      </div>
    </motion.div>
  );
}
