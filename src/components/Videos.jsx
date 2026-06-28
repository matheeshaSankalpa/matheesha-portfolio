const videos = [
    {
    title: 'Short Video 04',
    url: 'https://www.youtube.com/embed/CK2M4dNLSpI',
  },
  {
    title: 'Short Video 01',
    url: 'https://www.youtube.com/embed/E9e7v8BPIDk',
  },
  {
    title: 'Short Video 02',
    url: 'https://www.youtube.com/embed/J--1oAPJLxY',
  },
  {
    title: 'Short Video 03',
    url: 'https://www.youtube.com/embed/MSyCnaXfZ0o',
  },
]

export default function Videos() {
  return (
    <section
      id="videos"
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

      {/* Blue line grid background */}
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

      {/* Blue glow layers */}
      <div
        className="pointer-events-none absolute left-[-12%] top-[16%] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          zIndex: 0,
          background:
            'radial-gradient(circle, rgba(77,220,255,0.20) 0%, rgba(77,220,255,0.08) 38%, transparent 72%)',
        }}
      />

      <div
        className="pointer-events-none absolute right-[-12%] top-[48%] h-[620px] w-[620px] rounded-full blur-3xl"
        style={{
          zIndex: 0,
          background:
            'radial-gradient(circle, rgba(77,220,255,0.18) 0%, rgba(77,220,255,0.06) 42%, transparent 75%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#4DDCFF]/80">
              Videos
            </p>

            <h1
              className="max-w-[820px] text-[44px] font-black leading-[0.96] text-white md:text-[82px]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Short videos, Sharp Ideas, and Digital Stories.
            </h1>

            <p className="mt-6 max-w-[650px] text-[16px] leading-[1.85] text-white/62">
              A collection of my YouTube Shorts around digital marketing, creativity, tech learning, and personal branding.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@Matheesha_Sankalpa"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-4 rounded-full border border-[#4DDCFF]/30 bg-[#4DDCFF] px-7 py-4 text-base font-black text-[#020b12] transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
            style={{
              boxShadow: '0 18px 48px rgba(77,220,255,0.26)',
            }}
          >
            Subscribe on YouTube
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-[#020b12] transition-transform duration-300 group-hover:rotate-12">
              ▶
            </span>
          </a>
        </div>

        {/* Video cards */}
        <div className="grid gap-7 md:grid-cols-3">
          {videos.map((video, index) => (
            <article
              key={video.url}
              className="group relative overflow-hidden rounded-[36px] border border-white/12 bg-white/[0.045] p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#4DDCFF]/45"
              style={{
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.08), 0 26px 90px rgba(0,0,0,0.36), 0 0 60px rgba(77,220,255,0.05)',
              }}
            >
              {/* Apple / water bubble glow */}
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
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full border border-[#4DDCFF]/30 bg-[#4DDCFF]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#4DDCFF]">
                    Short 0{index + 1}
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-sm text-white/70">
                    ▶
                  </span>
                </div>

                <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black/40 shadow-[0_20px_70px_rgba(77,220,255,0.10)]">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="aspect-[9/16] w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}