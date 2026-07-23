export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-6 pt-24 pb-16"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
            Full-stack developer
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Hi, I'm{" "}
            <span className="text-gray-500">Brian</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto md:mx-0">
            I build clean, thoughtful digital experiences on the web.
            Passionate about turning ideas into polished products.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors duration-200"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="inline-block rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-colors duration-200"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* SVG illustration */}
        <div className="flex-1 flex justify-center md:justify-end">
          <svg
            viewBox="0 0 400 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-sm md:max-w-md"
            role="img"
            aria-label="Developer workspace illustration"
          >
            {/* Window frame */}
            <rect
              x="10"
              y="40"
              width="370"
              height="270"
              rx="12"
              className="fill-gray-100 stroke-gray-300"
              strokeWidth="1.5"
            />
            <rect
              x="10"
              y="40"
              width="370"
              height="36"
              rx="12"
              className="fill-gray-200"
            />
            <rect
              x="10"
              y="64"
              width="370"
              height="12"
              className="fill-gray-200"
            />

            {/* Window dots */}
            <circle cx="34" cy="58" r="5" className="fill-gray-400" />
            <circle cx="52" cy="58" r="5" className="fill-gray-300" />
            <circle cx="70" cy="58" r="5" className="fill-gray-300" />

            {/* Code lines */}
            <rect x="40" y="104" width="120" height="6" rx="3" className="fill-gray-300" />
            <rect x="40" y="124" width="80" height="6" rx="3" className="fill-gray-300" />
            <rect x="56" y="144" width="140" height="6" rx="3" className="fill-gray-300" />
            <rect x="56" y="164" width="100" height="6" rx="3" className="fill-gray-300" />
            <rect x="40" y="184" width="170" height="6" rx="3" className="fill-gray-300" />
            <rect x="40" y="204" width="60" height="6" rx="3" className="fill-gray-300" />

            {/* Cursor block */}
            <rect x="208" y="144" width="3" height="6" className="fill-gray-900" />

            {/* Sidebar decoration */}
            <rect x="10" y="76" width="370" height="1" className="fill-gray-200" />
            <rect x="10" y="310" width="370" height="1" className="fill-gray-200" />

            {/* Bottom status bar */}
            <rect x="10" y="298" width="370" height="12" rx="0" className="fill-gray-200" />
            <rect
              x="10"
              y="298"
              width="370"
              height="12"
              rx="0"
              className="fill-gray-200"
            />
            <rect x="20" y="302" width="40" height="4" rx="2" className="fill-gray-400" />
            <rect x="320" y="302" width="50" height="4" rx="2" className="fill-gray-400" />

            {/* Floating decorative elements */}
            <circle cx="340" cy="20" r="6" className="fill-gray-200" />
            <circle cx="360" cy="12" r="3" className="fill-gray-200" />
            <rect x="30" y="14" width="30" height="4" rx="2" className="fill-gray-200" />
          </svg>
        </div>
      </div>
    </section>
  );
}
