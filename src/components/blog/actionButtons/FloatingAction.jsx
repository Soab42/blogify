import React, { useState } from "react";
import LikeButton from "./LikeButton";
import FavButton from "./FavButton";
import CommentsButton from "./CommentsButton";
import LoginButton from "../../../assets/icons/login.png";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function FloatingAction({ post = {} }) {
  const { likes, comments, id } = post;
  const { auth } = useAuth();
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showLoginButton2, setShowLoginButton2] = useState(false);

  const handleMouseEnter = () => {
    if (!auth?.user?.id) {
      setShowLoginButton(true);
    }
  };
  const handleMouseEnter2 = () => {
    if (!auth?.user?.id) {
      setShowLoginButton2(true);
    }
  };
  const handleMouseLeave = () => {
    setShowLoginButton(false);
  };
  const handleMouseLeave2 = () => {
    setShowLoginButton2(false);
  };
  return (
    <div className="floating-action" style={{ position: "fixed" }}>
      <ul className="floating-action-menus">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer"
        >
          <LikeButton likes={likes} postId={id} />
          {showLoginButton && (
            <Link to={"/login"}>
              <img
                src={LoginButton}
                alt="login"
                width={45}
                height={20}
                className="dark:bg-slate-100 rounded"
                style={{ position: "absolute", top: "-4px" }}
              />
            </Link>
          )}
        </div>
        <div
          onMouseEnter={handleMouseEnter2}
          onMouseLeave={handleMouseLeave2}
          className="cursor-pointer"
        >
          <FavButton postId={id} />

          {showLoginButton2 && (
            <Link to={"/login"}>
              <img
                src={LoginButton}
                alt="login"
                width={46}
                height={20}
                className="dark:bg-slate-100 rounded bg-opacity-20"
                style={{ position: "absolute", top: "-4px", right: "70px" }}
              />
            </Link>
          )}
        </div>
        {/* Favourite button */}
        {/* Comments button */}
        <CommentsButton commentsLength={comments?.length} />
      </ul>
    </div>
  );
}
