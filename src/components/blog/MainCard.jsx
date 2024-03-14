import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { generatePostURL } from "../../utils.js/generateURL";
import ActionDot from "../common/ActionDot";
import CardAuthor from "./CardAuthor";
import { getBlogImage } from "../../utils.js/getBlogImage";
import { isUser } from "../../utils.js/isUser";
import { useAuth } from "../../hooks/useAuth";
export default function MainCard({ data = {} }) {
  const { auth } = useAuth();
  const isMe = isUser(auth?.user, data?.author?.id);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 100px -50px 0px",
  });
  return (
    <div className="relative">
      <Link to={generatePostURL(data)}>
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
          <img
            className="blog-thumb"
            src={getBlogImage(data.thumbnail)}
            alt=""
          />
          <div className="mt-2 relative">
            <h3 className="dark:text-slate-300 text-xl lg:text-2xl">
              {data.title}
            </h3>
            <p className="mb-6 text-base text-slate-500 mt-1 line-clamp-2">
              {data.content}
            </p>

            <CardAuthor
              author={data.author}
              likes={data.likes}
              createdAt={data.createdAt}
            />
          </div>
        </div>
      </Link>
      {isMe && <ActionDot post={data} />}
    </div>
  );
}
