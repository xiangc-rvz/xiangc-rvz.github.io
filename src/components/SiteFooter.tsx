export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <>
      <section style={{ padding: "0 16px" }}>
        <hr />
        <footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            marginBottom: 16,
          }}
        >
          <span>
            Copyright &copy; {year} Xiang Chen
          </span>
        </footer>
      </section>

      {/* Static noise bar */}
      <StaticBar />
    </>
  );
}

function StaticBar() {
  return (
    <canvas
      id="static-canvas"
      style={{ display: "block", width: "100%", height: 56, imageRendering: "pixelated" }}
      ref={(canvas) => {
        if (!canvas) return;
        canvas.width = 200;
        canvas.height = 20;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let raf: number;
        let last = 0;
        function draw(ts: number) {
          if (!ctx || !canvas) return;
          if (ts - last > 80) {
            last = ts;
            const img = ctx.createImageData(canvas.width, canvas.height);
            for (let i = 0; i < img.data.length; i += 4) {
              const v = Math.random() > 0.5 ? 255 : 0;
              img.data[i] = v;
              img.data[i + 1] = v;
              img.data[i + 2] = v;
              img.data[i + 3] = 255;
            }
            ctx.putImageData(img, 0, 0);
          }
          raf = requestAnimationFrame(draw);
        }
        raf = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(raf);
      }}
    />
  );
}
