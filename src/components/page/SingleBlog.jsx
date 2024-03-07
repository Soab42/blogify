import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import BlogDetails from "../blog/BlogDetails";
import FloatingAction from "../blog/actionButtons/FloatingAction";
import Comments from "../blog/comments/Comments";

<title>Integer Maecenas Eget Viverra | Learn with Sumit</title>;

const retrievePost = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};
export default function SingleBlog() {
  const params = useParams();
  const id = params?.title?.split("-").pop();

  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogs", id],
    queryFn: retrievePost,
  });

  useDynamicTitle(isLoading ? "Loading" : "Blog");

  return (
    <main className="mb-5">
      {/* <!-- Begin Blogs --> */}
      <BlogDetails blog={post} />
      {/* <!-- End Blogs --> */}

      {/* <!-- Begin Comments --> */}
      <Comments comments={post?.comments} postId={post?.id} />
      <FloatingAction post={post} />
    </main>
  );
}
