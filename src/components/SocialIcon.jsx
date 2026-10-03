export default function SocialIcon({
  id,
  icon = `/socials/${id}.svg`,
  className = "",
}) {
  return (
    <span
      className={`social-icon ${className}`}
      data-platform={id}
      style={{ "--social-icon": `url("${icon}")` }}
      aria-hidden="true"
    />
  );
}
