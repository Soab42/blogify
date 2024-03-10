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
import { getLocalImageURL } from "../../utils.js/getLocalImageUrl";
import { useBlogImage } from "../../hooks/useBlogImage";

function AddPost() {
  const navigate = useNavigate();
  const { isEdit, post, dispatch } = usePost();
  const { thumbnailLink } = useBlogImage(isEdit && post.thumbnail);
  const [formData, setFormData] = useState({
    thumbnail: isEdit ? thumbnailLink : null,
    title: isEdit ? post?.title : "",
    tags: isEdit ? post?.tags : "",
    content: isEdit ? post?.content : "",
  });
  console.log(formData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const { api } = useAxios();
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "thumbnail") {
        const thumbnail = getLocalImageURL(value.thumbnail);
        setFormData((prevData) => ({
          ...prevData,
          thumbnail,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value[name],
        }));
      }
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
        const url = generatePostURL(res.data.blog);

        navigate(url);
      }
    } catch (error) {
      console.error(error.response.data.error);
      setError("root.random", {
        message: error.response.data.error,
      });
    }
  };
  // console.log(state);
  useDynamicTitle(!isEdit ? "Create New Post" : "Update Post");
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="min-h-[80vh]">
        <div className=" text-center w-full text-3xl font-bold tracking-widest shadow-sm shadow-blue-400/20 pb-2 rounded-xl">
          {!isEdit ? "Create New" : "Update"} Post
        </div>
        <div className="container flex justify-between">
          {/* <!-- Form Input field for creating Blog Post --> */}
          <div className="w-[50vw] ">
            <BlogForm
              register={register}
              handleSubmit={() => handleSubmit(onSubmit)}
              errors={errors}
              image={formData?.thumbnail}
            />
          </div>

          <div className="w-[50vw]">
            <DemoBlog
              image={formData?.thumbnail}
              title={formData?.title}
              tags={formData?.tags}
              content={formData?.content}
            />
          </div>
        </div>
      </section>
    </motion.main>
  );
}

export default AddPost;
