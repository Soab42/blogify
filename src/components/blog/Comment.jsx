import AuthorImage from "../common/AuthorImage";
import { Link } from "react-router-dom";
import { getName, getNameURL } from "../../utils.js/getName";

export default function Comment({ comment }) {
  const { author, content, id } = comment;
  return (
    <div className="flex items-start space-x-4 my-8">
      <AuthorImage author={author} />

      <div className="w-full">
        <Link to={getNameURL(author)} className="text-slate -500 font-bold">
          {getName(author)}
        </Link>

        <p className="text-slate-300">{content}</p>
      </div>
    </div>
  );
}
