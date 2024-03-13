import { useEffect, useState } from "react";
import { useAvatar } from "../../hooks/useAvatar";
import { generateColor } from "../../utils.js/generateColor";

export default function AuthorImage({ author = {} }) {
  const [nameBackgroundColor, setNameBackgroundColor] = useState("");
  const { avatarURL } = useAvatar(author);

  // Effect to generate the color once on component mount
  useEffect(() => {
    if (author.firstName) {
      const color = generateColor(author.firstName);
      setNameBackgroundColor(color);
    }
  }, [author.firstName]);

  return (
    <div className="avater-img bg-orange-600 text-white overflow-hidden">
      {author?.avatar ? (
        <img
          src={avatarURL}
          alt={author?.firstName?.slice(0, 1)}
          className="w-full h-full rounded-full"
        />
      ) : (
        <span
          className="bg-orange-500 w-full h-full flex-center"
          style={{ backgroundColor: nameBackgroundColor }}
        >
          {author?.firstName?.slice(0, 1)}
        </span>
      )}
    </div>
  );
}
