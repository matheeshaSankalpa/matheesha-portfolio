import { useState } from 'react'

const email = 'smatheesha76@gmail.com'
const whatsappNumber = '94724105054'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section
      id="contact"
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
            Let’s talk
          </p>

          <h1
            className="max-w-[880px] text-[44px] font-black leading-[0.96] text-white md:text-[82px]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Have an idea, project, or opportunity?
          </h1>

          <p className="mt-6 max-w-[700px] text-[16px] leading-[1.85] text-white/62">
            Send me a message about digital marketing, creative work, collaborations, or internship opportunities.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact cards */}
          <div className="grid gap-5">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-[38px] border border-white/12 bg-white/[0.045] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#25D366]/50"
              style={{
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.10), 0 26px 90px rgba(0,0,0,0.36), 0 0 60px rgba(37,211,102,0.06)',
              }}
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle, rgba(37,211,102,0.28) 0%, rgba(37,211,102,0.10) 42%, transparent 72%)',
                }}
              />

              <div
                className="pointer-events-none absolute -left-24 bottom-[-90px] h-72 w-72 rounded-full opacity-55 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(37,211,102,0.06) 44%, transparent 74%)',
                }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.09] via-transparent to-transparent opacity-80" />

              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-[#25D366]/30 bg-[#25D366]/10 p-4"
                      style={{
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,0.12), 0 0 38px rgba(37,211,102,0.18)',
                      }}
                    >
                      <img
                        src="https://img.icons8.com/color/96/whatsapp--v1.png"
                        alt="WhatsApp logo"
                        className="h-12 w-12 object-contain"
                      />
                    </div>

                    <div>
                      <p className="mb-1 text-sm font-semibold uppercase tracking-[0.22em] text-[#25D366]">
                        WhatsApp
                      </p>
                      <h2 className="text-2xl font-black text-white">
                        072 410 5054
                      </h2>
                    </div>
                  </div>

                  <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xl text-white/55 transition-all duration-300 group-hover:rotate-12 group-hover:text-[#25D366] md:flex">
                    ↗
                  </span>
                </div>

                <p className="max-w-[360px] text-[15px] leading-[1.8] text-white/58">
                  Fastest way to reach me. Message me directly for collaborations, creative work, or project ideas.
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="group relative overflow-hidden rounded-[38px] border border-white/12 bg-white/[0.045] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#4DDCFF]/50"
              style={{
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.10), 0 26px 90px rgba(0,0,0,0.36), 0 0 60px rgba(77,220,255,0.06)',
              }}
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle, rgba(77,220,255,0.26) 0%, rgba(77,220,255,0.09) 42%, transparent 72%)',
                }}
              />

              <div
                className="pointer-events-none absolute -left-24 bottom-[-90px] h-72 w-72 rounded-full opacity-55 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(77,220,255,0.06) 44%, transparent 74%)',
                }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.09] via-transparent to-transparent opacity-80" />

              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-[#4DDCFF]/30 bg-[#4DDCFF]/10 p-4"
                      style={{
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,0.12), 0 0 38px rgba(77,220,255,0.18)',
                      }}
                    >
                      <img
                        src="https://img.icons8.com/color/96/gmail-new.png"
                        alt="Email logo"
                        className="h-12 w-12 object-contain"
                      />
                    </div>

                    <div>
                      <p className="mb-1 text-sm font-semibold uppercase tracking-[0.22em] text-[#4DDCFF]">
                        Email
                      </p>
                      <h2 className="break-all text-xl font-black text-white md:text-2xl">
                        {email}
                      </h2>
                    </div>
                  </div>

                  <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xl text-white/55 transition-all duration-300 group-hover:rotate-12 group-hover:text-[#4DDCFF] md:flex">
                    ↗
                  </span>
                </div>

                <p className="max-w-[360px] text-[15px] leading-[1.8] text-white/58">
                  Prefer email? Send your message and I’ll reply when I’m available.
                </p>
              </div>
            </a>
          </div>

          {/* Contact form */}
          <form
            action={`https://formsubmit.co/${email}`}
            method="POST"
            onSubmit={() => setSubmitted(true)}
            className="relative overflow-hidden rounded-[42px] border border-white/12 bg-white/[0.045] p-6 backdrop-blur-xl md:p-8"
            style={{
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.10), 0 26px 90px rgba(0,0,0,0.36), 0 0 70px rgba(77,220,255,0.06)',
            }}
          >
            <input type="hidden" name="_subject" value="New message from portfolio website" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />

            <div
              className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-70 blur-2xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(77,220,255,0.22) 0%, rgba(77,220,255,0.08) 42%, transparent 72%)',
              }}
            />

            <div
              className="pointer-events-none absolute -right-24 bottom-[-90px] h-80 w-80 rounded-full opacity-55 blur-2xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(77,220,255,0.06) 44%, transparent 74%)',
              }}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.09] via-transparent to-transparent opacity-80" />

            <div className="relative z-10">
              <div className="mb-7">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#4DDCFF]/75">
                  Contact form
                </p>
                <h2 className="text-3xl font-black text-white md:text-4xl">
                  Send a message
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-white/60">
                    Your name
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition-all placeholder:text-white/25 focus:border-[#4DDCFF]/45"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-white/60">
                    Your email
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition-all placeholder:text-white/25 focus:border-[#4DDCFF]/45"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-semibold text-white/60">
                  Subject
                </span>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Project / collaboration / internship..."
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition-all placeholder:text-white/25 focus:border-[#4DDCFF]/45"
                />
              </label>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-semibold text-white/60">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows="6"
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition-all placeholder:text-white/25 focus:border-[#4DDCFF]/45"
                />
              </label>

              <button
                type="submit"
                className="mt-7 inline-flex items-center gap-4 rounded-full bg-[#4DDCFF] px-8 py-4 text-base font-black text-[#020b12] transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
                style={{
                  boxShadow: '0 18px 48px rgba(77,220,255,0.26)',
                }}
              >
                Send Message
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-[#020b12]">
                  ↗
                </span>
              </button>

              {submitted && (
                <p className="mt-5 text-sm font-medium text-white/55">
                  If this is your first submission, check your email inbox and confirm FormSubmit once.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}