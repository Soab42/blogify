import React from "react";
import { useNavigate } from "react-router-dom";
import getDateFormat from "../../utils.js/getDateFormat";
import { getName, getNameURL } from "../../utils.js/getName";
import AuthorImage from "../common/AuthorImage";

export default function CardAuthor({ author, likes, createdAt }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(getNameURL(author));
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center capitalize space-x-2">
        <AuthorImage author={author} />

        <div>
          <h5 className="dark:text-slate-500 text-sm">
            <button onClick={handleClick}>{getName(author)}</button>
          </h5>
          <div className="flex items-center text-xs text-slate-700">
            <span>{getDateFormat(createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="text-sm px-2 py-1 text-slate-700">
        <span>{likes?.length} Likes</span>
      </div>
    </div>
  );
}
