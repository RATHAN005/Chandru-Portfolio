import React from 'react'

export default function SmallRobotSection({ content }) {
  const { smallRobot } = content

  return (
    <section className="sr" id="curious" aria-label="Still curious">
      <div className="sr-env" aria-hidden="true">
        <span className="sr-glow"></span>
        <span className="sr-vignette"></span>
      </div>

      <div className="sr-inner">
        <div className="sr-copy">
          <p className="sr-eyebrow" data-slot="sr-eyebrow">{smallRobot.eyebrow}</p>
          <h2 className="sr-title">
            <span data-slot="sr-title-1">{smallRobot.titleLines[0]}</span>
            <span data-slot="sr-title-2">{smallRobot.titleLines[1]}</span>
          </h2>
          <p className="sr-sub" data-slot="sr-sub">{smallRobot.description}</p>
          <p className="sr-note"><span data-slot="sr-note">{smallRobot.note}</span></p>
        </div>

        <div className="sr-stage">
          <canvas className="sr-canvas" aria-hidden="true"></canvas>
        </div>
      </div>
    </section>
  )
}
