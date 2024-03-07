import { useProfile } from "./useProfile";

export const useAvatar = (author) => {
  const { user } = useProfile();

  // const { state } = useProfile();
  const isMe = author?.id === user?.id;
  const avatar = isMe ? `${user?.avatar}` : `${author?.avatar}`;

  const avatarURL = `${
    import.meta.env.VITE_SERVER_BASE_URL
  }/uploads/avatar/${avatar}`;
  // console.log(avatarURL);
  return { avatarURL };
};
