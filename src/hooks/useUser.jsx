import { useContext } from "react";
import { AuthContext } from "../context";

export const useUser = (author) => {
  const { auth } = useContext(AuthContext);
  const user = auth?.user;
  const isUser = user && user?.id === author?.id;

  return { user, isUser };
};
