import { useBlogImage } from "../../hooks/useBlogImage";
// import Image from "../../assets/blogs/React-Roadmap.jpg";
export default function BlogImage({ thumbnail }) {
  const { thumbnailLink } = useBlogImage(thumbnail);
  return (
    <img
      className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
      src={thumbnailLink}
      alt=""
    />
  );
}
