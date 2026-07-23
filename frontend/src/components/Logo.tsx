interface LogoProps {
  className?: string;
  iconOnlyOnMobile?: boolean;
  onClick?: () => void;
}

export default function Logo({
  className = "",
  iconOnlyOnMobile = false,
  onClick,
}: LogoProps) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 text-gray-900 dark:text-white transition-transform duration-200 hover:scale-105"
        aria-hidden="true"
      >
        {/* Outer square */}
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="10"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* B */}
        <path
          d="
          M18 16
          V48

          M18 16
          H30
          C36 16 39 20 39 24
          C39 29 35 32 30 32

          M18 32
          H31
          C37 32 41 35 41 40
          C41 45 37 48 30 48
          H18
          "
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* K */}
        <path
          d="
          M46 16
          V48

          M46 32
          L56 16

          M46 32
          L57 48
          "
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        className={`text-base sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white ${
          iconOnlyOnMobile ? "hidden sm:block" : "block"
        }`}
      >
        Brian <span className="text-gray-500 dark:text-gray-400 font-medium">Kimathi</span>
      </div>
    </div>
  );
}
