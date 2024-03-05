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
        <h1 className="font-bold text-3xl md:text-5xl">{blog.title}</h1>
        <BlogAuthor author={author} createdAt={createdAt} likes={likes} />

        <BlogImage thumbnail={thumbnail} />

        {/* <!-- Tags --> */}
        <BlogTags tags={tags} />

        {/* <!-- Content --> */}
        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
          {content}
          {/* <h2 className="font-bold text-3xl mt-4">100% code-based map</h2>
          What if we generate code that returns the right team for a given
          screen, instead of creating a map? Since we know the full list of
          screen classNamees, we can check ahead of time whether there's any
          hashcode conflict, and if not, we can generate code that directly */}
        </div>
      </div>
    </section>
  );
}
