import BlogTags from "./BlogTags";

export default function DemoBlog({ image, title, tags, content }) {
  return (
    <section>
      <div className="text-center py-8">
        <h1 className="font-bold text-3xl md:text-5xl">{title}</h1>

        {image && (
          <img
            className="mx-auto w-full md:w-8/12 object-contain h-80 md:h-96"
            src={image}
            alt={title}
          />
        )}
        {tags && <BlogTags tags={tags} />}

        <div
          className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 text-justify"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </section>
  );
}
