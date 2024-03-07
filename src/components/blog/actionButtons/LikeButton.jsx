import { useMutation, useQueryClient } from "@tanstack/react-query";
import LikeIconFilled from "../../../assets/icons/like-filled.svg";
import LikeIcon from "../../../assets/icons/like.svg";
import useAxios from "../../../hooks/useAxios";
import { useProfile } from "../../../hooks/useProfile";
import { motion } from "framer-motion";
import { isPresentId } from "../../../utils.js/isPresentId";
export default function LikeButton({ likes, postId }) {
  const queryClient = useQueryClient();
  const { user } = useProfile();

  const { api } = useAxios();
  let isLiked = isPresentId(likes, user?.id);

  const handleLike = async () => {
    try {
      mutation.mutate("like");
    } catch (error) {
      console.log("error", error);
    }
  };
  const mutation = useMutation({
    gcTime: 2000,
    mutationFn: (toggle) => {
      return api.post(`/blogs/${postId}/${toggle}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("blogs", postId);
    },
  });
  return (
    <li>
      <motion.button
        onClick={handleLike}
        whileTap={{ scale: [0.9, 4, 1] }}
        className="relative"
      >
        {isLiked ? (
          <img src={LikeIconFilled} alt="like" />
        ) : (
          <img src={LikeIcon} alt="like" />
        )}
      </motion.button>

      <span>{likes?.length}</span>
    </li>
  );
}
