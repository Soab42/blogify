import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../common/AuthorImage";
import { getName, getNameURL } from "../../utils.js/getName";
import getDateFormat from "../../utils.js/getDateFormat";

export default function BlogAuthor({ author, createdAt, likes }) {
  return (
    <div className="flex justify-center items-center my-4 gap-4">
      <Link
        className="flex items-center capitalize space-x-2"
        to={getNameURL(author)}
      >
        <AuthorImage author={author} />
        <h5 className="dark:text-slate-500 text-sm">{getName(author)}</h5>
      </Link>
      <span className="text-sm text-slate-700 dot">
        {getDateFormat(createdAt)}
      </span>

      <span className="text-sm text-slate-700 dot">{likes?.length} Likes</span>
    </div>
  );
}
