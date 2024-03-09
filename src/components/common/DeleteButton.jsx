import DeleteSvg from "../../assets/icons/delete.svg";
import useAxios from "../../hooks/useAxios.js";
import { usePost } from "../../hooks/usePost.js";
import { actions } from "../../actions/index.js";
import { useQueryClient } from "@tanstack/react-query";
import { useProfile } from "../../hooks/useProfile";
export default function DeleteButton({ postId }) {
  const queryClient = useQueryClient();
  const { dispatch } = usePost();
  const { user } = useProfile();
  const { api } = useAxios();
  const handleDeletePost = async () => {
    dispatch({
      type: actions.post.DATA_FETCHING,
    });
    try {
      const res = await api.delete(`blogs/${postId}`);

      if (res.status === 200) {
        dispatch({
          type: actions.post.POST_DELETED,
          data: postId,
        });
        queryClient.invalidateQueries("profile", user.id);
      }
    } catch (error) {
      console.error(error.response.data.error);
    }
  };
  return (
    <button
      className="action-menu-item hover:text-red-500"
      onClick={handleDeletePost}
    >
      <img src={DeleteSvg} alt="Delete" />
      Delete
    </button>
  );
}