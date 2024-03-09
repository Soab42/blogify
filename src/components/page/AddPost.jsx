import BlogForm from "../blog/BlogForm";
import DemoBlog from "../blog/DemoBlog";
import { useForm } from "react-hook-form";
import { pageVariants } from "../animated/variants";
import { motion } from "framer-motion";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import { usePost } from "../../hooks/usePost";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";
import { useNavigate } from "react-router-dom";
import { generatePostURL } from "../../utils.js/generateURL";
let rerender = 0;
function AddPost() {
  const { dispatch } = usePost();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    thumbnail: null,
    title: "",
    tags: "",
    content: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const { api } = useAxios();

  console.log("rendering", rerender);
  rerender++;

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      setFormData((prevData) => {
        return { ...prevData, [name]: value[name] };
      });
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  const onSubmit = async (data) => {
    const formData = new FormData();
    // append image
    for (const file of data.thumbnail) {
      formData.append("thumbnail", file);
    }
    // append content
    formData.append("title", data.title);
    formData.append("tags", data.tags);
    formData.append("content", data.content);

    try {
      const res = await api.post("/blogs", formData);
      if (res.status === 201) {
        dispatch({
          type: actions.post.DATA_CREATED,
          data: res.data,
        });
        const url = generatePostURL(
          "/blog",
          res.data.blog.title,
          res.data.blog.id
        );
        console.log(res.data);
        console.log(url);
        navigate(url);
      }
    } catch (error) {
      console.error(error.response.data.error);
      setError("root.random", {
        message: error.response.data.error,
      });
    }
  };
  useDynamicTitle("Create New Post");
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="min-h-[80vh]">
        <div className=" text-center w-full text-3xl font-bold tracking-widest shadow-sm shadow-blue-400/20 pb-2 rounded-xl">
          Create New Post
        </div>
        <div className="container flex justify-between">
          {/* <!-- Form Input field for creating Blog Post --> */}
          <div className="w-[50vw] ">
            <BlogForm
              register={register}
              handleSubmit={() => handleSubmit(onSubmit)}
              errors={errors}
              image={formData.thumbnail}
            />
          </div>

          <div className="w-[50vw]">
            <DemoBlog
              image={formData.thumbnail}
              title={formData.title}
              tags={formData.tags}
              content={formData.content}
            />
          </div>
        </div>
      </section>
    </motion.main>
  );
}

export default AddPost;
