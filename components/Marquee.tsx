const ITEMS = [
  "LAND FITNESS",
  "PREMIUM GYM",
  "24 / 7 OPEN",
  "CHILONZOR",
  "SERGELI",
  "500+ MEMBERS",
  "TOP COACHES",
  "TOSHKENT",
];

const Dot = () => (
  <span
    className="inline-block w-1.5 h-1.5 rounded-full mx-5 shrink-0 align-middle"
    style={{ background: "var(--gold)", opacity: 0.5 }}
  />
);

export default function Marquee() {
  const row = ITEMS.flatMap((item, i) => [
    <span
      key={`item-${i}`}
      className="text-xs font-black tracking-[0.25em] uppercase whitespace-nowrap shrink-0"
      style={{ color: "var(--gold)" }}
    >
      {item}
    </span>,
    <Dot key={`dot-${i}`} />,
  ]);

  return (
    <div
      className="w-full overflow-hidden py-3.5 border-y"
      style={{
        background:   "var(--bg-card)",
        borderColor:  "var(--border)",
      }}
    >
      {/* Fade masks */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--bg-card), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--bg-card), transparent)" }}
        />

        <div className="flex overflow-hidden">
          <div className="marquee-inner flex items-center">
            {/* Duplicate to create seamless loop */}
            {row}
            {row}
          </div>
        </div>
      </div>
    </div>
  );
}
