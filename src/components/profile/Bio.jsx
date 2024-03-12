import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { actions } from "../../actions";
import EditIcon from "../../assets/icons/edit.svg";
import TickIcon from "../../assets/icons/ok.svg";
import useActive from "../../hooks/useActive";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";
import { isUser } from "../../utils.js/isUser";
import { toast } from "react-toastify";

export default function Bio({ info = {} }) {
  const queryClient = useQueryClient();
  const { user, dispatch } = useProfile(info);
  const [isEdit, setIsEdit] = useActive();
  const [loading, setLoading] = useActive();
  const { api } = useAxios();
  const [bio, setBio] = useState(user?.bio);
  const isMe = isUser(user, info?.id);
  const handleEdit = async () => {
    const updatedUser = { ...user, bio };
    try {
      setLoading(true);

      const res = await api.patch("/profile", { bio });
      if (res.status == 200) {
        queryClient.invalidateQueries("profile", info?.id);
        setLoading(false);

        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: updatedUser,
        });
      }
      setIsEdit();
    } catch (error) {
      console.log("error updating bio", error.message);
      setLoading(false);
      toast(error.message);
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    setBio(user?.bio);
  }, [user?.bio]);

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6 ">
      <div className="flex-1 relative">
        {!isEdit ? (
          <>
            <p className="leading-[188%] relative dark:text-gray-400 lg:text-lg">
              {info.bio}
              {loading && <LoadingLoader loading={loading} />}
            </p>
          </>
        ) : (
          <textarea
            type="text"
            name="bio"
            id="bio"
            rows={4}
            cols={55}
            value={bio}
            className="w-full focus:ring-0 border-none outline-none placeholder:text-lg text-lg pl-0  bg-transparent appearance-none focus:border-none focus:outline-none"
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>

      {isMe && (
        <button className="flex-center h-7 w-7 rounded-full ">
          {!isEdit ? (
            <img src={EditIcon} alt="Edit" onClick={setIsEdit} />
          ) : (
            <img src={TickIcon} alt="ok" onClick={handleEdit} />
          )}
        </button>
      )}
    </div>
  );
}

function LoadingLoader() {
  return (
    <div className="absolute h-20  text-white overflow-hidden backdrop-blur-sm w-full top-0">
      <motion.div className="w-full h-24">
        <div className="absolute text-xs  text-center rounded-full  w-full h-full">
          <div className="mt-8 flex-center text-xl ">
            <motion.p
              className="text-gray-200 text-2xl drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ delay: 0.1, duration: 1, repeat: Infinity }}
            >
              Updating
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
            className="absolute text-xs bg-pink-400 h-full text-center w-full bg-sky-900 top-1 left-0 blur-md"
            initial={{ opacity: 0.2, width: "100%" }}
            animate={{
              rotateX: 360,
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          ></motion.span>
          <motion.span
            className="absolute text-xs bg-pink-400 h-full text-center w-full bg-gray-400 top-1 left-0 blur-md"
            initial={{ opacity: 0.6, width: "100%" }}
            animate={{
              rotateX: 360,
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          ></motion.span>
        </div>
      </motion.div>
    </div>
  );
}
