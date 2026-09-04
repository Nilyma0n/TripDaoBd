interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "ink" | "white";
}

const SectionTitle = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "ink",
}: Props) => {
  const toneClasses =
    tone === "white"
      ? { title: "text-white", subtitle: "text-white/70", eyebrow: "text-brass" }
      : { title: "text-ink", subtitle: "text-ink-soft", eyebrow: "text-tea" };

  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center"
          ? "items-center text-center max-w-2xl mx-auto"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div>
        {eyebrow && (
          <p className={`text-sm font-semibold ${toneClasses.eyebrow}`}>
            {eyebrow}
          </p>
        )}
        <h2
          className={`mt-2 text-3xl md:text-4xl font-semibold ${toneClasses.title}`}
        >
          {title}
        </h2>
      </div>

      {subtitle && (
        <p
          className={`max-w-md text-base leading-relaxed ${toneClasses.subtitle} ${
            align === "center" ? "" : "md:text-right"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;