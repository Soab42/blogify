import BlogForm from "../blog/BlogForm";
import DemoBlog from "../blog/DemoBlog";
import { useForm } from "react-hook-form";
import { pageVariants } from "../animated/variants";
import { motion } from "framer-motion";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
export default function AddPost() {
  const [image, setImage] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const { api } = useAxios();
  const files = watch("thumbnail");
  const title = watch("title");
  const tags = watch("tags");
  const content = watch("content");

  useEffect(() => {
    if (files?.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.onerror = () => {
        // Handle error if file reading fails
        console.error("Error reading the file.");
      };
      reader.readAsDataURL(file);
    }
    // Cleanup function to remove event listeners, etc.
    return () => {
      // Cleanup code if necessary
    };
  }, [watch, files]);

  const onSubmit = async (data) => {
    console.log("data", data);
    const res = await api.post("/blogs", data);
    console.log(res);
    setError("root.serverError", {
      type: "400",
      message: "server error",
    });
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
              image={image}
            />
          </div>

          <div className="w-[50vw]">
            <DemoBlog
              image={image}
              title={title}
              tags={tags}
              content={content}
            />
          </div>
        </div>
      </section>
    </motion.main>
  );
}
