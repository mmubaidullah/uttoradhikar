import { FaBalanceScale } from "react-icons/fa";

/**
 * SiteLogo — FaBalanceScale inside a styled box
 * variant: "dark" (default, green bg) | "light" (white bg, for dark surfaces)
 */
const SiteLogo = ({ size = 36, variant = "dark" }) => {
  const boxSize = size;
  const iconSize = Math.round(size * 0.52);

  if (variant === "light") {
    return (
      <div
        style={{ width: boxSize, height: boxSize }}
        className="rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0"
      >
        <FaBalanceScale size={iconSize} color="#c9a84c" />
      </div>
    );
  }

  return (
    <div
      style={{ width: boxSize, height: boxSize }}
      className="rounded-lg bg-[#1a4731] flex items-center justify-center flex-shrink-0 shadow-sm"
    >
      <FaBalanceScale size={iconSize} color="#c9a84c" />
    </div>
  );
};

export default SiteLogo;
