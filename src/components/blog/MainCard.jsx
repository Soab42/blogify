import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useBlogImage } from "../../hooks/useBlogImage";
import { useProfile } from "../../hooks/useProfile";
import { generatePostURL } from "../../utils.js/generateURL";
import ActionDot from "../common/ActionDot";
import CardAuthor from "./CardAuthor";
export default function MainCard({ data = {} }) {
  const { thumbnailLink } = useBlogImage(data.thumbnail);
  const { isUser } = useProfile(data.author);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 100px -50px 0px",
  });
  return (
    <div
      className="blog-card"
      ref={ref}
      key={data.id}
      style={{
        background: isInView ? "" : "white",
        transform: !isInView ? "translateY(30px)" : "translateX(0px)",
        opacity: isInView ? 1 : 0,
        transition: "all 1s cubic-bezier(0.25, 0.1, 0.25, 1) .1s",
      }}
    >
      <img className="blog-thumb" src={thumbnailLink} alt="" />
      <div className="mt-2 relative">
        <Link to={generatePostURL(data)}>
          <h3 className="text-slate-300 text-xl lg:text-2xl">{data.title}</h3>
          <p className="mb-6 text-base text-slate-500 mt-1 line-clamp-2">
            {data.content}
          </p>
        </Link>

        <CardAuthor
          author={data.author}
          likes={data.likes}
          createdAt={data.createdAt}
        />

        {isUser && <ActionDot postId={data.id} />}
      </div>
    </div>
  );
}
