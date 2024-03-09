import ThreeDotSvg from "../../assets/icons/3dots.svg";
import EditSvg from "../../assets/icons/edit.svg";
import useActive from "../../hooks/useActive";
import { actionModalVariants } from "../animated/variants";
import { AnimatePresence, motion } from "framer-motion";
import DeleteButton from "./DeleteButton";
export default function ActionDot({ postId }) {
  const [active, handleActive] = useActive();
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
            <button className="action-menu-item hover:text-green-400">
              <img src={EditSvg} alt="Edit" />
              Edit
            </button>
            <DeleteButton postId={postId} />
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
