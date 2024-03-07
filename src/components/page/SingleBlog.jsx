import React from "react";
import BlogDetails from "../blog/BlogDetails";
import Comments from "../blog/Comments";
import FloatingAction from "../blog/FloatingAction";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import useDynamicTitle from "../../hooks/useDynamicTitle";
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
    <main>
      {/* <!-- Begin Blogs --> */}
      <BlogDetails blog={post} />
      {/* <!-- End Blogs --> */}

      {/* <!-- Begin Comments --> */}
      <Comments comments={post?.comments} />
      <FloatingAction post={post} />
    </main>
  );
}
