import React from "react";
import { useAvatar } from "../../hooks/useAvatar";
import { useProfile } from "../../hooks/useProfile";

export default function AuthorImage({ author = {} }) {
  const { avatarURL } = useAvatar(author);
  // console.log(author);
  return (
    <div className="avater-img bg-orange-600 text-white overflow-hidden">
      {author?.avatar ? (
        <img
          src={avatarURL}
          alt={author?.firstName?.slice(0, 1)}
          className="w-full"
        />
      ) : (
        <span>{author?.firstName?.slice(0, 1)}</span>
      )}
    </div>
  );
}
