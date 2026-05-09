interface FordOvalLogoProps {
  className?: string;
}

/**
 * Standalone Ford oval logo. Pure SVG so it renders crisply at any
 * size without an external asset dependency.
 */
export function FordOvalLogo({ className = 'h-9 w-9' }: FordOvalLogoProps) {
  return (
    <svg
      viewBox="0 0 100 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <ellipse cx="50" cy="30" rx="48" ry="26" fill="#0f3a8e" stroke="#1e40af" strokeWidth="2" />
      <text
        x="50"
        y="38"
        textAnchor="middle"
        fontFamily="'Geist', 'Inter', system-ui, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="#ffffff"
        letterSpacing="2"
      >
        Ford
      </text>
    </svg>
  );
}
