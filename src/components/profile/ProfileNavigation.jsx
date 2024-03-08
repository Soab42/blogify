// import LogoutSvg from "../../assets/icons/logout.svg";
import LogoutSvg from "../../assets/icons/logout2.svg";
// import UserSvg from "../../assets/icons/user.svg";
import UserSvg from "../../assets/icons/user-heart.svg";
import useActive from "../../hooks/useActive";
import AuthorImage from "../common/AuthorImage";
import { getName, getNameURL } from "../../utils.js/getName";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useSessionCookie from "../../hooks/useSessionCookie";
import { useProfile } from "../../hooks/useProfile";
import { actions } from "../../actions";
import { AnimatePresence, motion } from "framer-motion";
import { actionModalVariants } from "../animated/variants";
export default function ProfileNavigation({ user }) {
  const [active, handleActive] = useActive();
  const { removeCookie } = useSessionCookie("auth");
  const { setAuth } = useAuth();
  const { dispatch } = useProfile();
  const handleSignOut = () => {
    removeCookie("auth");
    setAuth(null);
    dispatch({ type: actions.profile.DATA_FETCHED, data: null });
  };
  return (
    <div className="w-full relative">
      <button
        className="text-white ml-2 relative flex-center gap-2"
        onClick={handleActive}
      >
        <AuthorImage author={user} />
        <span>{getName(user)}</span>
      </button>
      {/* <!-- Action Menus Popup --> */}
      <AnimatePresence>
        {/* right-0 top-12 */}
        {active && (
          <motion.div
            className={`action-modal-container right-0 top-12`}
            variants={actionModalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={handleActive}
          >
            <Link to={getNameURL(user)}>
              <button className="action-menu-item hover:text-green-400  duration-500">
                <img src={UserSvg} alt="UserSvg" width={30} />
                <span> Profile</span>
              </button>
            </Link>
            <button
              className="action-menu-item hover:text-red-500 duration-500"
              onClick={handleSignOut}
            >
              <img src={LogoutSvg} alt="LogoutSvg" width={30} />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
