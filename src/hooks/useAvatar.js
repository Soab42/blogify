import { useAuth } from "./useAuth";
import { useProfile } from "./useProfile";

export const useAvatar = (author) => {
  const { auth } = useAuth();
  // const { state } = useProfile();
  const isMe = author?.id === auth?.user?.id;
  const avatar = isMe ? `${auth?.user?.avatar}` : `${author?.avatar}`;

  const avatarURL = `${import.meta.env.VITE_BASE_URL}/uploads/avatar/${avatar}`;
  // console.log(avatarURL);
  return { avatarURL };
};
