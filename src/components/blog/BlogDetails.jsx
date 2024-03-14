import React from "react";
import Author from "./CardAuthor";
import BlogAuthor from "./BlogAuthor";
import BlogTags from "./BlogTags";
import BlogImage from "./BlogImage";

export default function BlogDetails({ blog = {} }) {
  const { author, tags, thumbnail, likes, content, createdAt } = blog;

  return (
    <section>
      <div className="container text-center py-8">
        <h1 className="font-bold text-3xl md:text-5xl capitalize">
          {blog.title}
        </h1>
        <BlogAuthor author={author} createdAt={createdAt} likes={likes} />

        <BlogImage thumbnail={thumbnail} />

        {/* <!-- Tags --> */}
        <BlogTags tags={tags} />

        {/* <!-- Content --> */}
        <div
          className="mx-auto w-full md:w-10/12 dark:text-slate-300 text-base md:text-lg leading-8 py-2 !text-left"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </section>
  );
}
