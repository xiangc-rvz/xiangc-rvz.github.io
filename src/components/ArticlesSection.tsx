import Image from "next/image";

const articles = [
  {
    title: "7 Principles of Icon Design",
    description:
      "What makes quality icons? Clarity, readability, alignment, brevity, consistency, personality, and ease of use.",
    image: "/images/article-7-principles-16-9@2x.png",
    imageAlt: "Diagram of line icons illustrating their use of good design principles",
    link: "https://uxdesign.cc/7-principles-of-icon-design-e7187539e4a2",
  },
  {
    title: "3 Classic Icon Families",
    description:
      "Celebrate the power of iconography through 3 achievements in modern design: Olympics pictograms, Unimark's design of the NYC Transit System, and the GUI of the original Macintosh.",
    image: "/images/article-3-classic-16-9@2x.png",
    imageAlt:
      "Examples of icons from the NYC Transit System, Olympic Games, and the original Macintosh computer",
    link: "https://medium.com/swlh/3-classic-icon-families-f5026ed923dd",
  },
  {
    title: "Icon Grids & Keylines Demystified",
    description:
      "A breakdown of icon grids — purpose, anatomy, and in-depth examples from iOS, Material, IBM, and Phosphor for Android.",
    image: "/images/article-icon-grids-16-9@2x.png",
    imageAlt: "A smiley-face icon placed on a grid illustrating its proportions",
    link: "https://medium.com/@minoraxis/icon-grids-keylines-demystified-5a228fe08cfd",
  },
  {
    title: "Foundations of Iconography",
    description:
      "What are icons? What are their benefits and what are they used to achieve? Get an overview here.",
    image: "/images/article-foundations-16-9@2x.png",
    imageAlt: "Specimens of an email icon, a globe icon, and a fingerprint icon",
    link: "https://uxdesign.cc/foundations-of-iconography-f95d7233a3e6",
  },
];

export function ArticlesSection() {
  return (
    <section style={{ padding: "0 16px" }}>
      <hr className="double" />

      {/* Section heading */}
      <div className="section-heading">
        <figure style={{ width: 24, height: 24, flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/article-medium.svg" alt="" style={{ width: 24, height: 24 }} />
        </figure>
        <h2>Articles</h2>
      </div>

      {/* 4-column article grid */}
      <div className="columns" style={{ alignItems: "flex-start" }}>
        {articles.map((article, i) => (
          <article key={i} className={`column grayscale-hover`} style={{ padding: i === 0 ? "0 12px 0 0" : i === articles.length - 1 ? "0 0 0 12px" : "0 12px" }}>
            <Image
              src={article.image}
              alt={article.imageAlt}
              width={648}
              height={365}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <h3 className="article-title">{article.title}</h3>
            <p style={{ marginBottom: 0 }}>{article.description}</p>
            <div className="external-link">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/arrow-circle-up-right-fill.svg" alt="" className="icon-24" />
              <a href={article.link} className="highlight">
                Read on Medium
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
