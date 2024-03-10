import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { actions } from "../../actions";
import ThreeDotSvg from "../../assets/icons/3dots.svg";
import EditSvg from "../../assets/icons/edit.svg";
import useActive from "../../hooks/useActive";
import { usePost } from "../../hooks/usePost";
import { actionModalVariants } from "../animated/variants";
import DeleteButton from "./DeleteButton";
export default function ActionDot({ post = {} }) {
  const [active, handleActive] = useActive();
  const { dispatch } = usePost();
  const navigate = useNavigate();
  const handleEdit = (post) => {
    dispatch({ type: actions.post.POST_EDITING, data: post });
    navigate("/update");
  };
  return (
    <div className="absolute right-0 top-0">
      <button onClick={handleActive}>
        <img src={ThreeDotSvg} alt="3dots of Action" />
      </button>

      {/* <!-- Action Menus Popup --> */}
      <AnimatePresence>
        {active && (
          <motion.div
            className={`action-modal-container`}
            variants={actionModalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <button
              className="action-menu-item hover:text-green-400"
              onClick={() => handleEdit(post)}
            >
              <img src={EditSvg} alt="Edit" />
              Edit
            </button>
            <DeleteButton postId={post?.id} />
            {/* <button className="action-menu-item hover:text-red-500">
              <img src={DeleteSvg} alt="Delete" />
              Delete
            </button> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
