import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import AuthProvider from "../../provider/AuthProvider";
import ProfileProvider from "../../provider/ProfileProvider";
import PostProvider from "../../provider/PostProvider";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function Layout() {
  return (
    <div className="bg-[#030317] text-white flex flex-col items-center w-full  relative">
      <QueryClientProvider client={queryClient}>
        <PostProvider>
          <AuthProvider>
            <ProfileProvider>
              <Nav />
              <main className="w-full flex justify-center items-center">
                <Outlet />
              </main>
              <div className="w-full text-white border-t border-slate-800 mt-4">
                <Footer />
              </div>
            </ProfileProvider>
          </AuthProvider>
        </PostProvider>
      </QueryClientProvider>
    </div>
  );
}
