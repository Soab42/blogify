import { BrowserRouter } from "react-router-dom";

import AnimatedRoute from "./routes/AnimatedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostProvider from "./provider/PostProvider";
import AuthProvider from "./provider/AuthProvider";
import ProfileProvider from "./provider/ProfileProvider";
import ThemeProvider from "./provider/ThemeProvider";

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
