const workItems = [
  {
    category: 'Industry Experience',
    logo: '/logos/lagops.png',
    title: 'Lagops Digital',
    role: 'Digital Marketing Intern',
    period: 'Sep 2025 - Current',
    description:
      'I handle Facebook page management, create customer flyers, and support digital marketing content for different businesses.',

    folder: 'lagops',
  },

  {
    category: 'University Clubs',
    logo: '/logos/aesthetic.png',
    title: 'Aesthetic Association',
    role: 'Editor',
    period: 'University of Ruhuna',
    description:
      'I create flyers for campus events, special days, and major association activities including Aurora 2026. I also support the club Facebook page.',

    folder: 'aesthetic',
  },

  {
    category: 'University Clubs',
    logo: '/logos/leo.png',
    title: 'Leo Club',
    role: 'Editor - Safeguard Project',
    period: 'University Club Project',
    description:
      'I worked as an editor for the Safeguard project, which focused on awareness about accidents and safety-related education.',

    folder: 'leo',
  },

  {
    category: 'University Clubs',
    logo: '/logos/zeroplastic.png',
    title: 'Zero Plastic',
    role: 'Graphic Designer - Thirasara Dakma',
    period: 'University Sustainability Project',
    description:
      'I worked as a graphic designer and created several designs for sustainability-focused awareness activities.',

    folder: 'zeroplastic',
  },
]

/* AUTO GET ALL IMAGES */
const allImages = import.meta.glob(
  '/public/work/**/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
  }
)

export default function Work() {
  return (
    <section
      id="work"
      className="relative min-h-screen overflow-hidden bg-[#050605] px-5 py-24 text-white md:px-[4.8vw] md:py-32"
    >
      {/* Main dark + blue background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 12% 18%, rgba(77,220,255,0.20) 0%, rgba(77,220,255,0.08) 26%, transparent 48%), radial-gradient(circle at 88% 34%, rgba(77,220,255,0.16) 0%, rgba(77,220,255,0.05) 28%, transparent 52%), linear-gradient(115deg, #020b12 0%, #050605 44%, #071014 72%, #050605 100%)',
        }}
      />

      {/* Blue Grid */}
      <div
        className="pointer-events-none absolute left-1/2 top-[5%] h-[115vh] w-[115vw] -translate-x-1/2"
        style={{
          zIndex: 0,
          opacity: 0.34,
          backgroundImage:
            'linear-gradient(rgba(77,220,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(77,220,255,0.22) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.82) 46%, rgba(0,0,0,0.42) 68%, transparent 88%)',
          maskImage:
            'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.82) 46%, rgba(0,0,0,0.42) 68%, transparent 88%)',
        }}
      />

      {/* White Grid */}
      <div
        className="pointer-events-none absolute left-1/2 top-[8%] h-[105vh] w-[110vw] -translate-x-1/2"
        style={{
          zIndex: 0,
          opacity: 0.11,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px)',
          backgroundSize: '144px 144px',
        }}
      />

      {/* Glow */}
      <div
        className="pointer-events-none absolute left-[-12%] top-[18%] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(77,220,255,0.20) 0%, rgba(77,220,255,0.08) 38%, transparent 72%)',
        }}
      />

      <div
        className="pointer-events-none absolute right-[-12%] top-[42%] h-[600px] w-[600px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(77,220,255,0.18) 0%, rgba(77,220,255,0.06) 42%, transparent 75%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        {/* Heading */}
        <div className="mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#4DDCFF]/80">
            Work
          </p>

          <h1
            className="max-w-[860px] text-[44px] font-black leading-[0.96] text-white md:text-[82px]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Experience through Brands, Clubs, and Creative Projects.
          </h1>

          <p className="mt-6 max-w-[680px] text-[16px] leading-[1.85] text-white/62">
            A collection of my industry experience and university club
            contributions, including digital marketing, page handling,
            awareness campaigns, and creative work.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8">
          {workItems.map((item) => {
            /* AUTO FILTER IMAGES */
            const images = Object.keys(allImages)
              .filter((path) =>
                path.includes(`/work/${item.folder}/`)
              )
              .sort()

            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-[38px] border border-white/12 bg-white/[0.045] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#4DDCFF]/45 md:p-8"
                style={{
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.08), 0 26px 90px rgba(0,0,0,0.36), 0 0 60px rgba(77,220,255,0.05)',
                }}
              >
                {/* Glow blobs */}
                <div
                  className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-70 blur-2xl"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(77,220,255,0.22) 0%, rgba(77,220,255,0.08) 42%, transparent 72%)',
                  }}
                />

                <div
                  className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full opacity-55 blur-2xl"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(77,220,255,0.06) 44%, transparent 74%)',
                  }}
                />

                {/* Shine */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-70" />

                <div className="relative z-10 grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
                  {/* Left */}
                  <div>
                    <div className="mb-7 flex items-center gap-4">
                      <div
                        className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#4DDCFF]/22 bg-white/[0.06] p-3"
                        style={{
                          boxShadow:
                            'inset 0 1px 0 rgba(255,255,255,0.12), 0 0 34px rgba(77,220,255,0.12)',
                        }}
                      >
                        <img
                          src={item.logo}
                          alt=""
                          className="h-12 w-12 object-contain"
                        />
                      </div>

                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#4DDCFF]/75">
                          {item.category}
                        </p>

                        <h2 className="text-2xl font-black text-white md:text-4xl">
                          {item.title}
                        </h2>
                      </div>
                    </div>

                    <div className="mb-7 flex flex-wrap gap-3">
                      <span className="rounded-full border border-[#4DDCFF]/30 bg-[#4DDCFF]/10 px-4 py-2 text-sm font-semibold text-[#4DDCFF] shadow-[0_0_24px_rgba(77,220,255,0.10)]">
                        {item.role}
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/60">
                        {item.period}
                      </span>
                    </div>

                    <p className="max-w-[640px] text-[15px] leading-[1.9] text-white/68 md:text-[16px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Dynamic Images */}
                  <div
                    className={`grid gap-3 ${
                      images.length === 1
                        ? 'grid-cols-1'
                        : images.length === 2
                        ? 'grid-cols-2'
                        : images.length === 3
                        ? 'grid-cols-3'
                        : 'grid-cols-2 md:grid-cols-3'
                    }`}
                  >
                    {images.map((imagePath, imageIndex) => (
                      <div
                        key={imageIndex}
                        className={`relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] transition-all duration-500 hover:-translate-y-1 hover:border-[#4DDCFF]/45 ${
                          images.length >= 3 && imageIndex === 0
                            ? 'col-span-2 row-span-2'
                            : ''
                        }`}
                        style={{
                          boxShadow:
                            imageIndex === 0
                              ? '0 22px 55px rgba(77,220,255,0.13)'
                              : '0 12px 34px rgba(77,220,255,0.09)',
                        }}
                      >
                        <img
                          src={imagePath.replace('/public', '')}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050605]/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}