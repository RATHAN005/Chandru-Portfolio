import React from 'react'

export default function HeroSection({ content }) {
  const { headline, role, meta, notification, nav, cta } = content

  return (
    <section className="hero" id="top">

      {/* L02/03 · Atmosphere */}
      <div className="atmo-parallax" aria-hidden="true">
        <div className="layer-atmosphere fx fx-atmo">
          <div className="atmo-wash"></div>
          <div className="atmo-core"></div>
          <div className="atmo-floor"></div>
          <div className="atmo-vignette"></div>
        </div>
      </div>

      {/* L04/05 · Portrait */}
      <div className="portrait-parallax">
        <div className="portrait-frame">
          <div className="portrait-stage fx fx-portrait">
            <img className="portrait-img" src="/assets/hero-portrait.jpg" width="1408" height="1117"
                 alt="Portrait of Chandru G, Senior IT Operations Administrator and Designer" decoding="async" />
            <div className="portrait-veil fx-veil" aria-hidden="true"></div>
            <div className="portrait-sweep fx-sweep" aria-hidden="true"></div>
            <div className="eye-flash eye-flash--right fx-flash" aria-hidden="true"></div>
            <div className="eye-flash fx-flash" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      {/* Film grain */}
      <div className="layer-grain" aria-hidden="true"></div>

      {/* Legibility scrim */}
      <div className="scrim-bottom" aria-hidden="true"></div>

      {/* L07 · Hero typography */}
      <div className="hero-copy">
        <h1 className="headline fx fx-headline" data-slot="headline">{headline}</h1>
        <div className="role-block">
          <p className="role">
            <span className="role-line fx fx-role-1" data-slot="role-1">{role[0]}</span>
            <span className="role-line fx fx-role-2" data-slot="role-2">{role[1]}</span>
          </p>
          <ul className="hero-meta fx fx-meta" data-slot="meta">
            {meta.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>

      {/* L08 · Notification */}
      <aside className="notification fx fx-notif" aria-label="Notification">
        <button className="notif-close" type="button" aria-label="Dismiss notification">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M2.5 2.5l7 7M9.5 2.5l-7 7"/>
          </svg>
        </button>
        <div className="notif-card">
          <span className="notif-avatar" aria-hidden="true">
            <span className="notif-badge">
              <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3.4 1 1 4l2.4 3M8.6 1 11 4 8.6 7"/>
              </svg>
            </span>
          </span>
          <div className="notif-body">
            <div className="notif-top">
              <span className="notif-name" data-slot="notif-name">{notification.name}</span>
              <span className="notif-time" data-slot="notif-time">{notification.time}</span>
            </div>
            <p className="notif-msg">
              <strong data-slot="notif-lead">{notification.lead}</strong>
              <span data-slot="notif-message"> {notification.message}</span>
            </p>
          </div>
        </div>
      </aside>

      {/* L06 · Header */}
      <header className="site-header">
        <div className="header-pill fx fx-header">
          <a className="brand" href="#top" aria-label="Chandru G — home">
            <svg className="brand-mark" viewBox="0 0 44 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 4.5 4.5 12l7.5 7.5"/>
              <path d="M32 4.5 39.5 12 32 19.5"/>
              <path d="M25.5 3.5 18.5 20.5"/>
            </svg>
            <span className="brand-dot" aria-hidden="true"></span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            <ul>
              {nav.map((item, i) => (
                <li key={item.label}>
                  <a
                    className={`nav-link${item.active ? ' is-active' : ''}`}
                    href={item.href}
                    aria-current={item.active ? 'page' : undefined}
                    data-slot={`nav-${i}`}
                  >
                    {item.active && <span className="nav-dot" aria-hidden="true"></span>}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <a className="cta" href={cta.href}>
              <span data-slot="cta">{cta.label}</span>
              <svg className="cta-arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3.2 10.8 10.8 3.2M5 3.2h5.8V9"/>
              </svg>
            </a>
            <button className="theme-btn" type="button" aria-label="Switch theme">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <circle cx="10" cy="10" r="3.3"/>
                <path d="M10 1.6v2.1M10 16.3v2.1M1.6 10h2.1M16.3 10h2.1M4.1 4.1l1.5 1.5M14.4 14.4l1.5 1.5M15.9 4.1l-1.5 1.5M5.6 14.4l-1.5 1.5"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

    </section>
  )
}
