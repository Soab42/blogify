import LikeIcon from "../../assets/icons/like.svg";
import LikeIconFilled from "../../assets/icons/like-filled.svg";
import FavIcon from "../../assets/icons/heart.svg";
import FavIconFilled from "../../assets/icons/heart-filled.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import { useAuth } from "../../hooks/useAuth";
export default function FloatingAction({ post = {} }) {
  const { likes, comments, isFavourite } = post;
  const { auth } = useAuth();
  console.log(isFavourite);
  const matchingUser = likes?.find((user) => user.id === auth?.user?.id);
  return (
    // <!-- Floating Actions-->
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          {matchingUser ? (
            <img src={LikeIconFilled} alt="like" />
          ) : (
            <img src={LikeIcon} alt="like" />
          )}

          <span>{likes?.length}</span>
        </li>

        <li>
          {/* <!-- There is heart-filled.svg in the icons folder --> */}
          <img src={FavIcon} alt="Favourite" />
          <img src={FavIconFilled} alt="Favourite" />
        </li>
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
