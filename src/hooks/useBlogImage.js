export const useBlogImage = (link) => {
  const thumbnailLink = `${
    import.meta.env.VITE_SERVER_BASE_URL
  }/uploads/blog/${link}`;
  // console.log(thumbnailLink);
  return { thumbnailLink };
};
