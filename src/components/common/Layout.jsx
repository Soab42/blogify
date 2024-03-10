import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-[#030317] text-white flex flex-col items-center w-full  relative">
      <Nav />
      <main className="w-full flex justify-center items-center">
        <Outlet />
      </main>
      <div className="w-full text-white border-t border-slate-800 mt-4">
        <Footer />
      </div>
    </div>
  );
}
