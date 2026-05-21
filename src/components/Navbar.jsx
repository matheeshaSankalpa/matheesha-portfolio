import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const links = [
  { name: 'Home', href: '/' },
  { name: 'Skills', href: '/skills' },
  { name: 'Education', href: '/timeline' },
  { name: 'Work', href: '/work' },
  { name: 'Videos', href: '/videos' },
  { name: 'Blogs', href: '/blogs' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)

    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#050605]/82 backdrop-blur-2xl border-b border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)]'
          : 'py-6'
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center gap-8 px-6">
        <Link
          to="/"
          className="mr-auto text-[34px] font-black leading-none tracking-[-0.08em] text-white md:text-[42px]"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          onClick={() => setOpen(false)}
        >
          MS<span className="text-[#4DDCFF]">.</span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] p-1.5 backdrop-blur-xl md:flex">
          {links.map(link => (
            <Link
              key={link.name}
              to={link.href}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-white/56 transition-all duration-300 hover:bg-white/8 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden rounded-full px-6 py-3 text-sm font-bold text-[#020b12] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 md:inline-flex"
          style={{
            background: '#4DDCFF',
            boxShadow: '0 16px 40px rgba(77,220,255,0.24)',
          }}
        >
          Let&apos;s Talk
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] md:hidden"
          aria-label="Open menu"
        >
          <span
            className={`block h-[2px] w-5 bg-white transition-all duration-300 ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-5 bg-white transition-all duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-5 bg-white transition-all duration-300 ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-[#050605]/96 px-6 backdrop-blur-2xl md:hidden">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(77,220,255,0.18) 0%, rgba(77,220,255,0.06) 34%, transparent 70%)',
            }}
          />

          {links.map(link => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setOpen(false)}
              className="relative z-10 text-[44px] font-black leading-none tracking-[-0.05em] text-white transition-colors hover:text-[#4DDCFF]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="relative z-10 mt-5 rounded-full px-8 py-4 text-base font-bold text-[#020b12]"
            style={{
              background: '#4DDCFF',
              boxShadow: '0 18px 45px rgba(77,220,255,0.22)',
            }}
          >
            Let&apos;s Talk
          </Link>
        </div>
      )}
    </header>
  )
}