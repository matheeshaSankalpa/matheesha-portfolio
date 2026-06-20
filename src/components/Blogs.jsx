import { useState } from 'react'

const categories = ['All', 'Marketing', 'Books', 'Coding']

const blogs = [
    {
    category: 'Marketing',
    title: 'වර්ණවල රහස් භාෂාව',
    subtitle: 'පාරිභෝගිකයාගේ හිත පාලනය කිරීමට වර්ණ විද්‍යාව (Color Psychology) උපයෝගී කරගන්නේ කෙසේද?',
    image: '/blog/color.jpg',
    url: 'https://medium.com/@smatheesha76/ඔබේ-බ්-රෑන්ඩ්-එකේ-වර්ණය-පිටුපස-ඇති-මනෝවිද්-යාව-පාරිභෝගිකයා-තීරණ-ගන්නේ-කෙසේද-f5ac7b1d1c41',
  },
  {
    category: 'Marketing',
    title: 'Red Bull හි රුපියල් බිලියන ගණනක ව්‍යාපාරික රහස',
    subtitle: 'Social Proof ගැන ඔබ නොදන්නා ඇත්ත',
    image: '/blog/redbull-social-proof.jpg',
    url: 'https://medium.com/@smatheesha76/red-bull-හි-ව්-යාපාරික-සාර්ථකත්වය-සහ-social-proof-මනෝවිද්-යාව-07a969b1a534',
  },
  {
    category: 'Marketing',
    title: 'The Dawn of the Answer Economy',
    subtitle: 'Strategic Insights for the 2026 Digital Landscape',
    image: '/blog/answer-economy.jpg',
    url: 'https://medium.com/@smatheesha76/the-dawn-of-the-answer-economy-strategic-insights-for-the-2026-digital-landscape-545c2c9312a4',
  },
  {
    category: 'Marketing',
    title: 'ඇයි ඔයාගේ Ads එකපාරටම වැඩ කරන්නේ නැතුව යන්නේ?',
    subtitle: '60/40 නීතිය ගැන දැනගමු',
    image: '/blog/ads-6040-rule.jpg',
    url: 'https://medium.com/@smatheesha76/ඇයි-ඔයාගේ-ads-එකපාරටම-වැඩ-කරන්නේ-නැතුව-යන්නේ-60-40-නීතිය-ගැන-දැනගමු-66cb23c696ee',
  },
  {
    category: 'Marketing',
    title: 'Facebook Ads',
    subtitle: 'Digital advertising insights for better campaign performance',
    image: '/blog/facebook-ads.jpg',
    url: 'https://medium.com/@smatheesha76/facebook-ads-0b7b7a0cfe4a',
  },
  {
    category: 'Books',
    title: 'MINDSET',
    subtitle: 'මේක ඔයා කියවන්නම ඕන පොතක්',
    image: '/blog/mindset.jpg',
    url: 'https://medium.com/@smatheesha76/mindset-f8e2d9f75807',
  },
  {
    category: 'Books',
    title: 'Atomic Habits',
    subtitle: 'මේක ඔයා කියවන්නම ඕන පොතක්',
    image: '/blog/atomic-habits.jpg',
    url: 'https://medium.com/@smatheesha76/atomic-habits-fe47678fd7f0',
  },
  {
    category: 'Coding',
    title: 'JavaScript Promises',
    subtitle: 'Understanding async JavaScript with promises',
    image: '/blog/js-promises.jpg',
    url: 'https://medium.com/@smatheesha76/javascript-promises-d5218c8743be',
  },
  {
    category: 'Coding',
    title: 'JavaScript Object',
    subtitle: 'Core concepts of JavaScript objects',
    image: '/blog/js-object.jpg',
    url: 'https://medium.com/@smatheesha76/javascript-object-cb03bae4dadc',
  },
  {
    category: 'Coding',
    title: 'Mastering SOLID Principles in Software Design',
    subtitle: 'Better software design through SOLID principles',
    image: '/blog/solid-principles.jpg',
    url: 'https://medium.com/@smatheesha76/mastering-solid-principles-in-software-design-0faf44a54176',
  },
  {
    category: 'Coding',
    title: 'Enhancing Code Quality with Java Coding Standards',
    subtitle: 'Writing cleaner and more maintainable Java code',
    image: '/blog/java-coding-standards.jpg',
    url: 'https://medium.com/@smatheesha76/enhancing-code-quality-with-java-coding-standards-28f8dba8f78a',
  },
]

export default function Blogs() {
  const [active, setActive] = useState('All')

  const filteredBlogs =
    active === 'All' ? blogs : blogs.filter(blog => blog.category === active)

  return (
    <section
      id="blogs"
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

      {/* Blue grid background */}
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

      {/* Secondary depth grid */}
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

      {/* Blue glow layers */}
      <div
        className="pointer-events-none absolute left-[-12%] top-[18%] h-[520px] w-[520px] rounded-full blur-3xl"
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
        <div className="mb-12 flex flex-col gap-7 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#4DDCFF]/80">
              Blogs
            </p>

            <h1
              className="max-w-[860px] text-[44px] font-black leading-[0.96] text-white md:text-[82px]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Ideas on Marketing, Books, and Coding.
            </h1>

            <p className="mt-6 max-w-[680px] text-[16px] leading-[1.85] text-white/62">
              A curated collection of my Medium articles about digital marketing, psychology, personal growth, and programming.
            </p>
          </div>

          <a
            href="https://medium.com/@smatheesha76"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-4 rounded-full border border-[#4DDCFF]/30 bg-[#4DDCFF] px-7 py-4 text-base font-black text-[#020b12] transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
            style={{
              boxShadow: '0 18px 48px rgba(77,220,255,0.26)',
            }}
          >
            View Medium Profile
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-[#020b12] transition-transform duration-300 group-hover:rotate-12">
              ↗
            </span>
          </a>
        </div>

        {/* Filter */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`rounded-full border px-5 py-3 text-sm font-bold transition-all duration-300 ${
                active === category
                  ? 'border-[#4DDCFF] bg-[#4DDCFF] text-[#020b12] shadow-[0_0_34px_rgba(77,220,255,0.24)]'
                  : 'border-white/10 bg-white/[0.035] text-white/56 hover:border-[#4DDCFF]/40 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog cards */}
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {filteredBlogs.map(blog => (
            <article
              key={blog.url}
              className="group relative overflow-hidden rounded-[36px] border border-white/12 bg-white/[0.045] p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#4DDCFF]/45"
              style={{
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.08), 0 26px 90px rgba(0,0,0,0.36), 0 0 60px rgba(77,220,255,0.05)',
              }}
            >
              {/* Apple-style bubble glow */}
              <div
                className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle, rgba(77,220,255,0.22) 0%, rgba(77,220,255,0.08) 42%, transparent 72%)',
                }}
              />

              <div
                className="pointer-events-none absolute -right-24 bottom-[-80px] h-60 w-60 rounded-full opacity-55 blur-2xl transition-opacity duration-500 group-hover:opacity-95"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(77,220,255,0.06) 44%, transparent 74%)',
                }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-70" />

              <div className="relative z-10">
                {/* Image */}
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noreferrer"
                  className="relative mb-5 block overflow-hidden rounded-[28px] border border-white/10 bg-[#071014]"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 20%, rgba(77,220,255,0.28), transparent 45%), linear-gradient(135deg, rgba(255,255,255,0.10), rgba(77,220,255,0.04))',
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                    <p className="text-lg font-black leading-tight text-white/20">
                      {blog.category}
                    </p>
                  </div>

                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="relative z-10 aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={event => {
                      event.currentTarget.style.display = 'none'
                    }}
                  />
                </a>

                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-[#4DDCFF]/30 bg-[#4DDCFF]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#4DDCFF]">
                    {blog.category}
                  </span>

                  <span className="text-sm font-semibold text-white/35">
                    Medium
                  </span>
                </div>

                <h2 className="mb-3 text-2xl font-black leading-tight text-white">
                  {blog.title}
                </h2>

                <p className="mb-7 text-[15px] leading-[1.75] text-white/62">
                  {blog.subtitle}
                </p>

                <a
                  href={blog.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/70 transition-all duration-300 hover:border-[#4DDCFF]/35 hover:text-[#4DDCFF]"
                >
                  Read on Medium
                  <span>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}