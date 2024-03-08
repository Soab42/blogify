import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import BlogDetails from "../blog/BlogDetails";
import FloatingAction from "../blog/actionButtons/FloatingAction";
import Comments from "../blog/comments/Comments";

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

  const PageTitle = params?.title?.split("-").slice(0, -1).join("-");
  useDynamicTitle(isLoading ? "Loading" : PageTitle);

  return (
    <main className="mb-5">
      <BlogDetails blog={post} />
      <Comments comments={post?.comments} postId={post?.id} />
      <FloatingAction post={post} />
    </main>
  );
}
