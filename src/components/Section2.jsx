import React from 'react'

export default function Section2({ content }) {
  const { section2 } = content
  const [sideLeft, sideRight] = [section2.sideLeft, section2.sideRight]

  return (
    <section className="s2-pin" id="work" aria-label="Where code meets creative thinking">
      <div className="s2-stage">

        <div className="s2-comp">
          <p className="s2-brand s2-meta">
            <span className="s2-brand-my">My</span>
            <span className="s2-brand-creative">Creative</span>
            <span className="s2-brand-hunch">Hunch</span>
          </p>

          <div className="s2-side s2-side--left s2-meta">
            <p><span>Design by</span> <strong data-slot="s2-side-l1">{sideLeft[0]}</strong></p>
            <p><span>Code into</span> <strong><em data-slot="s2-side-l2">{sideLeft[1]}</em></strong></p>
          </div>

          <div className="s2-side s2-side--right s2-meta">
            <p><span>Built with</span> <strong data-slot="s2-side-r1">{sideRight[0]}</strong></p>
            <p><span>Driven by</span> <strong data-slot="s2-side-r2">{sideRight[1]}</strong></p>
          </div>

          <h2 className="s2-title">
            <span className="s2-mask s2-mask-1"><span className="s2-line s2-line-1"><span className="s2-where">Where</span></span></span>
            <span className="s2-mask s2-mask-2"><span className="s2-line s2-line-2"><span className="s2-code">Code</span><span className="s2-meets">Meets</span></span></span>
            <span className="s2-mask s2-mask-3"><span className="s2-line s2-line-3"><span className="s2-creative">Creative</span><span className="s2-thinking">Thinking</span></span></span>
          </h2>

          <ul className="s2-labels" aria-label="Focus areas">
            <li className="s2-label-pos s2-pos-ai"><span className="s2-label s2-label--ai">IT OPS.</span></li>
            <li className="s2-label-pos s2-pos-sys"><span className="s2-label s2-label--sys">SYSTEMS.</span></li>
            <li className="s2-label-pos s2-pos-web"><span className="s2-label s2-label--web">HARDWARE.</span></li>
            <li className="s2-label-pos s2-pos-api"><span className="s2-label s2-label--api">WCAG.</span></li>
            <li className="s2-label-pos s2-pos-auto"><span className="s2-label s2-label--auto">DESIGN.</span></li>
          </ul>
        </div>

        <div className="s2-rail s2-rail--left s2-meta" aria-hidden="true">
          <span className="s2-rail-dot"></span>
          <ul className="s2-rail-list">
            <li>Diagnose</li><li>Resolve</li><li>Standardize</li><li>Elevate</li><li>Impact</li>
          </ul>
          <span className="s2-rail-line s2-rail-line--a"></span>
          <span className="s2-rail-line s2-rail-line--b"></span>
        </div>

        <div className="s2-rail s2-rail--right s2-meta" aria-hidden="true">
          <span className="s2-rail-dot"></span>
          <ul className="s2-rail-list">
            <li>Diagnose</li><li>Resolve</li><li>Standardize</li><li>Elevate</li><li>Impact</li>
          </ul>
          <span className="s2-rail-line s2-rail-line--a"></span>
          <span className="s2-rail-line s2-rail-line--b"></span>
        </div>

        {/* Section 02 → 03 puzzle transition layers */}
        <div className="s3-atmo" aria-hidden="true">
          <p className="s3-credit s3-credit--l">Chandru G Portfolio</p>
          <p className="s3-credit s3-credit--r">&copy; 2026 Chandru G</p>
        </div>

        {/* Section 03 · About Me */}
        <div className="p3" id="section-03">
          <div className="p3-dim" aria-hidden="true">
            <span>Reliable &amp; Accessible</span>
            <span>Infrastructure &amp; Identity</span>
            <span className="p3-dim-3">Ready to Scale</span>
          </div>

          <p className="p3-corner p3-corner--l">IT Operations <b>&amp;</b> Visual Design</p>
          <p className="p3-corner p3-corner--r">Coimbatore, Tamil Nadu, India</p>

          {/* About Me composition */}
          <div className="ab-comp">
            <span className="ab-title-mask">
              <h2 className="ab-title"><span className="ab-title-main">About</span><span className="ab-title-script">Me</span></h2>
            </span>

            <div className="ab-boxes">
              <div className="ab-box-pos">
                <button className="ab-box ab-box--who" type="button" data-ab="who" aria-expanded="false">
                  <span className="ab-box-in">
                    <span className="ab-num">01</span>
                    <span className="ab-kicker">( Identity )</span>
                    <img className="ab-img" src="/assets/hero-portrait.jpg" alt="" loading="lazy" decoding="async" />
                    <span className="ab-box-title" data-slot="ab-who-title">Who<br/>I Am</span>
                    <span className="ab-line"></span>
                    <span className="ab-sub" data-slot="ab-who-sub">Chandru G &mdash; Senior IT Operations Administrator &amp; Designer.</span>
                    <span className="ab-arrow">
                      <svg viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M1 6h15M11 1l5 5-5 5"/>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>

              <div className="ab-box-pos">
                <button className="ab-box ab-box--what" type="button" data-ab="what" aria-expanded="false">
                  <span className="ab-box-in">
                    <span className="ab-num">02</span>
                    <span className="ab-kicker">( Craft )</span>
                    <img className="ab-img ab-img--air" src="/assets/aircraft.jpg" alt="" loading="lazy" decoding="async" />
                    <span className="ab-box-title" data-slot="ab-what-title">What<br/>I Do</span>
                    <span className="ab-line"></span>
                    <span className="ab-sub" data-slot="ab-what-sub">IT Operations &middot; Accessibility &middot; Design</span>
                    <span className="ab-arrow">
                      <svg viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M1 6h15M11 1l5 5-5 5"/>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>

              <div className="ab-box-pos">
                <button className="ab-box ab-box--think" type="button" data-ab="think" aria-expanded="false">
                  <span className="ab-box-in">
                    <span className="ab-num">03</span>
                    <span className="ab-kicker">( Approach )</span>
                    <img className="ab-img" src="/assets/portrait.jpg" alt="" loading="lazy" decoding="async" />
                    <span className="ab-box-title" data-slot="ab-think-title">How<br/>I Think</span>
                    <span className="ab-line"></span>
                    <span className="ab-sub" data-slot="ab-think-sub">Diagnose &middot; Resolve &middot; Standardize &middot; Elevate</span>
                    <span className="ab-arrow">
                      <svg viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M1 6h15M11 1l5 5-5 5"/>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>

            <div className="ab-foot">
              <span>( 03 &middot; About )</span>
              <span>IT Operations &middot; Accessibility &middot; Design</span>
            </div>
          </div>

          {/* expanded state */}
          <div className="ab-detail" role="region" aria-label="About details">
            <button className="ab-close" type="button" aria-label="Close">
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M2.5 2.5l7 7M9.5 2.5l-7 7"/>
              </svg>
            </button>

            <div className="ab-view" data-ab="who">
              <div className="ab-view-copy">
                <p className="ab-eyebrow" data-slot="ab-who-eyebrow">01 &mdash; Who I Am</p>
                <h3 className="ab-head" data-slot="ab-who-head">Chandru G</h3>
                <p className="ab-text" data-slot="ab-who-text">Senior IT Operations Administrator and Visual Designer based in Coimbatore, India. Over a year of progressive experience in IT operations, Windows administration, hardware maintenance (RAM, SSD, battery upgrades), enterprise asset tracking, new-hire onboarding, WCAG accessibility remediation, and brand identity design. Holds a B.E. in Computer Science Engineering (79%).</p>
                <ul className="ab-tags"><li>IT Operations</li><li>Accessibility (WCAG)</li><li>UI/UX &amp; Design</li><li>B.E. CSE (79%)</li></ul>
              </div>
              <div className="ab-view-media"><img src="/assets/hero-portrait.jpg" alt="Portrait of Chandru G" loading="lazy" decoding="async" /></div>
            </div>

            <div className="ab-view" data-ab="think">
              <div className="ab-view-copy">
                <p className="ab-eyebrow" data-slot="ab-think-eyebrow">03 &mdash; How I Think</p>
                <h3 className="ab-head ab-head--quote">&ldquo;Technical precision ensures reliability; thoughtful design enables connection.&rdquo;</h3>
                <p className="ab-attr">&mdash; Chandru G</p>
                <p className="ab-text" data-slot="ab-think-text">Diagnose &middot; Resolve &middot; Standardize &middot; Elevate &middot; Impact.</p>
              </div>
              <div className="ab-view-media"><img src="/assets/portrait.jpg" alt="Philosophy" loading="lazy" decoding="async" /></div>
            </div>
          </div>
        </div>

        <div className="s3-window" aria-hidden="true">
          <div className="s3-ghost"></div>
          <div className="s3-frags"></div>
          <div className="s3-cluster"></div>
          <div className="s3-window-frame"></div>
        </div>

      </div>
    </section>
  )
}
