const skillGroups = [
  {
    category: 'Digital Marketing',
    description:
      'Skills focused on growing brands, planning campaigns, and handling digital platforms with a marketing mindset.',
    skills: [
      {
        name: 'Meta Ads',
        level: 'Learning',
        logo: 'https://img.icons8.com/color/96/meta.png',
      },
      {
        name: 'SEO',
        level: 'Learning',
        logo: 'https://img.icons8.com/color/96/google-logo.png',
      },
      {
        name: 'Content Marketing',
        level: 'Learning',
        logo: 'https://img.icons8.com/color/96/content.png',
      },
      {
        name: 'Social Media Marketing',
        level: 'Learning',
        logo: 'https://img.icons8.com/color/96/share--v1.png',
      },
      {
        name: 'Marketing Strategy',
        level: 'Learning',
        logo: 'https://img.icons8.com/color/96/combo-chart--v1.png',
      },
      {
        name: 'Branding',
        level: 'Learning',
        logo: 'https://img.icons8.com/color/96/registered-trademark.png',
      },
      {
        name: 'Facebook Page Handling',
        level: 'Learning',
        logo: 'https://img.icons8.com/color/96/facebook-new.png',
      },
      {
        name: 'Campaign Planning',
        level: 'Learning',
        logo: 'https://img.icons8.com/color/96/planner.png',
      },
    ],
  },
  {
    category: 'Data & Analytics',
    description:
      'Tools and skills that support data-backed decision making, reporting, and future data science direction.',
    skills: [
      {
        name: 'Excel',
        level: 'Good',
        logo: 'https://img.icons8.com/color/96/microsoft-excel-2019--v1.png',
      },
      {
        name: 'Power BI',
        level: 'Learning',
        logo: 'https://img.icons8.com/color/96/power-bi.png',
      },
      {
        name: 'Python',
        level: 'Learning',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
      {
        name: 'SQL',
        level: 'Good',
        logo: 'https://img.icons8.com/color/96/sql.png',
      },
      {
        name: 'Data Visualization',
        level: 'Learning',
        logo: 'https://img.icons8.com/color/96/area-chart.png',
      },
    ],
  },
  {
    category: 'Creative Tools',
    description:
      'Design and content creation tools I use to create flyers, social media creatives, and visual content.',
    skills: [
      {
        name: 'Canva',
        level: 'Good',
        logo: 'https://img.icons8.com/fluency/96/canva.png',
      },
      {
        name: 'Photoshop',
        level: 'Good',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
      },
      {
        name: 'Illustrator',
        level: 'Learning',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
      },
      {
        name: 'Premiere Pro',
        level: 'Learning',
        logo: 'https://img.icons8.com/color/96/adobe-premiere-pro--v1.png',
      },
      {
        name: 'CapCut',
        level: 'Good',
        logo: 'https://img.icons8.com/color/96/capcut.png',
      },
      {
        name: 'Flyer Design',
        level: 'Good',
        logo: 'https://img.icons8.com/color/96/design.png',
      },
      {
        name: 'Social Media Post Design',
        level: 'Good',
        logo: 'https://img.icons8.com/color/96/instagram-new--v1.png',
      },
    ],
  },
  {
    category: 'Web / Tech',
    description:
      'Technical skills I am learning to support web projects, portfolio building, and digital product development.',
    skills: [
      {
        name: 'JavaScript',
        level: 'Learning',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      },
      {
        name: 'React',
        level: 'Learning',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Tailwind CSS',
        level: 'Learning',
        logo: 'https://img.icons8.com/color/96/tailwindcss.png',
      },
      {
        name: 'Node.js',
        level: 'Learning',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      },
      {
        name: 'MongoDB',
        level: 'Learning',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      },
    ],
  },
]

function getLevelStyle(level) {
  if (level === 'Good') {
    return 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
  }

  return 'border-[#4DDCFF]/30 bg-[#4DDCFF]/10 text-[#4DDCFF]'
}

function getFallbackLetters(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen overflow-hidden bg-[#050605] px-5 py-24 text-white md:px-[4.8vw] md:py-32"
    >
      {/* Main blue background */}
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

      {/* Blue glow blobs */}
      <div
        className="pointer-events-none absolute left-[-12%] top-[20%] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          zIndex: 0,
          background:
            'radial-gradient(circle, rgba(77,220,255,0.20) 0%, rgba(77,220,255,0.08) 38%, transparent 72%)',
        }}
      />

      <div
        className="pointer-events-none absolute right-[-12%] top-[50%] h-[620px] w-[620px] rounded-full blur-3xl"
        style={{
          zIndex: 0,
          background:
            'radial-gradient(circle, rgba(77,220,255,0.18) 0%, rgba(77,220,255,0.06) 42%, transparent 75%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        {/* Header */}
        <div className="mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#4DDCFF]/80">
            Skills
          </p>

          <h1
            className="max-w-[880px] text-[44px] font-black leading-[0.96] text-white md:text-[82px]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Skills built around marketing, data, creativity, and tech.
          </h1>

          <p className="mt-6 max-w-[700px] text-[16px] leading-[1.85] text-white/62">
            My current skill direction is focused on becoming a data-driven digital marketer who can combine marketing strategy, creative execution, analytics, and modern web knowledge.
          </p>
        </div>

        {/* Focus cards */}
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#4DDCFF]/75">
              Main focus
            </p>
            <h3 className="text-2xl font-black text-white">
              Digital Marketing
            </h3>
          </div>

          <div className="rounded-[28px] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#4DDCFF]/75">
              Direction
            </p>
            <h3 className="text-2xl font-black text-white">
              Data Science
            </h3>
          </div>

          <div className="rounded-[28px] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#4DDCFF]/75">
              Strength
            </p>
            <h3 className="text-2xl font-black text-white">
              Creative Execution
            </h3>
          </div>
        </div>

        {/* Skill groups */}
        <div className="grid gap-7">
          {skillGroups.map(group => (
            <article
              key={group.category}
              className="group relative overflow-hidden rounded-[38px] border border-white/12 bg-white/[0.045] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#4DDCFF]/45 md:p-8"
              style={{
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.08), 0 26px 90px rgba(0,0,0,0.36), 0 0 60px rgba(77,220,255,0.05)',
              }}
            >
              {/* Apple style bubble effect */}
              <div
                className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle, rgba(77,220,255,0.22) 0%, rgba(77,220,255,0.08) 42%, transparent 72%)',
                }}
              />

              <div
                className="pointer-events-none absolute -right-24 bottom-[-90px] h-72 w-72 rounded-full opacity-55 blur-2xl transition-opacity duration-500 group-hover:opacity-95"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(77,220,255,0.06) 44%, transparent 74%)',
                }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-70" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#4DDCFF]/75">
                    Skill area
                  </p>

                  <h2 className="mb-5 text-3xl font-black text-white md:text-5xl">
                    {group.category}
                  </h2>

                  <p className="max-w-[460px] text-[15px] leading-[1.85] text-white/62">
                    {group.description}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {group.skills.map(skill => (
                    <div
                      key={skill.name}
                      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#4DDCFF]/35"
                    >
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
                        style={{
                          background:
                            'radial-gradient(circle at 80% 10%, rgba(77,220,255,0.12), transparent 42%)',
                        }}
                      />

                      <div className="relative z-10 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] p-2">
                          <img
                            src={skill.logo}
                            alt={`${skill.name} logo`}
                            className="h-8 w-8 object-contain"
                            loading="lazy"
                            onError={event => {
                              event.currentTarget.style.display = 'none'
                              event.currentTarget.nextSibling.style.display = 'block'
                            }}
                          />

                          <span className="hidden text-sm font-black text-[#4DDCFF]">
                            {getFallbackLetters(skill.name)}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-base font-bold text-white">
                            {skill.name}
                          </h3>

                          <span
                            className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getLevelStyle(
                              skill.level
                            )}`}
                          >
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}