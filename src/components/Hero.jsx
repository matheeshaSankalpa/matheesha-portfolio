import { useState, useEffect } from 'react'
import { personal } from '../data/content'

const roles = ['Marketer', 'Developer', 'Tech + Business', 'Problem Solver']

export default function Hero() {
  const [text, setText] = useState('')
  const [rIndex, setRIndex] = useState(0)
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = roles[rIndex]

    if (typing) {
      if (text.length < current.length) {
        const timer = setTimeout(() => setText(current.slice(0, text.length + 1)), 70)
        return () => clearTimeout(timer)
      }

      const timer = setTimeout(() => setTyping(false), 1800)
      return () => clearTimeout(timer)
    }

    if (text.length > 0) {
      const timer = setTimeout(() => setText(text.slice(0, -1)), 35)
      return () => clearTimeout(timer)
    }

    setRIndex(index => (index + 1) % roles.length)
    setTyping(true)
  }, [text, typing, rIndex])

  const socials = [
    {
      href: personal.linkedin,
      label: 'LinkedIn',
      svg: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      href: personal.github,
      label: 'GitHub',
      svg: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      href: personal.medium,
      label: 'Medium',
      svg: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      ),
    },
  ]

  const displayName = personal.name
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-[#050605] text-white">
      {/* Main background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 10% 32%, rgba(77,220,255,0.30) 0%, rgba(30,150,220,0.13) 26%, transparent 47%), radial-gradient(circle at 88% 30%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.07) 18%, transparent 40%), linear-gradient(115deg, #071000 0%, #040504 42%, #090b08 70%, #151815 100%)',
        }}
      />

      {/* Low opacity grid behind the person */}
      <div
        className="absolute left-1/2 top-[9%] h-[70vh] w-[72vw] -translate-x-1/2 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0.34,
          backgroundImage:
            'linear-gradient(rgba(77,220,255,0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(77,220,255,0.20) 1px, transparent 1px)',
          backgroundSize: '68px 68px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.85) 42%, rgba(0,0,0,0.45) 62%, transparent 82%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.85) 42%, rgba(0,0,0,0.45) 62%, transparent 82%)',
        }}
      />

      <div
        className="absolute left-1/2 top-[10%] h-[68vh] w-[72vw] -translate-x-1/2 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0.16,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)',
          backgroundSize: '136px 136px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.62) 52%, transparent 84%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.62) 52%, transparent 84%)',
        }}
      />

      {/* Desktop */}
      <div className="relative hidden min-h-[100svh] md:block">
        <div className="pointer-events-none absolute left-0 right-0 top-[18%] z-10 select-none text-center">
          <h1
            className="font-black leading-[0.82] text-white"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(70px, 8.8vw, 168px)',
              letterSpacing: '-0.02em',
              wordSpacing: '0.46em',
              textTransform: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {displayName}
          </h1>
        </div>

        <div className="absolute left-[4.8vw] top-[67%] z-30 w-[min(26vw,450px)] -translate-y-1/2 rounded-[24px] border border-white/15 bg-white/[0.035] px-10 py-10 backdrop-blur-md">
          <p className="text-[16px] leading-[1.9] text-white/88 lg:text-[18px]">
            {personal.bio}
          </p>

          <div className="mt-9 flex items-center gap-5">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#4DDCFF]/35 text-[#4DDCFF] transition-all duration-300 hover:-translate-y-1 hover:bg-[#4DDCFF] hover:text-[#071000]"
                style={{ boxShadow: '0 0 28px rgba(77,220,255,0.10)' }}
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        <div className="absolute right-[5vw] top-[61%] z-30 w-[min(27vw,470px)] -translate-y-1/2 rounded-[24px] border border-white/15 bg-white/[0.04] px-10 py-10 backdrop-blur-md">
          <div className="mb-7 text-[26px] font-bold leading-tight text-white lg:text-[30px]">
            {text}<span className="text-[#4DDCFF]">|</span>
          </div>

          <p className="mb-9 text-[16px] leading-[1.85] text-white/78 lg:text-[18px]">
            Merging software engineering with business thinking to build things that don't just look great — they perform effortlessly.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-5 rounded-full px-8 py-4 text-[16px] font-bold text-[#071000] transition-all duration-300 hover:-translate-y-1"
            style={{ background: '#4DDCFF', boxShadow: '0 18px 45px rgba(156,255,0,0.24)', textDecoration: 'none' }}
          >
            Let's Talk
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-[#071000]">↗</span>
          </a>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 w-[min(43vw,720px)] -translate-x-1/2">
          <img
            src={personal.photo}
            alt={personal.name}
            className="block w-full"
            style={{
              objectFit: 'contain',
              objectPosition: 'center bottom',
              filter: 'contrast(1.06) brightness(0.95) saturate(1.03)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 72%, rgba(0,0,0,0.9) 84%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 0%, black 72%, rgba(0,0,0,0.9) 84%, transparent 100%)',
            }}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[30vh]"
          style={{ background: 'linear-gradient(to top, #050605 0%, rgba(5,6,5,0.94) 28%, rgba(5,6,5,0.5) 62%, transparent 100%)' }}
        />
      </div>

      {/* Mobile */}
      <div className="relative min-h-[100svh] overflow-hidden px-5 pb-7 pt-24 md:hidden">
        <div className="pointer-events-none relative z-10 select-none text-center">
          <h1
            className="font-black leading-[0.9] text-white"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(44px, 12vw, 64px)',
              letterSpacing: '-0.025em',
              textTransform: 'none',
            }}
          >
            <span className="block">{displayName.split(' ')[0]}</span>
            <span className="block">{displayName.split(' ').slice(1).join(' ')}</span>
          </h1>
        </div>

        <div className="pointer-events-none absolute bottom-[30vh] left-1/2 z-20 w-[min(92vw,430px)] -translate-x-1/2">
          <img
            src={personal.photo}
            alt={personal.name}
            className="block w-full"
            style={{
              objectFit: 'contain',
              objectPosition: 'center bottom',
              filter: 'contrast(1.06) brightness(0.95) saturate(1.03)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 76%, rgba(0,0,0,0.88) 86%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 0%, black 76%, rgba(0,0,0,0.88) 86%, transparent 100%)',
            }}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[43vh]"
          style={{ background: 'linear-gradient(to top, #050605 0%, rgba(5,6,5,0.96) 30%, rgba(5,6,5,0.55) 68%, transparent 100%)' }}
        />

        <div className="absolute inset-x-5 bottom-6 z-40 rounded-[34px] border border-white/15 bg-white/[0.045] px-5 py-7 text-center backdrop-blur-md">
          <div className="mb-4 text-[34px] font-black leading-tight text-white">
            {text}<span className="text-[#4DDCFF]">|</span>
          </div>

          <p className="mx-auto mb-6 max-w-[340px] text-[16px] leading-[1.75] text-white/82">
            {personal.bio}
          </p>

          <div className="flex justify-center gap-5">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#4DDCFF]/35 text-[#4DDCFF]"
                style={{ boxShadow: '0 0 28px rgba(77,220,255,0.12)' }}
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* About - under Home */}
      <div id="about" className="relative z-30 px-5 pb-24 pt-10 md:px-[4.8vw] md:pb-28 md:pt-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#4DDCFF]/80">
                About me
              </p>
              <h2
                className="max-w-[760px] text-[42px] font-black leading-[0.98] text-white md:text-[72px]"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Digital Marketing Mind. Data Science Direction.
              </h2>
            </div>

            <p className="max-w-[360px] text-[15px] leading-[1.85] text-white/62 md:text-[16px]">
              I focus on digital marketing with a data-driven mindset, using tools, analytics, creativity, and future data science skills to make smarter marketing decisions.
            </p>
          </div>

          <div className="relative left-1/2 mb-12 w-screen -translate-x-1/2 overflow-hidden border-y border-white/10 bg-white/[0.025] py-6 backdrop-blur-md">
            <style>{`
              @keyframes toolMarquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
            `}</style>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#050605] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#050605] to-transparent" />
            <div
              className="flex w-max items-center gap-5 whitespace-nowrap px-5"
              style={{ animation: 'toolMarquee 26s linear infinite' }}
            >
              {[
                { name: 'Google Ads', logo: 'https://cdn.simpleicons.org/googleads' },
                { name: 'Meta Ads', logo: 'https://cdn.simpleicons.org/meta' },
                { name: 'Google Analytics', logo: 'https://cdn.simpleicons.org/googleanalytics' },
                { name: 'Looker Studio', logo: 'https://cdn.simpleicons.org/looker' },
                { name: 'SEO', logo: 'https://cdn.simpleicons.org/google' },
                { name: 'Canva', logo: 'https://cdn.simpleicons.org/canva' },
                { name: 'Photoshop', logo: 'https://cdn.simpleicons.org/adobephotoshop' },
                { name: 'Illustrator', logo: 'https://cdn.simpleicons.org/adobeillustrator' },
                { name: 'Premiere Pro', logo: 'https://cdn.simpleicons.org/adobepremierepro' },
                { name: 'Excel', logo: 'https://cdn.simpleicons.org/microsoftexcel' },
                { name: 'Power BI', logo: 'https://cdn.simpleicons.org/powerbi' },
                { name: 'Python', logo: 'https://cdn.simpleicons.org/python' },
                { name: 'AI Tools', logo: 'https://cdn.simpleicons.org/openai/ffffff' },
                { name: 'Google Ads', logo: 'https://cdn.simpleicons.org/googleads' },
                { name: 'Meta Ads', logo: 'https://cdn.simpleicons.org/meta' },
                { name: 'Google Analytics', logo: 'https://cdn.simpleicons.org/googleanalytics' },
                { name: 'Looker Studio', logo: 'https://cdn.simpleicons.org/looker' },
                { name: 'SEO', logo: 'https://cdn.simpleicons.org/google' },
                { name: 'Canva', logo: 'https://cdn.simpleicons.org/canva' },
                { name: 'Photoshop', logo: 'https://cdn.simpleicons.org/adobephotoshop' },
                { name: 'Illustrator', logo: 'https://cdn.simpleicons.org/adobeillustrator' },
                { name: 'Premiere Pro', logo: 'https://cdn.simpleicons.org/adobepremierepro' },
                { name: 'Excel', logo: 'https://cdn.simpleicons.org/microsoftexcel' },
                { name: 'Power BI', logo: 'https://cdn.simpleicons.org/powerbi' },
                { name: 'Python', logo: 'https://cdn.simpleicons.org/python' },
                { name: 'AI Tools', logo: 'https://cdn.simpleicons.org/openai/ffffff' },
              ].map((tool, index) => (
                <span
                  key={`${tool.name}-${index}`}
                  className="inline-flex items-center gap-3 rounded-full border border-[#4DDCFF]/25 bg-[#4DDCFF]/8 px-5 py-3 text-sm font-semibold text-white/82 shadow-[0_0_28px_rgba(77,220,255,0.08)]"
                >
                  <img
                    src={tool.logo}
                    alt=""
                    className="h-5 w-5"
                    loading="lazy"
                    onError={event => {
                      event.currentTarget.style.display = 'none'
                    }}
                  />
                  {tool.name}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-[30px] border border-white/12 bg-white/[0.035] p-7 backdrop-blur-md md:p-8">
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#4DDCFF]/30 text-[#4DDCFF]">
                01
              </span>
              <h3 className="mb-4 text-2xl font-bold text-white">Who I am</h3>
              <p className="text-[15px] leading-[1.8] text-white/65">
                A marketing focused undergraduate building a path across digital marketing, analytics, creative tools, and data science.
              </p>
            </div>

            <div className="rounded-[30px] border border-white/12 bg-white/[0.035] p-7 backdrop-blur-md md:p-8">
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#4DDCFF]/30 text-[#4DDCFF]">
                02
              </span>
              <h3 className="mb-4 text-2xl font-bold text-white">What I build</h3>
              <p className="text-[15px] leading-[1.8] text-white/65">
                Ad campaigns, social content systems, brand ideas, marketing analytics, creative designs, and data-backed digital strategies.
              </p>
            </div>

            <div className="rounded-[30px] border border-white/12 bg-white/[0.035] p-7 backdrop-blur-md md:p-8">
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#4DDCFF]/30 text-[#4DDCFF]">
                03
              </span>
              <h3 className="mb-4 text-2xl font-bold text-white">My direction</h3>
              <p className="text-[15px] leading-[1.8] text-white/65">
                To grow as a digital marketer who can connect creativity, analytics, AI, and data science to build stronger digital strategies.
              </p>
            </div>
          </div>

          {/* Follow me */}
          <div id="follow" className="mt-20 overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.035] p-7 backdrop-blur-md md:p-10">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#4DDCFF]/80">
                  Follow me
                </p>
                <h2
                  className="max-w-[720px] text-[38px] font-black leading-[0.98] text-white md:text-[64px]"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  Let’s Connect across the Digital Space.
                </h2>
              </div>

              <p className="max-w-[360px] text-[15px] leading-[1.85] text-white/62 md:text-[16px]">
                Follow my journey in Digital Marketing, Data Science, Creative content, and Personal branding.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/matheesha-sankalpa/', icon: 'in', color: '#0A66C2' },
                { name: 'TikTok', href: 'https://www.tiktok.com/@matheesha_sankalpa', logo: 'https://cdn.simpleicons.org/tiktok/ffffff', color: '#FE2C55' },
                { name: 'YouTube', href: 'https://www.youtube.com/@Matheesha_Sankalpa', logo: 'https://cdn.simpleicons.org/youtube', color: '#FF0000' },
                { name: 'Facebook', href: 'https://web.facebook.com/matheesha.sankalpa.1420', logo: 'https://cdn.simpleicons.org/facebook', color: '#1877F2' },
                { name: 'Instagram', href: 'https://www.instagram.com/_.matheesha_sankalpa.___/', logo: 'https://cdn.simpleicons.org/instagram', color: '#E4405F' },
                { name: 'Threads', href: 'https://www.threads.com/@_.matheesha_sankalpa.___', logo: 'https://cdn.simpleicons.org/threads/ffffff', color: '#ffffff' },
                { name: 'X', href: 'https://x.com/MatheeshaSanka2', logo: 'https://cdn.simpleicons.org/x/ffffff', color: '#ffffff' },
                { name: 'Medium', href: personal.medium || '#', logo: 'https://cdn.simpleicons.org/medium/ffffff', color: '#ffffff' },
              ].map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                  style={{ boxShadow: `0 0 34px ${item.color}16` }}
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at 20% 10%, ${item.color}30 0%, transparent 42%)` }}
                  />

                  <div className="relative flex items-center gap-4">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-black/30"
                      style={{ borderColor: `${item.color}55`, boxShadow: `0 0 24px ${item.color}22` }}
                    >
                      {item.icon ? (
                        <span className="text-2xl font-black leading-none" style={{ color: item.color }}>
                          {item.icon}
                        </span>
                      ) : (
                        <img
                          src={item.logo}
                          alt={`${item.name} logo`}
                          className="h-7 w-7"
                          loading="lazy"
                          onError={event => {
                            event.currentTarget.style.display = 'none'
                          }}
                        />
                      )}
                    </span>

                    <div>
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      <p className="text-sm text-white/45">Follow profile ↗</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
