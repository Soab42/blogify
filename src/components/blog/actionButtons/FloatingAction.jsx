import LikeButton from "./LikeButton";
import FavButton from "./FavButton";
import CommentsButton from "./CommentsButton";

export default function FloatingAction({ post = {} }) {
  const { likes, comments, id } = post;

  return (
    <div className="floating-action" style={{ position: "fixed" }}>
      <ul className="floating-action-menus">
        <LikeButton likes={likes} postId={id} />
        {/* Favourite button */}
        <FavButton postId={id} />
        {/* Comments button */}
        <CommentsButton commentsLength={comments?.length} />
      </ul>
    </div>
  );
}
