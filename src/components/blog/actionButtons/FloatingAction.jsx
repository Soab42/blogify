import { useProfile } from "../../../hooks/useProfile";
import CommentIcon from "../../../assets/icons/comment.svg";

import LikeButton from "./LikeButton";
import FavButton from "./FavButton";

export default function FloatingAction({ post = {} }) {
  // const queryClient = useQueryClient();
  const { likes, comments, id } = post;

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <LikeButton likes={likes} postId={id} />

        {/* Favourite button */}
        <FavButton postId={id} />

        {/* Comments button */}
        <a href="#comments">
          <li>
            <img src={CommentIcon} alt="Comments" />
            <span>{comments?.length}</span>
          </li>
        </a>
      </ul>
    </div>
  );
}
