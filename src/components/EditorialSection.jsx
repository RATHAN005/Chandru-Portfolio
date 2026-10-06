import React from 'react'

export default function EditorialSection({ content }) {
  const { editorial } = content

  return (
    <section className="ed" id="method" aria-label="Code is my medium">
      <div className="ed-pin">
        <div className="ed-stage">
          <div className="ed-env" aria-hidden="true"><span className="ed-glow"></span></div>

          <div className="ed-grid">
            <div className="ed-left">
              <p className="ed-eyebrow" data-slot="ed-eyebrow">{editorial.eyebrow}</p>
              <h2 className="ed-statement">
                <span className="ed-mask"><span className="ed-line" data-slot="ed-line-1">{editorial.statement[0]}</span></span>
                <span className="ed-mask"><span className="ed-line" data-slot="ed-line-2">{editorial.statement[1]}</span></span>
              </h2>
              <p className="ed-note" data-slot="ed-note">{editorial.note}</p>
            </div>

            <div className="ed-right">
              <p className="ed-skills-title" data-slot="ed-skills-title">{editorial.skills.title}</p>
              <div className="ed-reel">
                <div className="ed-reel-in" data-slot="ed-reel">
                  {/* built by script useEffect */}
                </div>
              </div>
            </div>
          </div>

          <span className="ed-progress" aria-hidden="true"></span>
        </div>
      </div>

      {/* tail — calm ending */}
      <div className="ed-tail">
        <div className="ed-tail-in">
          <div className="ed-mindset">
            <p className="ed-mindset-title" data-slot="ed-mindset-title">{editorial.mindset.title}</p>
            <ul className="ed-mindset-lines" data-slot="ed-mindset-lines">
              {editorial.mindset.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="ed-exploring">
            <p className="ed-block-title" data-slot="ed-exploring-title">{editorial.exploring.title}</p>
            <ul className="ed-explore-list" data-slot="ed-exploring-items">
              {editorial.exploring.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="ed-end">
            <h3 className="ed-end-title" data-slot="ed-end-lines">
              {editorial.ending.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h3>
            <p className="ed-end-note" data-slot="ed-end-note">{editorial.ending.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
