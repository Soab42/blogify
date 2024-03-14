import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./provider/AuthProvider";
import PostProvider from "./provider/PostProvider";
import ProfileProvider from "./provider/ProfileProvider";
import ThemeProvider from "./provider/ThemeProvider";
import AnimatedRoute from "./routes/AnimatedRoute";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <PostProvider>
            <AuthProvider>
              <ProfileProvider>
                <AnimatedRoute />
              </ProfileProvider>
            </AuthProvider>
          </PostProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
