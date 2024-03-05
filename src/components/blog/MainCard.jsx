import ActionDot from "../common/ActionDot";
import { Link } from "react-router-dom";
import CardAuthor from "./CardAuthor";
import { useInView } from "framer-motion";
import { useBlogImage } from "../../hooks/useBlogImage";
import { useRef } from "react";
import { generateURL } from "../../utils.js/generateURL";
export default function MainCard({ data = {} }) {
  const { thumbnailLink } = useBlogImage(data.thumbnail);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 100px -50px 0px",
  });
  return (
    <div
      className="blog-card"
      ref={ref}
      style={{
        background: isInView ? "" : "white",
        transform: !isInView ? "translateY(30px)" : "translateX(0px)",
        opacity: isInView ? 1 : 0,
        transition: "all 1s cubic-bezier(0.25, 0.1, 0.25, 1) .1s",
      }}
    >
      <img className="blog-thumb" src={thumbnailLink} alt="" />
      <div className="mt-2 relative">
        <Link to={generateURL("/blog", data.title, data.id)}>
          <h3 className="text-slate-300 text-xl lg:text-2xl">{data.title}</h3>
          <p className="mb-6 text-base text-slate-500 mt-1">{data.content}</p>
        </Link>

        {/* <!-- Meta Informations --> */}
        <CardAuthor
          author={data.author}
          likes={data.likes}
          createdAt={data.createdAt}
        />

        {/* <!-- action dot --> */}
        <ActionDot />
        {/* <!-- action dot ends --> */}
      </div>
    </div>
  );
}
