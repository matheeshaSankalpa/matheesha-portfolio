import { Link } from 'react-router-dom'

const links = [
  { name: 'Home', href: '/' },
  { name: 'Skills', href: '/skills' },
  { name: 'Timeline', href: '/timeline' },
  { name: 'Work', href: '/work' },
  { name: 'Videos', href: '/videos' },
  { name: 'Blogs', href: '/blogs' },
]

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/matheesha-sankalpa/',
    label: 'in',
  },
  {
    name: 'GitHub',
    href: '#',
    label: 'GH',
  },
  {
    name: 'Email',
    href: 'mailto:yourmail@gmail.com',
    label: '✉',
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050605] px-5 py-14 text-white md:px-[4.8vw]">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(77,220,255,0.20) 0%, rgba(77,220,255,0.06) 42%, transparent 72%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.1fr_1fr_0.8fr] md:items-start">
          <div>
            <Link
              to="/"
              className="mb-5 inline-block text-[34px] font-black leading-none tracking-[-0.08em] text-white"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              MS<span className="text-[#4DDCFF]">.</span>
            </Link>

            <p className="max-w-[420px] text-[15px] leading-[1.85] text-white/58">
              Digital marketer with a data science direction, building creative and data driven digital experiences.
            </p>
          </div>

          <nav className="flex flex-wrap gap-3 md:justify-center">
            {links.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm font-semibold text-white/55 transition-all duration-300 hover:border-[#4DDCFF]/35 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3 md:justify-end">
            {socials.map(item => (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={item.name}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] text-sm font-black text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#4DDCFF]/40 hover:text-[#4DDCFF]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-sm text-white/42 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Matheesha Sankalpa. All rights reserved.</p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-fit rounded-full border border-white/10 bg-white/[0.035] px-5 py-2.5 font-semibold text-white/55 transition-all duration-300 hover:border-[#4DDCFF]/35 hover:text-white"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}