"use client";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <section style={{ padding: "0 16px" }}>
      <hr className="double" />
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          marginBottom: 16,
        }}
      >
        <span>Copyright &copy; {year} Xiang Chen</span>
      </footer>
    </section>
  );
}
