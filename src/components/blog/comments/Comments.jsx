import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export default function Comments({ comments, postId }) {
  const { auth } = useAuth();
  // console.log(comments);
  return (
    <section id="comments" className="relative">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments{" "}
          {comments && comments.length > 0 && <span>({comments.length})</span>}
        </h2>

        {auth?.user && <CommentForm postId={postId} />}

        {comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} postId={postId} />
        ))}

        {!auth?.user && (
          <p className="p-4 bg-slate-500/20 text-center rounded-lg">
            To add a comment, please{" "}
            <Link className="font-bold underline text-sky-400" to={"/login"}>
              login
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  );
}
