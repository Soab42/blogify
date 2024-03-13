import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "../components/common/Layout";
import AddPost from "../components/page/AddPost";
import Home from "../components/page/Home";
import Login from "../components/page/Login";
import PageNotFound from "../components/page/PageNotFound";
import Profile from "../components/page/Profile";
import Registration from "../components/page/Registration";
import SingleBlog from "../components/page/SingleBlog";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function AnimatedRoute() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          {/*for  General user */}
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />

          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/blog/:title" element={<SingleBlog />} />

          {/* only for guest user */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Route>
          {/* only for LoggedIn user */}
          <Route element={<PrivateRoute />}>
            <Route path="/write" element={<AddPost />} />
            <Route path="/update" element={<AddPost />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
