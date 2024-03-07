import { useContext } from "react";
import { ProfileContext } from "../context";

export const useProfile = (user) => {
  const { state, dispatch } = useContext(ProfileContext);
  const isUser = user && user?.id === state?.user?.id;
  return { user: state?.user, state, dispatch, isUser };
};
