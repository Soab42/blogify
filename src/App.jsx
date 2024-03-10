import { BrowserRouter } from "react-router-dom";

import AnimatedRoute from "./routes/AnimatedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostProvider from "./provider/PostProvider";
import AuthProvider from "./provider/AuthProvider";
import ProfileProvider from "./provider/ProfileProvider";
function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PostProvider>
          <AuthProvider>
            <ProfileProvider>
              <AnimatedRoute />
            </ProfileProvider>
          </AuthProvider>
        </PostProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
