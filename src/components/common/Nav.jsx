import React from "react";
import LwsLogo from "../../assets/logo.svg";
import NightLogo from "../../assets/night.svg";
import DayLogo from "../../assets/day.svg";
import SearchIcon from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import AuthorImage from "./AuthorImage";
import { useAuth } from "../../hooks/useAuth";
import { getName, getNameURL } from "../../utils.js/getName";
import { useUser } from "../../hooks/useUser";
import ProfileNavigation from "../profile/ProfileNavigation";
import { useActive } from "../../hooks/useActive";
export default function Nav() {
  const { user } = useUser();
  const [active, handleActive] = useActive();
  // console.log(auth);
  return (
    <header className=" w-full flex justify-center sticky top-0 z-30 bg-inherit">
      <nav className="container">
        {/* <!-- Logo --> */}
        <div>
          <Link to="/">
            <img className="w-32" src={LwsLogo} alt="lws" />
          </Link>
        </div>

        {/* <!-- Actions - Login, Write, Home, Search --> */}
        {/* <!-- Notes for Developers --> */}
        {/* <!-- For Logged in User - Write, Profile, Logout Menu --> */}
        {/* <!-- For Not Logged in User - Login Menu --> */}
        <div>
          <ul className="flex items-center space-x-5">
            <li>
              {user && (
                <Link
                  to="/write"
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Write
                </Link>
              )}
            </li>
            <li>
              <Link
                to="#search"
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={SearchIcon} alt="Search" />
                <span>Search</span>
              </Link>
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
            {!user ? (
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
                {/* <AuthorImage author={user} /> */}
                {/* <!-- Logged-in user's name --> */}
                {/* <Link to={getNameURL(user)}>
                  <span className="text-white ml-2">{getName(user)}</span>
                </Link> */}
                <ProfileNavigation user={user} />
                {/* <!-- Profile Image --> */}
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
