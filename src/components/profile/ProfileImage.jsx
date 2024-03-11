import { useRef } from "react";
import { actions } from "../../actions";
import EditIcon from "../../assets/icons/edit.svg";
import { useAvatar } from "../../hooks/useAvatar";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";
import { isUser } from "../../utils.js/isUser";
import { motion } from "framer-motion";
export default function ProfileImage({ author }) {
  const { user, dispatch } = useProfile();
  const { api } = useAxios();
  const fileUploaderRef = useRef();
  const isME = isUser(user, author.id);
  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    dispatch({
      type: actions.profile.DATA_FETCHING,
    });
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
      <div className="w-full h-full text-white grid place-items-center text-5xl rounded-full">
        <AuthorProfileImage author={author} />
      </div>

      {isME && (
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
  const { loading } = useProfile();
  console.log(loading);
  return (
    <div className="rounded-full text-white overflow-hidden">
      <motion.div className="size-30 rounded-full object-cover">
        {author?.avatar ? (
          <img
            src={avatarURL}
            alt={author?.firstName?.slice(0, 1)}
            className="object-cover"
          />
        ) : (
          <span className="bg-orange-600">
            {author?.firstName?.slice(0, 1)}
          </span>
        )}
        {loading && (
          <div className="absolute text-xs left-0 top-0 text-center w-full size-32 overflow-hidden rounded-full">
            <div className="mt-12 flex-center">
              <p>Uploading</p>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ delay: 0.1, duration: 1, repeat: Infinity }}
              >
                .
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ delay: 0.4, duration: 1, repeat: Infinity }}
              >
                .
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ delay: 0.6, duration: 1, repeat: Infinity }}
              >
                .
              </motion.span>
            </div>
            <motion.span
              className="absolute text-xs left-0 top-0 text-center w-full bg-black/80"
              initial={{ opacity: 0.2 }}
              animate={{
                height: [10, 120, 10],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              key={author.id}
            ></motion.span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
