import React from "react";
import { useBlogImage } from "../../hooks/useBlogImage";
import { useHighlightMatches } from "../../hooks/useHighlightMatches";
import { generatePostURL } from "../../utils.js/generateURL";
import { Link } from "react-router-dom";
export default function SingleSearchPost({ post = {}, searchValue }) {
  const { thumbnailLink } = useBlogImage(post?.thumbnail);
  const match = useHighlightMatches(searchValue);
  const {} = generatePostURL();
  return (
    <div className="flex gap-6 py-2">
      <img
        className="w-56 object-contain"
        src={thumbnailLink}
        alt={post?.title}
      />
      <Link to={generatePostURL(post)} className="mt-2">
        <h3 className="text-slate-300 text-xl font-bold">
          {match(post?.title)}
        </h3>
        <p className="mb-6 text-sm text-slate-500 mt-1 tr line-clamp-3">
          {match(post?.content)}
        </p>
      </Link>
    </div>
  );
}
