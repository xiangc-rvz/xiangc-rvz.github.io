"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { projectHref } from "@/lib/projects";

export function DesignSection() {
  const { lang } = useLang();
  const heading = lang === "en" ? "Research Projects" : "研究项目";
  const viewProject = lang === "en" ? "View project" : "查看项目";
  const fthHref = projectHref(lang, "fourth-trimester-health");
  const fth = lang === "en"
    ? {
        title: "Fourth Trimester Health",
        body: "Developing a wearable and environmental sensor system for the postpartum period. In collaboration with Honda Research Institute.",
      }
    : {
        title: "Fourth Trimester Health",
        body: "为产后阶段开发可穿戴与环境传感系统。与 Honda Research Institute 合作。",
      };

  return (
    <section className="research-home-section" style={{ padding: "0 16px" }}>
      <hr className="double" />

      {/* Section heading */}
      <div className="section-heading">
        <span className="research-section-square" aria-hidden="true" />
        <h2>{heading}</h2>
      </div>

      {/* ── Fourth Trimester Health: text (4/12) | image (8/12) ── */}
      <div className="columns reverse-mobile" style={{ alignItems: "stretch" }}>
        {/* Text summary — left 1/3 */}
        <div className="column is-4" style={{ padding: "0 12px 0 0" }}>
          <h3 className="article-title">{fth.title}</h3>
          <p>{fth.body}</p>
          <div className="external-link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/arrow-circle-up-right-fill.svg" alt="" className="icon-24" />
            <Link href={fthHref} className="highlight">
              {viewProject}
            </Link>
          </div>
        </div>

        {/* Image — right 2/3 */}
        <div className="column grayscale-hover" style={{ padding: "0 0 0 12px" }}>
          <Link href={fthHref} style={{ display: "block" }}>
            <Image
              src="/images/fourth-trimester-health-cover.png"
              alt="Fourth Trimester Health research project cover"
              width={980}
              height={490}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Link>
        </div>
      </div>

      <hr />

      {/* ── Row 2: TRI (half) | Waze | PayPal ── */}
      <div className="columns" style={{ alignItems: "flex-start" }}>
        {/* TRI — half width */}
        <article className="column is-half grayscale-hover" style={{ padding: "0 12px 0 0" }}>
          <Image
            src="/images/design-tri-2-1@2x.png"
            alt="Prototype design for the user interface of an autonomous car"
            width={648}
            height={324}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <h3 className="article-title">Toyota Research Institute</h3>
          <p>
            Toyota Research Institute is Toyota&apos;s Bay Area research arm, advancing
            autonomous driving technology through on-road testing and demonstrations.
            From 2017 to 2019, I partnered with their UX team to:
          </p>
          <ul style={{ paddingLeft: 16, marginBottom: 0 }}>
            <li>Build demos to showcase research and point of view on autonomy</li>
            <li>Build debug interfaces for Field Operations to test vehicles on the road</li>
            <li>Conduct user studies around safety, trust, and situation awareness</li>
            <li>Solve UX challenges re: vehicle intervention and driver agency</li>
            <li>Imagine the future of multi-modal, AI-powered driving</li>
            <li>Architect principles of behavior for in-car AI</li>
            <li>Unify TRI&apos;s internal design language</li>
          </ul>
          <div className="external-link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/arrow-circle-up-right-fill.svg" alt="" className="icon-24" />
            <a href="https://youtu.be/T4S5gHUB7_Y" className="highlight">
              CEO Gill Pratt on TRI&apos;s vision
            </a>
          </div>
        </article>

        {/* Vertical divider — hidden on mobile */}
        <hr className="col-divider" />

        {/* Waze */}
        <article className="column grayscale-hover" style={{ padding: "0 12px" }}>
          <Image
            src="/images/design-waze-3-2@2x.png"
            alt="Two illustrated Wazers laughing and winking at each other"
            width={648}
            height={432}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <h3 className="article-title">Waze</h3>
          <p>
            Around the world, millions of people use Waze to get to their destination
            &ldquo;faster, smoother, safer, and happier.&rdquo; (
            <a href="https://www.waze.com/about" className="highlight">
              Source
            </a>
            )
          </p>
          <p>
            Last year, I collaborated with this quirky navigation brand to improve the
            core product experience and shepherd in a rebrand outlined by Pentagram. We
            built a home for documentation as well as tools for contributors to get up and
            running quickly.
          </p>
          <div className="external-link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/arrow-circle-up-right-fill.svg" alt="" className="icon-24" />
            <a href="https://www.freeassociation.is/work/waze/" className="highlight">
              Read the case study
            </a>
          </div>
        </article>

        {/* Vertical divider — hidden on mobile */}
        <hr className="col-divider" />

        {/* PayPal */}
        <article className="column grayscale-hover" style={{ padding: "0 0 0 12px" }}>
          <Image
            src="/images/design-paypal-3-2@2x.png"
            alt="A table view of recent payments made through the PayPal app"
            width={648}
            height={432}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <h3 className="article-title">PayPal</h3>
          <p>PayPal has been making online payments safe and easy since the early aughts.</p>
          <p>
            In 2019, I helped the design system team refresh PayPal&apos;s guidelines from the
            ground up. We audited design patterns across the org, architected the navigation and
            page structure, revised the writing, and created new visual aids.
          </p>
          <p>
            Within 4 months, we brought more clarity to their design language and increased
            team velocity by 4x.
          </p>
          <div className="external-link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/arrow-circle-up-right-fill.svg" alt="" className="icon-24" />
            <a href="https://www.paypal.com/" className="highlight">
              PayPal
            </a>
          </div>
        </article>
      </div>

      <hr />

      {/* ── Row 3: SoulCycle | Phosphor Android (half) | Prolific ── */}
      <div className="columns" style={{ alignItems: "flex-start" }}>
        {/* SoulCycle */}
        <article className="column grayscale-hover" style={{ padding: "0 12px 0 0" }}>
          <Image
            src="/images/design-soulcycle-1-1@2x.png"
            alt="Booking screen of the SoulCycle mobile app"
            width={648}
            height={648}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <h3 className="article-title">SoulCycle</h3>
          <p>SoulCycle is a high-energy, boutique spinning class with a cult following.</p>
          <p>
            In 2015 and 2016, I designed for their iOS and web experiences. SoulCycle for
            iOS created an enormous lift in class bookings, helping riders get out of the
            app and onto their favorite bike.
          </p>
          <div className="external-link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/arrow-circle-up-right-fill.svg" alt="" className="icon-24" />
            <a href="https://soul-cycle.com/" className="highlight">
              SoulCycle
            </a>
          </div>
        </article>

        {/* Vertical divider */}
        <hr className="col-divider" />

        {/* Phosphor for Android — half width */}
        <article className="column is-half grayscale-hover" style={{ padding: "0 12px" }}>
          <Image
            src="/images/design-phosphor-android-2-1@2x.png"
            alt="Composition of icons from the Phosphor Cadmium icon pack for Android, on a flat-style phone frame"
            width={648}
            height={324}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <h3 className="article-title">Phosphor for Android</h3>
          <p>
            For Android users who enjoy theming their phone,{" "}
            <a href="https://tobiasfried.com" className="highlight">
              Toby Fried
            </a>{" "}
            and I created a family of line-style icon packs to achieve a simple, friendly
            look. Our first release went live in 2019. Today, we provide 900 icons (and
            counting!) in 4 colors.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0 16px" }}>
            <div className="external-link" style={{ marginTop: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/arrow-circle-up-right-fill.svg" alt="" className="icon-24" />
              <a
                href="https://play.google.com/store/apps/details?id=com.tobiasfried.phosphor.mercury"
                className="highlight"
              >
                Phosphor (white)
              </a>
            </div>
            <div className="external-link" style={{ marginTop: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/arrow-circle-up-right-fill.svg" alt="" className="icon-24" />
              <a
                href="https://play.google.com/store/apps/details?id=com.tobiasfried.phosphor.cadmium"
                className="highlight"
              >
                Phosphor Cadmium (red)
              </a>
            </div>
            <div className="external-link" style={{ marginTop: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/arrow-circle-up-right-fill.svg" alt="" className="icon-24" />
              <a
                href="https://play.google.com/store/apps/details?id=com.tobiasfried.phosphor"
                className="highlight"
              >
                Phosphor Carbon (black)
              </a>
            </div>
            <div className="external-link" style={{ marginTop: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/arrow-circle-up-right-fill.svg" alt="" className="icon-24" />
              <a
                href="https://play.google.com/store/apps/details?id=com.tobiasfried.phosphor.krypton"
                className="highlight"
              >
                Phosphor Krypton (green)
              </a>
            </div>
          </div>
        </article>

        {/* Vertical divider */}
        <hr className="col-divider" />

        {/* Prolific Interactive */}
        <article className="column" style={{ padding: "0 0 0 12px" }}>
          <Image
            src="/images/design-prolific-1-1@2x.png"
            alt="Team page of the Prolific Interactive website, with profile photos of several employees"
            width={648}
            height={648}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <h3 className="article-title">Prolific Interactive</h3>
          <p>
            In 2015, I spearheaded a brand refresh to better reflect the spirit of
            Prolific Interactive, a mobile-focused product agency.
          </p>
          <p>
            The initiative took us through core values, brand identity, tone of voice,
            internal documents, and culminated in a new website to showcase our team and
            our work. We rolled out the refresh in just 6 months.
          </p>
        </article>
      </div>

      <hr />

      {/* ── Full-width Phosphor for Android banner ── */}
      <figure style={{ margin: 0, lineHeight: 0 }}>
        <a
          href="https://play.google.com/store/apps/details?id=com.tobiasfried.phosphor.mercury"
          className="grayscale-hover"
          style={{ display: "block" }}
        >
          <Image
            src="/images/phosphor-for-android-6-1@2x.png"
            alt="Composition of black line-style icons on a yellow background, with the logo of Phosphor for Android"
            width={1320}
            height={220}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </a>
      </figure>
    </section>
  );
}
