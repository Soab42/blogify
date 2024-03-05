import React from "react";
import LwsLogo from "../../assets/logo.svg";
import NightLogo from "../../assets/night.svg";
import DayLogo from "../../assets/day.svg";
import SearchIcon from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import AuthorImage from "./AuthorImage";
import { useAuth } from "../../hooks/useAuth";
import { getName, getNameURL } from "../../utils.js/getName";
export default function Nav() {
  const { auth } = useAuth();
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
              <Link
                to="/write"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
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
            <li className="text-white flex justify-center items-center">
              <img src={NightLogo} alt="night" className=" w-6 m-2" />
              <img src={DayLogo} alt="day" className=" w-6 m-2" />
            </li>
            {!auth.user ? (
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
                <AuthorImage author={auth.user} />
                {/* <!-- Logged-in user's name --> */}
                <Link to={getNameURL(auth.user)}>
                  <span className="text-white ml-2">{getName(auth.user)}</span>
                </Link>
                {/* <!-- Profile Image --> */}
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
