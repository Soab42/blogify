import React from "react";
import { Link } from "react-router-dom";
import { getNameURL } from "../../utils.js/getName";
import { generateURL } from "../../utils.js/generateURL";

export default function PopularCard({ data }) {
  return (
    <li>
      <Link
        to={generateURL("/blog", data.title, data.id)}
        className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
      >
        {data.title}
      </Link>
      <p className="text-slate-600 text-sm">
        by
        <Link to={getNameURL(data.author)}>
          {" "}
          {data.author.firstName + "" + data.author.lastName}
        </Link>
        <span>·</span> {data.likes.length} Likes
      </p>
    </li>
  );
}
