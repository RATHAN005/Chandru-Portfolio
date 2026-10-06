import React from 'react'

export default function FooterSection({ content }) {
  const { footer } = content

  return (
    <footer className="ft" id="contact">
      <div className="ft-env" aria-hidden="true"><span className="ft-glow"></span></div>

      <div className="ft-in">
        <p className="ft-eyebrow" data-slot="ft-eyebrow">{footer.eyebrow}</p>

        <h2 className="ft-headline">
          <span className="ft-mask"><span className="ft-line" data-slot="ft-head-1">{footer.headline[0]}</span></span>
          <span className="ft-mask"><span className="ft-line" data-slot="ft-head-2">{footer.headline[1]}</span></span>
        </h2>

        <p className="ft-line-note" data-slot="ft-line">{footer.line}</p>

        {footer.email && (
          <a className="ft-mail" href={`mailto:${footer.email}`}>
            <span className="ft-mail-label" data-slot="ft-mail-label">{footer.emailLabel}</span>
            <span className="ft-mail-address" data-slot="ft-mail-address">{footer.email}</span>
            <svg className="ft-mail-arrow" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 6h15M11 1l5 5-5 5"/>
            </svg>
          </a>
        )}

        <nav className="ft-cols" aria-label="Footer">
          {[
            ...(footer.columns || []),
            ...(footer.social && footer.social.length
              ? [{ title: "Elsewhere", items: footer.social }]
              : [])
          ].map((col, i) => (
            <div className="ft-col" key={col.title} style={{ transitionDelay: `${i * 60}ms` }}>
              <p className="ft-col-title">{col.title}</p>
              <ul>
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href || '#'}
                      {...(/^https?:/.test(item.href || '')
                        ? { target: '_blank', rel: 'noopener' }
                        : {})}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="ft-base">
          <span className="ft-brand">
            <svg className="ft-mark" viewBox="0 0 44 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 4.5 4.5 12l7.5 7.5"/><path d="M32 4.5 39.5 12 32 19.5"/><path d="M25.5 3.5 18.5 20.5"/>
            </svg>
            <b data-slot="ft-legal">{footer.legal}</b>
            <i data-slot="ft-note">{footer.note}</i>
          </span>

          <button className="ft-top" type="button">
            <span data-slot="ft-top">{footer.backToTop}</span>
            <svg viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 13V2M1.5 6.5 6 2l4.5 4.5"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
