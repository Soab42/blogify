import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "../components/common/Layout";
import PageNotFound from "../components/page/PageNotFound";
import Home from "../components/page/Home";
import Login from "../components/page/Login";
import Registration from "../components/page/Registration";
import PrivateRoute from "./PrivateRoute";
import AddPost from "../components/page/AddPost";
import Profile from "../components/page/Profile";
import SingleBlog from "../components/page/SingleBlog";
import { AnimatePresence } from "framer-motion";
import PublicRoute from "./PublicRoute";
export default function AnimatedRoute() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/write" element={<AddPost />} />
          </Route>
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/blog/:title" element={<SingleBlog />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
