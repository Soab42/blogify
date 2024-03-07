import EditIcon from "../../assets/icons/edit.svg";
import { useAvatar } from "../../hooks/useAvatar";
import { useProfile } from "../../hooks/useProfile";

export default function ProfileImage({ author }) {
  const { isUser } = useProfile(author);
  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
        <AuthorProfileImage author={author} />
      </div>

      {isUser && (
        <button className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
          <img src={EditIcon} alt="Edit" />
        </button>
      )}
    </div>
  );
}

function AuthorProfileImage({ author = {} }) {
  const { avatarURL } = useAvatar(author);
  // console.log(author);
  return (
    <div className="rounded-full bg-orange-600 text-white overflow-hidden">
      {author?.avatar ? (
        <img
          src={avatarURL}
          alt={author?.firstName?.slice(-1)}
          className="w-full"
        />
      ) : (
        <span>{author?.firstName?.slice(-1)}</span>
      )}
    </div>
  );
}
