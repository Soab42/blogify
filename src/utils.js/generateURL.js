export const generatePostURL = (baseURL, title, id) => {
  const sanitizedTitle = title?.replace(/\s+/g, "-").replace(/[\s,!?|]/g, "");
  return `${baseURL}/${sanitizedTitle}-${id}`;
};
