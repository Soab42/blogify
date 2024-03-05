import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./components/page/Home";
import Profile from "./components/page/Profile";
import SingleBlog from "./components/page/SingleBlog";
import AddPost from "./components/page/AddPost";
import PageNotFound from "./components/page/PageNotFound";
import Login from "./components/page/Login";
import Registration from "./components/page/Registration";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/write" element={<AddPost />} />
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/blog/:title" element={<SingleBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
