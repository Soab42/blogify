/* eslint-disable react/display-name */
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useState,
} from "react";
import CloseIcon from "../../assets/icons/close.svg";
import { AnimatePresence, motion } from "framer-motion";
import { searchVariants } from "../animated/variants";
import useActive from "../../hooks/useActive";
import SingleSearchPost from "../common//SingleSearchPost";
import useDebounce from "../../hooks/useDebounce";
import useAxios from "../../hooks/useAxios";
import SearchCardLoader from "../loader/SearchCardLoader";
import SearchInput from "../search/SearchInput";
// eslint-disable-next-line react/display-name

const Search = forwardRef((props, ref) => {
  const [show, setShow] = useActive(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { api } = useAxios();

  const [searchResult, setSearchResult] = useState();
  useImperativeHandle(ref, () => {
    return {
      open: () => setShow(true),
      close: () => setShow(false),
      show: show,
    };
  });

  useLayoutEffect(() => {
    const root = document.querySelector("#root > div");

    // Call disableScroll function when component mounts
    if (show) {
      root.style.height = "100vh";
      root.style.overflow = "hidden";
    }

    return () => {
      root.style.height = "";
      root.style.overflow = "";
    };
  }, [show]);

  const doSearch = useDebounce(async (value) => {
    setLoading(true);
    setError();
    try {
      const res = await api.get(`search?q=${value}`);
      if (res?.status === 200) {
        setSearchResult(res.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      setError(error?.response?.data?.message || "Something went wrong !");
    }
  }, 500);
  const handleChange = (e) => {
    doSearch(e.target.value);
  };

  return (
    show && (
      <AnimatePresence>
        <motion.section
          className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50"
          variants={searchVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
            <SearchInput onChange={handleChange} />

            {/* <!-- Search Result --> */}
            <div className="">
              <h3 className="text-slate-400 font-bold mt-6">
                {searchResult?.length && !error && (
                  <span>
                    Search Results : {searchResult?.length} post found{" "}
                    <span className="text-green-400">{searchResult.query}</span>{" "}
                    keyword
                  </span>
                )}
              </h3>

              <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
                {loading ? (
                  <SearchCardLoader />
                ) : error ? (
                  <div className="text-red-300">{error}</div>
                ) : (
                  searchResult?.data?.map((post) => (
                    <SingleSearchPost
                      key={post.id}
                      post={post}
                      searchValue={searchResult.query}
                    />
                  ))
                )}
              </div>
            </div>

            <button onClick={() => setShow(false)}>
              <img
                src={CloseIcon}
                alt="Close"
                className="absolute right-2 top-2 cursor-pointer w-8 h-8"
              />
            </button>
          </div>
        </motion.section>
      </AnimatePresence>
    )
  );
});

export default Search;
