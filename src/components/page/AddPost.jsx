import BlogForm from "../blog/BlogForm";
import DemoBlog from "../blog/DemoBlog";
import { useForm } from "react-hook-form";
<title>Create Post | Learn with Sumit</title>;

export default function AddPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
    setError("root.serverError", {
      type: "400",
      message: "server error",
    });
  };
  return (
    <main>
      <section>
        <div className="container flex justify-between">
          {/* <!-- Form Input field for creating Blog Post --> */}
          <div className="w-[50vw] ">
            <BlogForm
              register={register}
              handleSubmit={() => handleSubmit(onSubmit)}
              errors={errors}
            />
          </div>
          <div className="w-[50vw]">
            <DemoBlog />
          </div>
        </div>
      </section>
    </main>
  );
}
