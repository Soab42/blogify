import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../common/FormInput";

export default function BlogForm({ handleSubmit, errors = {}, register }) {
  return (
    <form onSubmit={handleSubmit()} className="createBlog">
      <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
        <label
          htmlFor="file-upload"
          className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <p>Upload Your Image</p>
        </label>

        <input
          id="file-upload"
          type="file"
          className="hidden"
          {...register("img", { required: "img is required" })}
        />
        {errors.img && (
          <div className="px-2 text-rose-400 text-sm">
            * {errors.img.message}
          </div>
        )}
      </div>

      <div className="mb-6">
        <FormInput error={errors.title}>
          <input
            {...register("title", { required: "title is required" })}
            type="text"
            id="title"
            name="title"
            placeholder="Enter your blog title"
          />
        </FormInput>
      </div>

      <div className="mb-6">
        <FormInput error={errors.tags}>
          <input
            {...register("tags", { required: "tags is required" })}
            type="text"
            id="tags"
            name="tags"
            placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
          />
        </FormInput>
      </div>

      <div className="mb-6">
        <FormInput error={errors.content}>
          <textarea
            {...register("content", { required: "content is required" })}
            id="content"
            name="content"
            placeholder="Write your blog content"
            rows="8"
          ></textarea>
        </FormInput>
      </div>

      <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
        Create Blog
      </button>
    </form>
  );
}
