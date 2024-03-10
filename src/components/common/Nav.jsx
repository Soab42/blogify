import LwsLogo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ProfileNavigation from "./navbar/ProfileNavigation";
import ThemeNevigation from "./navbar/ThemeNevigation";
import SearchButton from "./navbar/SearchButton";
export default function Nav() {
  const { auth } = useAuth();

  return (
    <header className=" w-full flex justify-center sticky top-0 z-[100] bg-inherit">
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

            {auth?.user && <SearchButton />}
            <ThemeNevigation />
            <ProfileNavigation user={auth?.user} />
          </ul>
        </div>
      </nav>
    </header>
  );
}
