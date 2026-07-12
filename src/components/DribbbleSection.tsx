import Image from "next/image";

const shots = [
  {
    title: "Pop-Up Shop Live",
    image: "/images/dribbble-stop-asian-hate-16-9@2x.png",
    imageAlt:
      "Vector illustration of discarded bowl of chicken wings and rice left on the sidewalk",
    link: "https://dribbble.com/shots/15518575-Pop-Up-Shop-Live",
  },
  {
    title: "Numbers",
    image: "/images/dribbble-numbers-16-9@2x.png",
    imageAlt: "Digits zero through nine in a bubbly but slim font",
    link: "https://dribbble.com/shots/10869796-Numbers",
  },
  {
    title: "Bunnimoji",
    image: "/images/dribbble-bunnimoji-16-9@2x.png",
    imageAlt:
      "Line illustration of three bunnies, two wearing sunglasses and the third with a blank stare",
    link: "https://dribbble.com/shots/3651481-Bunnimoji",
  },
];

export function DribbbleSection() {
  return (
    <section style={{ padding: "0 16px" }}>
      <hr className="double" />

      {/* Section heading */}
      <div className="section-heading">
        <figure style={{ width: 24, height: 24, flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/dribbble-logo.svg" alt="" style={{ width: 24, height: 24 }} />
        </figure>
        <h2>Snapshots from Dribbble</h2>
      </div>

      {/* 3-column grid */}
      <div className="columns" style={{ alignItems: "flex-start" }}>
        {shots.map((shot, i) => (
          <article
            key={i}
            className="column grayscale-hover"
            style={{
              padding:
                i === 0 ? "0 12px 0 0" : i === shots.length - 1 ? "0 0 0 12px" : "0 12px",
            }}
          >
            <Image
              src={shot.image}
              alt={shot.imageAlt}
              width={648}
              height={365}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <h3 className="article-title">{shot.title}</h3>
            <div className="external-link">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/arrow-circle-up-right-fill.svg" alt="" className="icon-24" />
              <a href={shot.link} className="highlight">
                View on Dribbble
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
