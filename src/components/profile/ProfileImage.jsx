import { useRef } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import { useAvatar } from "../../hooks/useAvatar";
import { useProfile } from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";
export default function ProfileImage({ author }) {
  const { isUser, dispatch } = useProfile(author);
  const { api } = useAxios();
  const fileUploaderRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploaderRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post("/profile/avatar", formData);
      if (response.status === 200) {
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data.user.avatar,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };
  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
        <AuthorProfileImage author={author} />
      </div>

      {isUser && (
        <form id="form" encType="multipart/form-data">
          <button
            className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
            type="submit"
            onClick={handleImageUpload}
          >
            <img src={EditIcon} alt="Edit" />
          </button>
          <input id="file" type="file" ref={fileUploaderRef} hidden />
        </form>
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
          alt={author?.firstName?.slice(0, 1)}
          className="w-full"
        />
      ) : (
        <span>{author?.firstName?.slice(0, 1)}</span>
      )}
    </div>
  );
}
