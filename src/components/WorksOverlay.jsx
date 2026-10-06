import React from 'react'

export default function WorksOverlay({ content }) {
  const ARROW =
    '<svg viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.6" ' +
    'strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">' +
    '<path d="M1 6h15M11 1l5 5-5 5"/></svg>'

  return (
    <div className="wk" id="works" aria-hidden="true">
      <div className="wk-void" aria-hidden="true">
        <div className="wk-dim">
          <span>Reliable &amp; Accessible</span>
          <span>Operations &amp; Visual Design</span>
          <span className="wk-dim-3">Enterprise Standards</span>
        </div>
        <p className="wk-corner wk-corner--l">IT Operations <b>&amp;</b> Visual Design</p>
        <p className="wk-corner wk-corner--r">Coimbatore, Tamil Nadu, India</p>
      </div>

      <div className="wk-scroll">
        <div className="wk-track">
          <div className="wk-stage">

            <div className="wk-head" data-enter="" style={{ '--d': '.08s' }}>
              <span className="wk-brand">
                <svg className="wk-brand-mark" viewBox="0 0 44 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4.5 4.5 12l7.5 7.5"/><path d="M32 4.5 39.5 12 32 19.5"/><path d="M25.5 3.5 18.5 20.5"/>
                </svg>
                <b>Chandru G</b>&nbsp;Portfolio
              </span>
              <button className="wk-back" type="button" aria-label="Back to About">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M2.5 2.5l7 7M9.5 2.5l-7 7"/>
                </svg>
              </button>
            </div>

            {/* 3D world: screens injected by script useEffect */}
            <div className="wk-space"></div>

            <p className="wk-counter" data-enter="" style={{ '--d': '.2s' }}>
              <b data-wk-idx="">01</b> / <span data-wk-total="">05</span>
            </p>

          </div>
        </div>
      </div>

      {/* project detail shell */}
      <div className="wk-detail" role="region" aria-label="Project detail">
        <button className="wk-detail-close" type="button" aria-label="Back to works">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M2.5 2.5l7 7M9.5 2.5l-7 7"/>
          </svg>
        </button>
        <figure className="wk-detail-media"><img alt="" decoding="async" /></figure>
        <p className="wk-detail-title"></p>
      </div>
    </div>
  )
}
