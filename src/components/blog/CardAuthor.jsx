import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../common/AuthorImage";

export default function CardAuthor({ author, likes, createdAt }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center capitalize space-x-2">
        <AuthorImage author={author} />

        <div>
          <h5 className="text-slate-500 text-sm">
            <Link to="/profile/saad">Saad Hasan</Link>
          </h5>
          <div className="flex items-center text-xs text-slate-700">
            <span>{createdAt}</span>
          </div>
        </div>
      </div>

      <div className="text-sm px-2 py-1 text-slate-700">
        <span>{likes?.length} Likes</span>
      </div>
    </div>
  );
}
