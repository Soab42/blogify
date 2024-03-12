import { useRef } from "react";
import { actions } from "../../actions";
import EditIcon from "../../assets/icons/edit.svg";
import { useAvatar } from "../../hooks/useAvatar";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";
import useActive from "../../hooks/useActive";
import { isUser } from "../../utils.js/isUser";
import { motion } from "framer-motion";
export default function ProfileImage({ author }) {
  const { user, dispatch } = useProfile();
  const { api } = useAxios();
  const fileUploaderRef = useRef();
  const [loading, setLoading] = useActive();
  const isME = isUser(user, author?.id);
  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (const file of fileUploaderRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post("/profile/avatar", formData);
      if (response.status === 200) {
        setLoading(false);

        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data.user.avatar,
        });
      }
    } catch (error) {
      setLoading(false);
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };
  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <div className="w-full h-full text-white grid place-items-center text-5xl rounded-full">
        <AuthorProfileImage author={author} loading={loading} />
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

function AuthorProfileImage({ author = {}, loading }) {
  const { avatarURL } = useAvatar(author);
  return (
    <div className="rounded-full text-white overflow-hidden">
      <motion.div className="size-36 rounded-full object-cover overflow-hidden">
        {author?.avatar ? (
          <img
            src={avatarURL}
            alt={author?.firstName?.slice(0, 1)}
            className="object-cover w-full"
          />
        ) : (
          <span className="bg-orange-600">
            {author?.firstName?.slice(0, 1)}
          </span>
        )}
        {loading && (
          <div className="absolute text-xs left-0 top-0 text-center rounded-full  w-full h-full">
            <div className="mt-12 flex-center text-xl ">
              <motion.p
                className="text-gray-200 drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ delay: 0.1, duration: 1, repeat: Infinity }}
              >
                Uploading
              </motion.p>
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
              className="absolute text-xs -left-4 -top-10 text-center w-full bg-black"
              initial={{ opacity: 0.4, width: "140%" }}
              animate={{
                height: ["10%", "150%", "10%"],
                width: "140%",
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              key={author?.id}
            ></motion.span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
