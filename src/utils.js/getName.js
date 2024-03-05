export function getName(author) {
  return author?.firstName + " " + author?.lastName;
}

export function getNameURL(author) {
  return (
    "/profile/" +
    (author?.firstName.toLowerCase() + "-" + author?.lastName.toLowerCase())
  );
}
