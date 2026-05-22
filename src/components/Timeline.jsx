const academicItems = [
  {
    period: 'February 2020 - February 2023',
    logo: 'https://www.google.com/s2/favicons?domain=anandacollege.edu.lk&sz=128',
    title: 'Ananda College',
    subtitle: 'Advanced Level - Commerce',
    description:
      'Completed Advanced Level studies in the Commerce stream, building the foundation for business, marketing, and management studies.',
  },
  {
    period: 'April 2023',
    logo: 'https://www.google.com/s2/favicons?domain=sitc.lk&sz=128',
    title: 'SITC Campus',
    subtitle: 'Diploma in Cyber Security',
    description:
      'Completed a Cyber Security Diploma and gained foundational knowledge in Digital Security and Technology.',
  },
  {
    period: 'April 2024 - Present',
    logo: 'https://www.google.com/s2/favicons?domain=cardiffmet.ac.uk&sz=128',
    title: 'Cardiff Metropolitan University',
    subtitle: 'HD in Computer Software Engineering',
    description:
      'Started software engineering studies, building technical knowledge in programming, web development, and software concepts.',
  },
  {
    period: 'Present',
    logo: 'https://www.google.com/s2/favicons?domain=ruh.ac.lk&sz=128',
    title: 'University of Ruhuna',
    subtitle: 'Bachelor of Business Administration - BBA',
    description:
      'Following Business Administration and Management studies with a focus on Marketing, Business strategy, and Digital growth.',
  },
]

const certificateItems = [
  {
    category: 'AI + SEO',
    logo: 'https://www.google.com/s2/favicons?domain=skillup.online&sz=128',
    title: 'AI SEO: Mastering Generative Engine Optimization (GEO)',
    platform: 'SkillUp',
    link: 'https://coursera.org/share/85c6d10b1609d88af77cf81486f228d7',
    description:
      'Focused on Generative Engine Optimization and how AI-powered search changes digital visibility.',
  },
  {
    category: 'Digital Marketing',
    logo: 'https://www.google.com/s2/favicons?domain=digitalmarketinginstitute.com&sz=128',
    title: 'Digital Marketing Strategy and Planning',
    platform: 'Digital Marketing Institute',
    link: 'https://coursera.org/share/92e0da0ee1d42b548f53e07c69df0534',
    description:
      'Covered digital marketing planning, strategic thinking, and campaign direction.',
  },
  {
    category: 'AI Marketing',
    logo: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=128',
    title: 'Generative AI for Marketers',
    platform: 'Microsoft',
    link: 'https://coursera.org/share/54cffe95f18142f58b38832f3d777b2a',
    description:
      'Explored how generative AI can support marketers with content, customer insights, and creative workflows.',
  },
  {
    category: 'Operations',
    logo: 'https://www.google.com/s2/favicons?domain=london.ac.uk&sz=128',
    title: 'Operations Systems Excellence',
    platform: 'University of London',
    link: 'https://coursera.org/share/6eb83a1826318c1a589816e2d1625885',
    description:
      'Learned about operations systems, process thinking, and improving organizational performance.',
  },
  {
    category: 'Marketing Culture',
    logo: 'https://www.google.com/s2/favicons?domain=london.ac.uk&sz=128',
    title: 'Consumption, Marketing and Culture',
    platform: 'University of London',
    link: 'https://coursera.org/share/465323157955f8943d4b628182e37281',
    description:
      'Explored the relationship between consumer behavior, culture, and marketing communication.',
  },
  {
    category: 'Back-End Development',
    logo: 'https://www.google.com/s2/favicons?domain=mongodb.com&sz=128',
    title: 'Node.js & MongoDB: Developing Back-end Database Applications',
    platform: 'MongoDB / Back-End Development',
    link: 'https://coursera.org/share/33262eaf1bfc972ff5b22c46dc7539bc',
    description:
      'Covered back-end application development using Node.js and MongoDB database concepts.',
  },
]

function LogoBox({ src, alt, fallback }) {
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#4DDCFF]/22 bg-white/[0.06] p-3 backdrop-blur-md"
      style={{
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.12), 0 0 34px rgba(77,220,255,0.12)',
      }}
    >
      <img
        src={src}
        alt={alt}
        className="h-12 w-12 object-contain"
        loading="lazy"
        onError={event => {
          event.currentTarget.style.display = 'none'
          event.currentTarget.nextSibling.style.display = 'flex'
        }}
      />

      <span className="hidden h-full w-full items-center justify-center rounded-xl bg-[#4DDCFF]/10 text-center text-[10px] font-black leading-tight text-[#4DDCFF]">
        {fallback}
      </span>
    </div>
  )
}

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative min-h-screen overflow-hidden bg-[#050605] px-5 py-24 text-white md:px-[4.8vw] md:py-32"
    >
      {/* Main background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 12% 18%, rgba(77,220,255,0.20) 0%, rgba(77,220,255,0.08) 26%, transparent 48%), radial-gradient(circle at 88% 34%, rgba(77,220,255,0.16) 0%, rgba(77,220,255,0.05) 28%, transparent 52%), linear-gradient(115deg, #020b12 0%, #050605 44%, #071014 72%, #050605 100%)',
        }}
      />

      {/* Blue line grid */}
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

      {/* Secondary grid */}
      <div
        className="pointer-events-none absolute left-1/2 top-[8%] h-[105vh] w-[110vw] -translate-x-1/2"
        style={{
          zIndex: 0,
          opacity: 0.11,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px)',
          backgroundSize: '144px 144px',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.68) 52%, transparent 86%)',
          maskImage:
            'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.68) 52%, transparent 86%)',
        }}
      />

      {/* Glow blobs */}
      <div
        className="pointer-events-none absolute left-[-12%] top-[20%] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(77,220,255,0.20) 0%, rgba(77,220,255,0.08) 38%, transparent 72%)',
        }}
      />

      <div
        className="pointer-events-none absolute right-[-12%] top-[52%] h-[620px] w-[620px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(77,220,255,0.18) 0%, rgba(77,220,255,0.06) 42%, transparent 75%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#4DDCFF]/80">
            Timeline
          </p>

          <h1
            className="max-w-[900px] text-[44px] font-black leading-[0.96] text-white md:text-[82px]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            My academic journey and learning milestones.
          </h1>

          <p className="mt-6 max-w-[720px] text-[16px] leading-[1.85] text-white/62">
            A clean timeline of my education background and selected online credentials that support my direction in digital marketing, data, AI, and technology.
          </p>
        </div>

        {/* Academic Journey */}
        <div className="mb-20">
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#4DDCFF]/75">
              Academic
            </p>

            <h2 className="text-3xl font-black text-white md:text-5xl">
              Academic Journey
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#4DDCFF]/45 to-transparent md:left-1/2" />

            <div className="grid gap-7">
              {academicItems.map((item, index) => {
                const isLeft = index % 2 === 0

                return (
                  <article
                    key={`${item.title}-${item.period}`}
                    className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                      isLeft ? '' : 'md:[&>div]:col-start-2'
                    }`}
                  >
                    <div className="absolute left-5 top-8 z-20 h-4 w-4 -translate-x-1/2 rounded-full border border-[#4DDCFF] bg-[#050605] shadow-[0_0_28px_rgba(77,220,255,0.55)] md:left-1/2" />

                    <div
                      className="group relative ml-10 overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.045] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#4DDCFF]/45 md:ml-0 md:p-7"
                      style={{
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,0.08), 0 26px 90px rgba(0,0,0,0.36), 0 0 60px rgba(77,220,255,0.05)',
                      }}
                    >
                      <div
                        className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            'radial-gradient(circle, rgba(77,220,255,0.22) 0%, rgba(77,220,255,0.08) 42%, transparent 72%)',
                        }}
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-70" />

                      <div className="relative z-10">
                        <div className="mb-6 flex items-center gap-4">
                          <LogoBox
                            src={item.logo}
                            alt={`${item.title} logo`}
                            fallback={item.title}
                          />

                          <div>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#4DDCFF]/75">
                              {item.period}
                            </p>

                            <h3 className="text-2xl font-black text-white md:text-3xl">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        <span className="mb-5 inline-flex rounded-full border border-[#4DDCFF]/30 bg-[#4DDCFF]/10 px-4 py-2 text-sm font-semibold text-[#4DDCFF]">
                          {item.subtitle}
                        </span>

                        <p className="text-[15px] leading-[1.85] text-white/64">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#4DDCFF]/75">
              Credentials
            </p>

            <h2 className="text-3xl font-black text-white md:text-5xl">
              Coursera Credentials
            </h2>

            <p className="mt-4 max-w-[680px] text-[15px] leading-[1.85] text-white/60">
              Selected online credentials connected to digital marketing, AI, operations, culture, and back-end development.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {certificateItems.map(item => (
              <article
                key={item.link}
                className="group relative overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.045] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#4DDCFF]/45"
                style={{
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.08), 0 26px 90px rgba(0,0,0,0.36), 0 0 60px rgba(77,220,255,0.05)',
                }}
              >
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(77,220,255,0.22) 0%, rgba(77,220,255,0.08) 42%, transparent 72%)',
                  }}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-70" />

                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-4">
                    <LogoBox
                      src={item.logo}
                      alt={`${item.platform} logo`}
                      fallback={item.platform}
                    />

                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#4DDCFF]/75">
                        {item.category}
                      </p>

                      <h3 className="text-xl font-black leading-tight text-white md:text-2xl">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mb-5 flex flex-wrap gap-3">
                    <span className="rounded-full border border-[#4DDCFF]/30 bg-[#4DDCFF]/10 px-4 py-2 text-sm font-semibold text-[#4DDCFF]">
                      {item.platform}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/55">
                      Coursera Credential
                    </span>
                  </div>

                  <p className="mb-7 text-[15px] leading-[1.85] text-white/64">
                    {item.description}
                  </p>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/70 transition-all duration-300 hover:border-[#4DDCFF]/35 hover:text-[#4DDCFF]"
                  >
                    View Credential
                    <span>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}