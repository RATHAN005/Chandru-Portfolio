import React from 'react'

export default function BigRobotSection({ content }) {
  const { bigRobot } = content

  return (
    <section className="rb" id="think" aria-label="How I think about technology">
      <div className="rb-pin">
        <div className="rb-stage-wrap">
          <div className="rb-env" aria-hidden="true">
            <span className="rb-glow"></span>
            <span className="rb-grid"></span>
            <span className="rb-vignette"></span>
          </div>

          <p className="rb-tag rb-tag--l" data-slot="rb-label-l">{bigRobot.labels.left}</p>
          <p className="rb-tag rb-tag--r" data-slot="rb-label-r">{bigRobot.labels.right}</p>

          <div className="rb-space">
            <div className="rb-stage">
              <canvas className="rb-canvas" aria-hidden="true"></canvas>
            </div>
            <div className="rb-panels">{/* panels injected by script.js useEffect */}</div>
          </div>

          <div className="rb-center">
            <p className="rb-eyebrow" data-slot="rb-eyebrow">{bigRobot.eyebrow}</p>
            <h2 className="rb-title">
              <span data-slot="rb-title-1">{bigRobot.titleLines[0]}</span>
              <span data-slot="rb-title-2">{bigRobot.titleLines[1]}</span>
            </h2>
            <p className="rb-sub" data-slot="rb-sub">{bigRobot.description}</p>
            <p className="rb-hint">
              <span data-slot="rb-hint">{bigRobot.hint}</span>
              <span className="rb-hint-arrow" aria-hidden="true">&darr;</span>
            </p>
          </div>

          <span className="rb-depth" aria-hidden="true"></span>
        </div>
      </div>
    </section>
  )
}
