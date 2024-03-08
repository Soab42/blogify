import { useEffect } from "react";
import LwsLogo from "../../assets/logo.svg";
import NightLogo from "../../assets/night.svg";
import DayLogo from "../../assets/day.svg";
import SearchIcon from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ProfileNavigation from "../profile/ProfileNavigation";
import useActive from "../../hooks/useActive";
import { useProfile } from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";
export default function Nav() {
  const { auth } = useAuth();
  const [active, handleActive] = useActive();
  const { dispatch } = useProfile();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`);
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    auth?.user?.id && fetchProfile();
  }, [auth?.user?.id]);

  return (
    <header className=" w-full flex justify-center sticky top-0 z-30 bg-inherit">
      <nav className="container">
        {/* <!-- Logo --> */}
        <div>
          <Link to="/">
            <img className="w-32" src={LwsLogo} alt="lws" />
          </Link>
        </div>

        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                to="/write"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
            </li>
            <li>
              {auth?.user && (
                <Link
                  to="#search"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img src={SearchIcon} alt="Search" />
                  <span>Search</span>
                </Link>
              )}
            </li>
            <li
              className="text-white flex justify-center items-center cursor-pointer"
              onClick={handleActive}
            >
              {active ? (
                <img src={NightLogo} alt="night" className=" w-6 m-2" />
              ) : (
                <img src={DayLogo} alt="day" className=" w-6 m-2" />
              )}
            </li>

            {/*  */}
            {!auth?.user ? (
              <li>
                <Link
                  to="/login"
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className="flex items-center">
                <ProfileNavigation user={auth?.user} />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
