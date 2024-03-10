export const useBlogImage = (link) => {
  let thumbnailLink;
  if (typeof link === "string") {
    thumbnailLink = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/uploads/blog/${link}`;
  }
  return { thumbnailLink };
};
