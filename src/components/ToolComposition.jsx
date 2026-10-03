import { toolLogos, disciplineLogos } from "../data/tools";

export default function ToolComposition({ discipline, className = "" }) {
  return (
    <div
      className={`tool-composition tool-composition-${discipline} ${className}`}
      aria-hidden="true"
    >
      {disciplineLogos[discipline].map((id) => (
        <span className={`tool-object tool-object-${id}`} key={id}>
          <img src={`/tools/${id}.svg`} alt={toolLogos[id]} loading="lazy" />
        </span>
      ))}
    </div>
  );
}
