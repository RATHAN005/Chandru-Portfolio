import React, { useEffect } from 'react'
import heroContent from './content.js'
import HeroSection from './components/HeroSection.jsx'
import Section2 from './components/Section2.jsx'
import BigRobotSection from './components/BigRobotSection.jsx'
import EditorialSection from './components/EditorialSection.jsx'
import SmallRobotSection from './components/SmallRobotSection.jsx'
import WorksOverlay from './components/WorksOverlay.jsx'
import FooterSection from './components/FooterSection.jsx'

export default function App() {
  useEffect(() => {
    // ============================================================
    // All original script.js logic runs here after React renders
    // the DOM — this guarantees querySelectorAll finds every element.
    // ============================================================
    const docEl = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer  = window.matchMedia('(pointer: fine)')
    let worksApi = null

    /* ---- 01 · Content hydration (data-slot wiring still used by script) ---- */
    const setSlot = (name, text) => {
      const el = document.querySelector(`[data-slot="${name}"]`)
      if (el && typeof text === 'string') el.textContent = text
    }

    /* ---- 03 · Micro-interactions ---- */
    const portraitLayer = document.querySelector('.portrait-parallax')
    const atmoLayer     = document.querySelector('.atmo-parallax')
    const cursorLight   = document.querySelector('.cursor-light')

    let targetX = 0, targetY = 0, curX = 0, curY = 0
    let lightTX = window.innerWidth / 2, lightTY = window.innerHeight * 0.42
    let lightX = lightTX, lightY = lightTY
    let rafId = null
    let interactionsOn = false

    if (cursorLight) {
      cursorLight.style.transform = `translate3d(${lightX}px, ${lightY}px, 0)`
    }

    const tick = () => {
      curX  += (targetX - curX)   * 0.055
      curY  += (targetY - curY)   * 0.055
      lightX += (lightTX - lightX) * 0.045
      lightY += (lightTY - lightY) * 0.045

      if (portraitLayer && !docEl.classList.contains('beyond-hero')) {
        portraitLayer.style.transform =
          `translate3d(${(curX * 10).toFixed(2)}px, ${(curY * 6).toFixed(2)}px, 0)`
      }
      if (atmoLayer && !docEl.classList.contains('beyond-hero')) {
        atmoLayer.style.transform =
          `translate3d(${(curX * -16).toFixed(2)}px, ${(curY * -9).toFixed(2)}px, 0)`
      }
      if (cursorLight) {
        cursorLight.style.transform =
          `translate3d(${lightX.toFixed(1)}px, ${lightY.toFixed(1)}px, 0)`
      }

      const still =
        Math.abs(targetX - curX) < 0.001 &&
        Math.abs(targetY - curY) < 0.001 &&
        Math.abs(lightTX - lightX) < 0.1  &&
        Math.abs(lightTY - lightY) < 0.1
      rafId = still ? null : requestAnimationFrame(tick)
    }

    const onPointerMove = (e) => {
      targetX = e.clientX / window.innerWidth - 0.5
      targetY = e.clientY / window.innerHeight - 0.5
      lightTX = e.clientX
      lightTY = e.clientY
      if (interactionsOn && rafId === null) rafId = requestAnimationFrame(tick)
    }

    const enableInteractions = () => {
      if (reduceMotion.matches || !finePointer.matches) return
      interactionsOn = true
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    }

    const disableInteractions = () => {
      interactionsOn = false
      window.removeEventListener('pointermove', onPointerMove)
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null }
      ;[portraitLayer, atmoLayer].forEach((el) => { if (el) el.style.transform = '' })
    }

    reduceMotion.addEventListener?.('change', () => {
      if (reduceMotion.matches) disableInteractions()
      else if (docEl.classList.contains('is-settled')) enableInteractions()
    })

    /* ---- 02 · The sequence ---- */
    const SETTLE_AT_MS = 6000

    const startSequence = () => {
      docEl.classList.add('is-ready')
      const delay = reduceMotion.matches ? 0 : SETTLE_AT_MS
      window.setTimeout(() => {
        docEl.classList.add('is-settled')
        enableInteractions()
      }, delay)
    }

    const qs = new URLSearchParams(window.location.search)
    const atParam  = qs.get('at')
    const s2pParam = qs.get('s2p')
    const s3tParam = qs.get('s3t')
    const wkParam  = qs.get('wk')

    const s2 = { jump: null, jumpTr: null }

    if (atParam !== null || s2pParam !== null || s3tParam !== null || wkParam !== null) {
      const freezeAt = atParam !== null ? Math.max(0, Number(atParam) || 0) : SETTLE_AT_MS
      docEl.classList.add('is-ready')
      if (freezeAt >= SETTLE_AT_MS) {
        docEl.classList.add('is-settled')
        enableInteractions()
      } else {
        document.getAnimations().forEach((a) => { a.currentTime = freezeAt; a.pause() })
      }
    } else {
      const portraitImg = document.querySelector('.portrait-img')
      const imageReady  = portraitImg && portraitImg.decode ? portraitImg.decode().catch(() => {}) : Promise.resolve()
      const fontsReady  = document.fonts ? document.fonts.ready : Promise.resolve()
      const patience    = new Promise((r) => window.setTimeout(r, 2500))
      Promise.race([Promise.all([imageReady, fontsReady]), patience]).then(() => {
        requestAnimationFrame(() => requestAnimationFrame(startSequence))
      })
    }

    /* ---- 04 · Notification dismiss ---- */
    const notification = document.querySelector('.notification')
    const closeBtn     = document.querySelector('.notif-close')
    if (notification && closeBtn) {
      const handleClose = () => {
        if (reduceMotion.matches) { notification.hidden = true; return }
        notification.classList.add('is-dismissed')
        notification.addEventListener('animationend', function onEnd(e) {
          if (e.animationName !== 'notif-out') return
          notification.hidden = true
          notification.removeEventListener('animationend', onEnd)
        })
      }
      closeBtn.addEventListener('click', handleClose)
    }

    /* ---- 04b · Theme button ---- */
    const themeBtn = document.querySelector('.theme-btn')
    if (themeBtn) {
      const handleTheme = () => {
        themeBtn.classList.remove('is-pulse')
        void themeBtn.offsetWidth
        themeBtn.classList.add('is-pulse')
      }
      themeBtn.addEventListener('click', handleTheme)
    }

    /* ---- 05 · Section 02 scrub + puzzle transition into Section 03 ---- */
    const s2pin = document.querySelector('.s2-pin')

    if (s2pin && !reduceMotion.matches) {
      const stage       = document.querySelector('.s2-stage')
      const comp        = document.querySelector('.s2-comp')
      const rails       = [...document.querySelectorAll('.s2-rail')]
      const lines       = [1, 2, 3].map((n) => document.querySelector(`.s2-line-${n}`))
      const metas       = [...document.querySelectorAll('.s2-meta')]
      const labelWraps  = [...document.querySelectorAll('.s2-label-pos')]
      const labels      = labelWraps.map((w) => w.querySelector('.s2-label'))
      const finalRot    = [-6, -3, -4, 3, -2]
      const extraRot    = [10, -8, 9, -10, 7]

      const LINE_RANGES  = [[0.08, 0.36], [0.20, 0.50], [0.32, 0.64]]
      const META_RANGE   = [0.02, 0.22]
      const LABEL_START  = 0.66, LABEL_STEP = 0.045, LABEL_SPAN = 0.16

      const clamp01   = (v) => Math.min(1, Math.max(0, v))
      const easeOut   = (t) => 1 - Math.pow(1 - t, 3)
      const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
      const sub       = (p, a, b) => clamp01((p - a) / (b - a))
      const isMobileLayout = () => window.innerWidth <= 720

      const trAtmo    = stage.querySelector('.s3-atmo')
      const trWindow  = stage.querySelector('.s3-window')
      const trGhost   = stage.querySelector('.s3-ghost')
      const trFragsBox = stage.querySelector('.s3-frags')
      const trCluster = stage.querySelector('.s3-cluster')
      const trFrame   = stage.querySelector('.s3-window-frame')
      const p3Dim     = stage.querySelector('.p3-dim')
      const p3Corners = [...stage.querySelectorAll('.p3-corner')]
      const atmoCredits = [...stage.querySelectorAll('.s3-credit')]
      const abTitle   = stage.querySelector('.ab-title')
      const abBoxes   = [...stage.querySelectorAll('.ab-box')]
      const abFoot    = stage.querySelector('.ab-foot')
      const hasTr     = !!(trWindow && trFragsBox && trAtmo)

      const TR_SPAN = 0.34
      const TILES_DESKTOP = [
        { r: [0, 0, 0.34, 0.21],       d: [-0.50, -0.15], rot: -2.5, s: 0.30, inv: 0 },
        { r: [0.34, 0, 0.32, 0.21],    d: [0.04, -0.50],  rot: 0.5,  s: 0.36, inv: 1 },
        { r: [0.66, 0, 0.34, 0.21],    d: [0.55, -0.20],  rot: 2,    s: 0.33, inv: 0 },
        { r: [0, 0.21, 0.26, 0.26],    d: [-0.60, 0.05],  rot: -2,   s: 0.40, inv: 0 },
        { r: [0.26, 0.21, 0.24, 0.26], d: [-0.22, 0.45],  rot: -1.5, s: 0.52, inv: 1 },
        { r: [0.50, 0.21, 0.22, 0.26], d: [0.24, -0.40],  rot: 1.5,  s: 0.50, inv: 0 },
        { r: [0.72, 0.21, 0.28, 0.26], d: [0.62, -0.08],  rot: 2.5,  s: 0.37, inv: 0 },
        { r: [0, 0.47, 0.30, 0.29],    d: [-0.55, 0.28],  rot: -2,   s: 0.44, inv: 0 },
        { r: [0.30, 0.47, 0.33, 0.29], d: [0.05, 0.55],   rot: 1,    s: 0.58, inv: 0 },
        { r: [0.63, 0.47, 0.37, 0.29], d: [0.60, 0.22],   rot: 2,    s: 0.42, inv: 1 },
        { r: [0, 0.76, 0.55, 0.24],    d: [-0.32, 0.50],  rot: -1,   s: 0.47, inv: 0 },
        { r: [0.55, 0.76, 0.45, 0.24], d: [0.38, 0.50],   rot: 1.5,  s: 0.49, inv: 0 },
      ]
      const TILES_MOBILE = [
        { r: [0, 0, 0.50, 0.33],       d: [-0.34, -0.20], rot: -1.5, s: 0.30, inv: 0 },
        { r: [0.50, 0, 0.50, 0.33],    d: [0.34, -0.25],  rot: 1,    s: 0.36, inv: 1 },
        { r: [0, 0.33, 0.55, 0.35],    d: [-0.36, 0.15],  rot: -1,   s: 0.42, inv: 0 },
        { r: [0.55, 0.33, 0.45, 0.35], d: [0.36, 0.10],   rot: 1.5,  s: 0.50, inv: 0 },
        { r: [0, 0.68, 0.50, 0.32],    d: [-0.30, 0.35],  rot: -1,   s: 0.46, inv: 1 },
        { r: [0.50, 0.68, 0.50, 0.32], d: [0.30, 0.40],   rot: 1,    s: 0.56, inv: 0 },
      ]

      let tiles = [], clusterInner = null, compRect = null
      let stageW = 0, stageH = 0, builtMobile = null

      const buildFragments = () => {
        if (!hasTr || !comp) return
        builtMobile = isMobileLayout()
        trFragsBox.replaceChildren()
        trCluster.replaceChildren()
        tiles = [];

        (builtMobile ? TILES_MOBILE : TILES_DESKTOP).forEach((cfg) => {
          const el = document.createElement('div')
          el.className = 's3-frag'
          const content = comp.cloneNode(true)
          content.classList.remove('s2-comp')
          content.classList.add('s3-frag-content')
          const lbl = content.querySelector('.s2-labels')
          if (lbl) lbl.remove()
          content.querySelectorAll('[style]').forEach((n) => n.removeAttribute('style'))
          const seam = document.createElement('div')
          seam.className = 's3-frag-seam'
          el.append(content, seam)
          trFragsBox.append(el)
          tiles.push({ el, content, seam, cfg })
        })

        const srcLabels = document.querySelector('.s2-labels')
        if (srcLabels) {
          clusterInner = document.createElement('div')
          clusterInner.className = 's3-cluster-inner'
          const clone = srcLabels.cloneNode(true)
          clone.querySelectorAll('[style]').forEach((n) => n.removeAttribute('style'))
          clusterInner.append(clone)
          trCluster.append(clusterInner)
        }
        layoutFragments()
      }

      const layoutFragments = () => {
        if (!hasTr || !tiles.length) return
        const s = stage.getBoundingClientRect()
        const c = comp.getBoundingClientRect()
        stageW = s.width
        stageH = s.height
        compRect = { left: c.left - s.left, top: c.top - s.top, w: c.width, h: c.height }
        tiles.forEach(({ el, content, cfg }) => {
          const [rx, ry, rw, rh] = cfg.r
          const x0 = Math.round(compRect.left + rx * compRect.w)
          const y0 = Math.round(compRect.top  + ry * compRect.h)
          const x1 = Math.round(compRect.left + (rx + rw) * compRect.w)
          const y1 = Math.round(compRect.top  + (ry + rh) * compRect.h)
          el.style.left   = x0 + 'px'
          el.style.top    = y0 + 'px'
          el.style.width  = (x1 - x0) + 'px'
          el.style.height = (y1 - y0) + 'px'
          content.style.left   = (compRect.left - x0).toFixed(2) + 'px'
          content.style.top    = (compRect.top  - y0).toFixed(2) + 'px'
          content.style.width  = compRect.w.toFixed(2) + 'px'
          content.style.height = compRect.h.toFixed(2) + 'px'
        })
        if (clusterInner) {
          clusterInner.style.left   = compRect.left.toFixed(1) + 'px'
          clusterInner.style.top    = compRect.top.toFixed(1)  + 'px'
          clusterInner.style.width  = compRect.w.toFixed(1)    + 'px'
          clusterInner.style.height = compRect.h.toFixed(1)    + 'px'
        }
      }

      let pinTop = 0, range = 1, s2Range = 1, trRange = 1
      let centers = [], centroid = { x: 0, y: 0 }
      let target = 0, cur = -1, rafS2 = null

      const measure = () => {
        pinTop  = s2pin.offsetTop
        range   = Math.max(1, s2pin.offsetHeight - window.innerHeight)
        s2Range = window.innerHeight * (isMobileLayout() ? 1.8 : 2.4)
        trRange = window.innerHeight * (isMobileLayout() ? 2.8 : 3.4)
        centers = labelWraps.map((w) => {
          const r = w.getBoundingClientRect()
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
        })
        const n = centers.length || 1
        centroid = centers.reduce(
          (acc, c) => ({ x: acc.x + c.x / n, y: acc.y + c.y / n }),
          { x: 0, y: 0 }
        )
        layoutFragments()
      }

      const applyS2 = (p) => {
        lines.forEach((line, i) => {
          if (!line) return
          const e = easeOut(sub(p, LINE_RANGES[i][0], LINE_RANGES[i][1]))
          line.style.transform = `translate3d(0, ${((1 - e) * 112).toFixed(3)}%, 0)`
        })
        const m = easeOut(sub(p, META_RANGE[0], META_RANGE[1]))
        metas.forEach((el) => {
          el.style.opacity   = m.toFixed(3)
          el.style.transform = m < 0.999 ? `translate3d(0, ${((1 - m) * 14).toFixed(2)}px, 0)` : ''
        })
        labels.forEach((label, i) => {
          if (!label) return
          const a   = LABEL_START + i * LABEL_STEP
          const s   = sub(p, a, a + LABEL_SPAN)
          const e   = easeOut(s)
          const dx  = (centroid.x - centers[i].x) * (1 - e)
          const dy  = (centroid.y - centers[i].y) * (1 - e)
          const rot = finalRot[i] + extraRot[i] * (1 - e)
          const scale = 0.32 + 0.68 * e
          label.style.opacity   = Math.min(1, s * 3.2).toFixed(3)
          label.style.transform =
            `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) ` +
            `rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(4)})`
          label.style.filter = e < 0.985 ? `blur(${((1 - e) * 5).toFixed(2)}px)` : ''
        })
      }

      let trActive = false
      const siteHeader = document.querySelector('.site-header')

      const applyTr = (pt) => {
        if (!hasTr) return
        const active = pt > 0.0005
        if (active !== trActive) {
          trActive = active
          stage.classList.toggle('is-transitioning', active)
          if (!active) {
            rails.forEach((r) => { r.style.opacity = ''; r.style.transform = '' })
            stage.classList.remove('is-s3-locked')
            if (siteHeader) { siteHeader.style.opacity = ''; siteHeader.style.pointerEvents = '' }
          }
        }
        if (!active) return

        if (siteHeader) {
          const hOut = easeOut(sub(pt, 0, 0.14))
          siteHeader.style.opacity       = (1 - hOut).toFixed(3)
          siteHeader.style.pointerEvents = hOut > 0.5 ? 'none' : ''
        }

        const railOut = easeOut(sub(pt, 0, 0.12))
        rails.forEach((r, i) => {
          r.style.opacity   = (1 - railOut).toFixed(3)
          r.style.transform = `translate3d(${((i === 0 ? -1 : 1) * railOut * 24).toFixed(1)}px, 0, 0)`
        })

        trAtmo.style.opacity = easeOut(sub(pt, 0.02, 0.16)).toFixed(3)
        if (p3Dim) p3Dim.style.opacity = (0.55 * easeOut(sub(pt, 0.06, 0.2))).toFixed(3)

        const creditsOut = easeOut(sub(pt, 0.8, 0.9))
        atmoCredits.forEach((c) => { c.style.opacity = (1 - creditsOut).toFixed(3) })
        const cornersIn = easeOut(sub(pt, 0.86, 0.97))
        p3Corners.forEach((c) => { c.style.opacity = cornersIn.toFixed(3) })

        const locked = pt > 0.985
        if (!locked) {
          if (abTitle) {
            const te = easeInOut(sub(pt, 0.55, 0.8))
            abTitle.style.transform = `translate3d(0, ${((1 - te) * 108).toFixed(2)}%, 0)`
          }
          abBoxes.forEach((box, i) => {
            const a = 0.6 + i * 0.06
            const e = easeInOut(sub(pt, a, a + 0.25))
            box.style.transform = `translate3d(0, ${((1 - e) * 0.14 * stageH).toFixed(1)}px, 0)`
            box.style.opacity   = easeOut(sub(pt, a, a + 0.16)).toFixed(3)
          })
          if (abFoot) abFoot.style.opacity = easeOut(sub(pt, 0.85, 0.97)).toFixed(3)
        }

        if (locked !== stage.classList.contains('is-s3-locked')) {
          stage.classList.toggle('is-s3-locked', locked)
          if (locked) {
            if (abTitle) abTitle.style.transform = ''
            abBoxes.forEach((b) => { b.style.transform = ''; b.style.opacity = '' })
            if (abFoot) abFoot.style.opacity = ''
          } else if (typeof s2.closeAbout === 'function') {
            s2.closeAbout()
          }
        }

        const framed     = easeInOut(sub(pt, 0.02, 0.17))
        const windowFade = easeOut(sub(pt, 0.92, 1))
        const wScale     = 1 - (isMobileLayout() ? 0.1 : 0.2) * framed
        trWindow.style.transform = `scale(${wScale.toFixed(4)})`
        trWindow.style.setProperty('--s3r', (framed * 20).toFixed(1) + 'px')
        trWindow.style.opacity = (1 - windowFade).toFixed(3)
        if (trFrame) trFrame.style.opacity = (framed * (1 - windowFade)).toFixed(3)
        if (trGhost) trGhost.style.opacity = (1 - easeInOut(sub(pt, 0.5, 0.85))).toFixed(3)

        const seamGlobal = easeOut(sub(pt, 0.05, 0.18))
        tiles.forEach(({ el, seam, cfg }) => {
          const e  = easeInOut(sub(pt, cfg.s, cfg.s + TR_SPAN))
          const dx = cfg.d[0] * stageW * e
          const dy = cfg.d[1] * stageH * e
          const sc = 1 + (cfg.d[0] < 0 ? -0.035 : 0.03) * e
          el.style.transform =
            `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) ` +
            `rotate(${(cfg.rot * e).toFixed(2)}deg) scale(${sc.toFixed(3)})`
          el.style.opacity = (1 - easeOut(sub(e, 0.62, 1))).toFixed(3)
          if (cfg.inv) {
            const k = sub(pt, cfg.s * 0.7, cfg.s * 0.95)
            el.style.filter = k > 0.002 ? `grayscale(${k.toFixed(2)}) invert(${k.toFixed(2)})` : ''
          }
          seam.style.opacity = (seamGlobal * (1 - e)).toFixed(3)
        })

        if (trCluster) {
          const drift = easeInOut(sub(pt, 0.3, 0.85))
          const cfade = easeOut(sub(pt, 0.8, 0.92))
          trCluster.style.transform =
            `translate3d(0, ${(-0.16 * stageH * drift).toFixed(1)}px, 0) ` +
            `scale(${(1 - 0.06 * drift).toFixed(3)})`
          trCluster.style.opacity = (1 - cfade).toFixed(3)
        }
      }

      let lastP2 = -1, lastPt = -1
      const apply = (p) => {
        const scrolled = p * range
        const p2 = clamp01(scrolled / s2Range)
        const pt = clamp01((scrolled - s2Range) / trRange)
        if (p2 !== lastP2) { lastP2 = p2; applyS2(p2) }
        if (pt !== lastPt) { lastPt = pt; applyTr(pt) }
      }

      const step = () => {
        cur += (target - cur) * 0.16
        if (Math.abs(target - cur) < 0.0004) cur = target
        apply(cur)
        rafS2 = cur === target ? null : requestAnimationFrame(step)
      }

      const onS2Scroll = () => {
        target = clamp01((window.scrollY - pinTop) / range)
        docEl.classList.toggle('beyond-hero', window.scrollY > window.innerHeight * 0.85)
        if (rafS2 === null) rafS2 = requestAnimationFrame(step)
      }

      const refresh = () => {
        if (builtMobile !== null && builtMobile !== isMobileLayout()) buildFragments()
        measure()
        target = clamp01((window.scrollY - pinTop) / range)
        cur = target
        lastP2 = -1; lastPt = -1
        apply(cur)
      }

      window.addEventListener('scroll', onS2Scroll, { passive: true })
      window.addEventListener('resize', refresh)
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh)
      buildFragments()
      refresh()

      const jumpTo = (y, overall) => {
        window.scrollTo({ top: Math.round(y), left: 0, behavior: 'instant' })
        target = cur = clamp01(overall)
        lastP2 = -1; lastPt = -1
        docEl.classList.toggle('beyond-hero', window.scrollY > window.innerHeight * 0.85)
        apply(cur)
      }

      s2.jump = (p) => {
        measure()
        jumpTo(pinTop + clamp01(p) * s2Range, (clamp01(p) * s2Range) / range)
      }

      s2.jumpTr = (p) => {
        measure()
        jumpTo(pinTop + s2Range + clamp01(p) * trRange, (s2Range + clamp01(p) * trRange) / range)
      }
    }

    /* ---- 06 · About Me — three doors ---- */
    const aboutRoot = document.querySelector('.p3')
    if (aboutRoot) {
      const detail   = aboutRoot.querySelector('.ab-detail')
      const closeBtn = aboutRoot.querySelector('.ab-close')
      const doorBtns = [...aboutRoot.querySelectorAll('.ab-box')]
      const views    = [...aboutRoot.querySelectorAll('.ab-view')]
      let openBtn    = null

      const openAbout = (btn) => {
        if (!detail || openBtn) return
        openBtn = btn
        const key = btn.dataset.ab
        const dRect = detail.getBoundingClientRect()
        const bRect = btn.getBoundingClientRect()
        detail.style.transformOrigin =
          `${Math.round(bRect.left + bRect.width / 2 - dRect.left)}px ` +
          `${Math.round(bRect.top + bRect.height / 2 - dRect.top)}px`
        detail.classList.remove('ab-detail--who', 'ab-detail--what', 'ab-detail--think')
        detail.classList.add(`ab-detail--${key}`)
        views.forEach((v) => v.classList.toggle('is-active', v.dataset.ab === key))
        btn.classList.add('is-active')
        btn.setAttribute('aria-expanded', 'true')
        aboutRoot.classList.add('is-expanded')
        requestAnimationFrame(() => detail.classList.add('is-open'))
        if (closeBtn) window.setTimeout(() => closeBtn.focus({ preventScroll: true }), 400)
      }

      const closeAbout = () => {
        if (!detail || !openBtn) return
        const btn = openBtn
        openBtn = null
        detail.classList.remove('is-open')
        aboutRoot.classList.remove('is-expanded')
        btn.classList.remove('is-active')
        btn.setAttribute('aria-expanded', 'false')
        btn.focus({ preventScroll: true })
      }

      s2.closeAbout = closeAbout

      doorBtns.forEach((btn) =>
        btn.addEventListener('click', () => {
          if (btn.dataset.ab === 'what') { if (worksApi) worksApi.enter(); return }
          openAbout(btn)
        })
      )
      if (closeBtn) closeBtn.addEventListener('click', closeAbout)
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAbout() })
    }

    /* ---- 07 · MY SELECTED WORKS ---- */
    const wk       = document.querySelector('.wk')
    const flashEl  = document.querySelector('.flash')

    const flashTo = (midFn, done) => {
      if (!flashEl) { midFn(); if (done) done(); return }
      const fast = reduceMotion.matches
      flashEl.classList.add('is-on')
      window.setTimeout(() => {
        midFn()
        window.setTimeout(() => {
          flashEl.classList.remove('is-on')
          if (done) window.setTimeout(done, fast ? 20 : 240)
        }, fast ? 40 : 170)
      }, fast ? 50 : 270)
    }

    if (wk && heroContent.works) {
      const space      = wk.querySelector('.wk-space')
      const scroller   = wk.querySelector('.wk-scroll')
      const track      = wk.querySelector('.wk-track')
      const backBtn    = wk.querySelector('.wk-back')
      const idxEl      = wk.querySelector('[data-wk-idx]')
      const totalEl    = wk.querySelector('[data-wk-total]')
      const detail     = wk.querySelector('.wk-detail')
      const detailClose = wk.querySelector('.wk-detail-close')
      const detailImg  = wk.querySelector('.wk-detail-media img')
      const detailTitle = wk.querySelector('.wk-detail-title')
      const mainEl     = document.querySelector('main')

      const projects = (heroContent.works.projects || []).filter((p) => !p.teaser)
      const pad2     = (n) => String(n).padStart(2, '0')
      const ARROW    =
        '<svg viewBox="0 0 18 12" fill="none" stroke="currentColor" stroke-width="1.6" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M1 6h15M11 1l5 5-5 5"/></svg>'

      const screens = []
      const addScreen = (el, side) => {
        el.classList.add('wk-scr')
        space.append(el)
        screens.push({ el, side })
      }

      const intro = document.createElement('div')
      intro.innerHTML =
        '<div class="wk-intro">' +
        '<h2 class="wk-title">Featured <i>Projects</i> &amp; <b>Work</b><sup>&reg;</sup></h2>' +
        `<p class="wk-sub">${pad2(projects.length)} Projects &middot; Scroll to travel</p>` +
        '<span class="wk-hint"><svg viewBox="0 0 12 14" fill="none" stroke="currentColor" ' +
        'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M6 1v11M1.5 8 6 12.5 10.5 8"/></svg></span></div>'
      addScreen(intro, 0)

      projects.forEach((p, i) => {
        const scr   = document.createElement('div')
        const ghost = document.createElement('span')
        ghost.className   = 'wk-ghost'
        ghost.textContent = pad2(i + 1)
        const glass = document.createElement('article')
        glass.className   = 'wk-glass'
        if (p.accent) glass.style.setProperty('--wa', p.accent)
        glass.innerHTML =
          '<div class="wk-copy">' +
          `<p class="wk-num">${pad2(i + 1)} / ${pad2(projects.length)}</p>` +
          `<h3 class="wk-name">${p.name || p.key}</h3>` +
          `<p class="wk-titleline">${p.title || ''}</p>` +
          `<p class="wk-meta"><i></i>${p.cat || ''} &middot; ${p.year || ''}</p>` +
          `<button class="wk-view" type="button">View Project ${ARROW}</button>` +
          '</div>' +
          `<figure class="wk-media"><img src="${p.img}" alt="${p.name || ''}" ` +
          `width="${p.w}" height="${p.h}" loading="lazy" decoding="async"></figure>`
        scr.append(ghost, glass)
        addScreen(scr, i % 2 === 0 ? -1 : 1)
        const viewBtn = glass.querySelector('.wk-view')
        if (viewBtn) viewBtn.addEventListener('click', () => openDetail(p))
      })

      const outro = document.createElement('div')
      outro.innerHTML =
        '<div class="wk-outro">' +
        '<p class="wk-outro-line">Built with <b>Precision.</b><br>Driven by <b>Reliability.</b></p>' +
        `<button class="wk-return" type="button">${ARROW} Back to About</button></div>`
      addScreen(outro, 0)
      const ret = outro.querySelector('.wk-return')
      if (ret) ret.addEventListener('click', () => exitWorks())

      const N = screens.length
      if (totalEl) totalEl.textContent = pad2(N)
      track.style.height = `${100 + (N - 1) * 120}vh`

      const clampW       = (v) => Math.min(1, Math.max(0, v))
      const isMobileWk   = () => window.innerWidth <= 720
      let wp = 0, wpTarget = 0, wkRaf = null, wkRange = 1, lastIdxShown = ''

      const measureWk = () => { wkRange = Math.max(1, track.offsetHeight - scroller.clientHeight) }

      const applyWk = (p) => {
        const a      = p * (N - 1)
        const depth  = isMobileWk() ? 520 : 820
        const lat    = isMobileWk() ? 2.4 : 5.4
        const mobile = isMobileWk()

        screens.forEach((s, i) => {
          const off = i - a
          if (off < -0.85 || off > 1.85) { s.el.style.visibility = 'hidden'; return }
          s.el.style.visibility = 'visible'
          const x    = s.side * lat * off
          const y    = off < 0 ? off * -5 : 0
          const z    = -off * depth
          const rotY = Math.max(-4, Math.min(4, s.side * -2.2 * off))
          const rotX = Math.max(-2.4, Math.min(2.4, off * 1.1))
          s.el.style.transform =
            `translate3d(${x.toFixed(2)}vw, ${y.toFixed(2)}svh, ${z.toFixed(1)}px) ` +
            `rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg)`
          s.el.style.opacity = (off >= 0
            ? Math.max(0, 1 - off * 0.82)
            : Math.max(0, 1 + off * 1.6)
          ).toFixed(3)
          s.el.style.zIndex = String(100 - Math.round(off * 10))
          s.el.style.setProperty('--o', off.toFixed(3))
          if (!mobile) {
            const blur = off < 0 ? Math.min(-off * 7, 9) : Math.min(off * 4.2, 8)
            s.el.style.filter = blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : ''
          }
        })

        const shown = pad2(Math.min(N, Math.max(1, Math.round(a) + 1)))
        if (idxEl && shown !== lastIdxShown) { lastIdxShown = shown; idxEl.textContent = shown }
      }

      const wkStep = () => {
        wp += (wpTarget - wp) * 0.16
        if (Math.abs(wpTarget - wp) < 0.0006) wp = wpTarget
        applyWk(wp)
        wkRaf = wp === wpTarget ? null : requestAnimationFrame(wkStep)
      }

      const onWkScroll = () => {
        if (reduceMotion.matches) return
        wpTarget = clampW(scroller.scrollTop / wkRange)
        if (wkRaf === null) wkRaf = requestAnimationFrame(wkStep)
      }

      scroller.addEventListener('scroll', onWkScroll, { passive: true })
      window.addEventListener('resize', () => {
        if (docEl.classList.contains('works-open') && !reduceMotion.matches) {
          measureWk()
          applyWk(wp)
        }
      })

      const openDetail = (data) => {
        if (!detail) return
        if (detailImg)  { detailImg.src = data.img; detailImg.alt = data.name || data.title || '' }
        if (detailTitle) detailTitle.textContent = data.title || data.name || ''
        flashTo(() => detail.classList.add('is-open'), () => {
          if (detailClose) detailClose.focus({ preventScroll: true })
        })
      }

      const closeDetail = (instant) => {
        if (!detail || !detail.classList.contains('is-open')) return
        if (instant) { detail.classList.remove('is-open'); return }
        flashTo(() => detail.classList.remove('is-open'))
      }

      let lastFocus = null

      const enterWorks = () => {
        if (docEl.classList.contains('works-open')) return
        lastFocus = document.activeElement
        flashTo(() => {
          docEl.classList.add('works-open')
          wk.setAttribute('aria-hidden', 'false')
          if (mainEl) mainEl.setAttribute('aria-hidden', 'true')
          scroller.scrollTop = 0
          wp = wpTarget = 0
          lastIdxShown = ''
          if (!reduceMotion.matches) { measureWk(); applyWk(0) }
          requestAnimationFrame(() => wk.classList.add('is-in'))
        }, () => { if (backBtn) backBtn.focus({ preventScroll: true }) })
      }

      const exitWorks = () => {
        if (!docEl.classList.contains('works-open')) return
        flashTo(() => {
          closeDetail(true)
          wk.classList.remove('is-in')
          docEl.classList.remove('works-open')
          wk.setAttribute('aria-hidden', 'true')
          if (mainEl) mainEl.removeAttribute('aria-hidden')
        }, () => {
          const tgt =
            (lastFocus && document.contains(lastFocus) && lastFocus) ||
            document.querySelector('.ab-box--what')
          if (tgt && tgt.focus) tgt.focus({ preventScroll: true })
        })
      }

      worksApi = { enter: enterWorks, exit: exitWorks }

      const projectsNav = document.querySelector('.nav-link[href="#projects"]')
      if (projectsNav) {
        projectsNav.addEventListener('click', (e) => { e.preventDefault(); enterWorks() })
      }

      if (backBtn)     backBtn.addEventListener('click', exitWorks)
      if (detailClose) detailClose.addEventListener('click', () => closeDetail(false))
      document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape' || !docEl.classList.contains('works-open')) return
        if (detail && detail.classList.contains('is-open')) closeDetail(false)
        else exitWorks()
      })
    }

    /* ---- 08 · BIG ROBOT ---- */
    const RB = {
      scene:   'https://prod.spline.design/9U1pA50upCe33lsu/scene.splinecode',
      runtime: 'https://cdn.spline.design/@splinetool/runtime@2.0.13/build/runtime.js',
      zFar: -1500, zPast: 760, lateral: 23, span: 0.62, settle: 0.86,
      look: 0.4, lookX: 0.07, tau: 0.34,
    }

    const rbSection = document.querySelector('.rb')

    if (rbSection && heroContent.bigRobot) {
      const copy     = heroContent.bigRobot
      const canvas   = rbSection.querySelector('.rb-canvas')
      const panelBox = rbSection.querySelector('.rb-panels')
      const pinEl    = rbSection.querySelector('.rb-pin')
      const style    = rbSection.style

      const clamp01rb = (v) => Math.min(1, Math.max(0, v))
      const band      = (v, a, b) => clamp01rb((v - a) / (b - a))
      const isMob     = () => window.innerWidth <= 720

      const panels = (copy.techIdeas || []).map((idea, i) => {
        const el = document.createElement('article')
        el.className = 'rb-panel'
        const no = document.createElement('p'); no.className = 'rb-panel-no'; no.textContent = idea.no || String(i + 1).padStart(2, '0')
        const h  = document.createElement('h3'); h.className = 'rb-panel-title'; h.textContent = idea.title || ''
        const p  = document.createElement('p'); p.className = 'rb-panel-text'; p.textContent = idea.description || ''
        const ul = document.createElement('ul'); ul.className = 'rb-tags'
        ;(idea.tags || []).forEach((t) => { const li = document.createElement('li'); li.textContent = t; ul.append(li) })
        el.append(no, h, p, ul)
        panelBox.append(el)
        return { el, side: i % 2 === 0 ? -1 : 1 }
      })

      let pinTop = 0, pinRange = 1
      let jp = 0, jpTarget = 0, lastJourney = null

      const measureRb = () => {
        const r = (pinEl || rbSection).getBoundingClientRect()
        pinTop   = r.top + window.scrollY
        pinRange = Math.max(1, (pinEl || rbSection).offsetHeight - window.innerHeight)
      }

      const renderJourney = (raw) => {
        const key = raw.toFixed(4)
        if (key === lastJourney) return
        lastJourney = key
        const p    = clamp01rb(raw / RB.settle)
        const n    = panels.length || 1
        const step = n > 1 ? (1 - RB.span) / (n - 1) : 0
        let intro  = 1

        panels.forEach((panel, i) => {
          const u    = band(p, i * step, i * step + RB.span)
          const z    = RB.zFar + (RB.zPast - RB.zFar) * u
          const x    = panel.side * RB.lateral * (0.52 + 0.48 * u) * (isMob() ? 0.42 : 1)
          const rotY = panel.side * -11 * (0.4 + 0.6 * u)
          const inFade  = band(u, 0.04, 0.24)
          const outFade = 1 - band(u, 0.76, 0.97)
          panel.el.style.transform =
            `translate3d(calc(-50% + ${x.toFixed(2)}vw), -50%, ${z.toFixed(1)}px) ` +
            `rotateY(${rotY.toFixed(2)}deg)`
          panel.el.style.opacity = (inFade * outFade).toFixed(3)
          panel.el.style.setProperty('--haze', (0.62 * (1 - inFade)).toFixed(3))
          panel.el.style.zIndex = String(10 + Math.round(u * 10))
          intro = Math.min(intro, 1 - inFade)
        })
        style.setProperty('--rbP', p.toFixed(4))
        style.setProperty('--rbC', intro.toFixed(3))
      }

      let app = null, loading = false, running = false, rig = null
      let rafRb = null, active = false, entry = 0, entryT = 0, lastT = 0
      let mx = 0, mxTarget = 0

      const stepRb = (now) => {
        const dt = lastT ? Math.min((now - lastT) / 1000, 0.25) : 0.016
        lastT = now
        const before = mx
        mx += (mxTarget - mx) * (1 - Math.exp(-dt / RB.tau))
        if (Math.abs(mxTarget - mx) < 0.0008) mx = mxTarget
        if (rig && mx !== before) {
          const hy = -mx * RB.look
          if (rig.head) { rig.head.rotation.y = hy; rig.head.rotation.x = Math.abs(mx) * RB.lookX }
          if (rig.head2) rig.head2.rotation.y = hy * 0.18
          if (rig.neck) rig.neck.rotation.y = hy * 0.3
        }
        jp += (jpTarget - jp) * (1 - Math.exp(-dt / 0.11))
        if (Math.abs(jpTarget - jp) < 0.0004) jp = jpTarget
        entry += (entryT - entry) * (1 - Math.exp(-dt / 0.5))
        if (Math.abs(entryT - entry) < 0.002) entry = entryT
        style.setProperty('--rbIn', entry.toFixed(4))
        renderJourney(jp)
        const settled = jp === jpTarget && entry === entryT && mx === mxTarget
        if (settled) { lastT = 0; rafRb = null; return }
        rafRb = requestAnimationFrame(stepRb)
      }

      const kickRb = () => { if (rafRb === null) rafRb = requestAnimationFrame(stepRb) }

      const onScrollRb = () => { jpTarget = clamp01rb((window.scrollY - pinTop) / pinRange); kickRb() }
      window.addEventListener('scroll', onScrollRb, { passive: true })
      window.addEventListener('resize', () => { measureRb(); onScrollRb() })

      if (finePointer.matches) {
        window.addEventListener('pointermove', (e) => {
          if (!active) return
          const r = rbSection.getBoundingClientRect()
          mxTarget = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2))
          kickRb()
        }, { passive: true })
      }

      const mountRobot = () => {
        if (loading || app || reduceMotion.matches || !canvas) return
        loading = true
        import(/* @vite-ignore */ RB.runtime)
          .then(({ Application }) => { app = new Application(canvas); return app.load(RB.scene) })
          .then(() => {
            if (app.setGlobalEvents) app.setGlobalEvents(false)
            const find = (n) => (app.findObjectByName ? app.findObjectByName(n) : null)
            rig = { head: find('Head'), head2: find('Head 2'), neck: find('Neck') }
            running = true
            rbSection.classList.add('is-robot-ready')
            kickRb()
          })
          .catch(() => { loading = false; kickRb() })
      }

      const near = new IntersectionObserver((entries) => {
        if (entries.some((en) => en.isIntersecting)) { mountRobot(); near.disconnect() }
      }, { rootMargin: '120% 0px' })
      near.observe(rbSection)

      const vis = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          active = en.isIntersecting && en.intersectionRatio > 0.02
          if (active) {
            entryT = 1
            if (app && !running) { app.play(); running = true }
          } else if (app && running) { app.stop(); running = false }
          kickRb()
        })
      }, { threshold: [0, 0.12] })
      vis.observe(rbSection)

      measureRb()
      onScrollRb()
      if (reduceMotion.matches) { style.setProperty('--rbIn', '1'); style.setProperty('--rbC', '1') }
    }

    /* ---- 09 · SMALL ROBOT ---- */
    const SR = {
      scene:   '/assets/robot.splinecode',
      runtime: 'https://cdn.spline.design/@splinetool/runtime@2.0.13/build/runtime.js',
      turn: 0.44, tilt: 0.07, tau: 0.32,
    }

    const srSection = document.querySelector('.sr')

    if (srSection && heroContent.smallRobot) {
      const canvas  = srSection.querySelector('.sr-canvas')
      const styleSr = srSection.style

      let appSr = null, head = null, loadingSr = false, runningSr = false
      let rafSr = null, activeSr = false, entrySr = 0, entryTSr = 0, lastTSr = 0
      let mxSr = 0, mxTargetSr = 0

      const stepSr = (now) => {
        const dt = lastTSr ? Math.min((now - lastTSr) / 1000, 0.25) : 0.016
        lastTSr = now
        entrySr += (entryTSr - entrySr) * (1 - Math.exp(-dt / 0.5))
        if (Math.abs(entryTSr - entrySr) < 0.002) entrySr = entryTSr
        styleSr.setProperty('--srIn', entrySr.toFixed(4))
        mxSr += (mxTargetSr - mxSr) * (1 - Math.exp(-dt / SR.tau))
        if (Math.abs(mxTargetSr - mxSr) < 0.0008) mxSr = mxTargetSr
        if (head) {
          head.rotation.y = -mxSr * SR.turn
          head.rotation.z =  mxSr * SR.turn * SR.tilt
        }
        if (!activeSr || (entrySr === entryTSr && mxSr === mxTargetSr)) { lastTSr = 0; rafSr = null; return }
        rafSr = requestAnimationFrame(stepSr)
      }

      const kickSr = () => { if (rafSr === null) rafSr = requestAnimationFrame(stepSr) }

      if (finePointer.matches) {
        window.addEventListener('pointermove', (e) => {
          if (!activeSr) return
          const r = srSection.getBoundingClientRect()
          mxTargetSr = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2))
          kickSr()
        }, { passive: true })
      }

      const mountRobotSr = () => {
        if (loadingSr || appSr || reduceMotion.matches || !canvas) return
        loadingSr = true
        import(/* @vite-ignore */ SR.runtime)
          .then(({ Application }) => { appSr = new Application(canvas); return appSr.load(SR.scene) })
          .then(() => {
            if (appSr.setGlobalEvents) appSr.setGlobalEvents(false)
            head = appSr.findObjectByName ? appSr.findObjectByName('Cabeza') : null
            if (head) head.rotation.y = 0
            runningSr = true
            srSection.classList.add('is-robot-ready')
            kickSr()
          })
          .catch(() => { loadingSr = false; kickSr() })
      }

      const nearSr = new IntersectionObserver((entries) => {
        if (entries.some((en) => en.isIntersecting)) { mountRobotSr(); nearSr.disconnect() }
      }, { rootMargin: '120% 0px' })
      nearSr.observe(srSection)

      const visSr = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          activeSr = en.isIntersecting && en.intersectionRatio > 0.02
          if (activeSr) {
            entryTSr = 1
            if (appSr && !runningSr) { appSr.play(); runningSr = true }
          } else if (appSr && runningSr) { appSr.stop(); runningSr = false }
          kickSr()
        })
      }, { threshold: [0, 0.15] })
      visSr.observe(srSection)

      if (reduceMotion.matches) styleSr.setProperty('--srIn', '1')
    }

    /* ---- 10 · EDITORIAL / SKILLS ---- */
    const ED = {
      line1: [0.06, 0.24], line2: [0.20, 0.38], note: [0.32, 0.46],
      title: [0.40, 0.52], reel: [0.48, 0.94],  enter: 120,
    }

    const edSection = document.querySelector('.ed')

    if (edSection && heroContent.editorial) {
      const copy       = heroContent.editorial
      const pinEl      = edSection.querySelector('.ed-pin')
      const styleEd    = edSection.style
      const reelIn     = edSection.querySelector('[data-slot="ed-reel"]')
      const reelBox    = edSection.querySelector('.ed-reel')
      const edLines    = [...edSection.querySelectorAll('.ed-line')]
      const note       = edSection.querySelector('.ed-note')
      const skillsTitle = edSection.querySelector('.ed-skills-title')

      const clamp01ed  = (v) => Math.min(1, Math.max(0, v))
      const banEd      = (v, a, b) => clamp01ed((v - a) / (b - a))
      const easeOutEd  = (t) => 1 - Math.pow(1 - t, 3)

      // Build reel items
      const items = []
      ;(copy.skills && copy.skills.groups ? copy.skills.groups : []).forEach((g) => {
        const headEl = document.createElement('p')
        headEl.className = 'ed-item ed-item--group'
        headEl.textContent = g.name
        reelIn.append(headEl)
        items.push(headEl)
        ;(g.items || []).forEach((t) => {
          const el = document.createElement('p')
          el.className = 'ed-item ed-item--skill'
          el.textContent = t
          reelIn.append(el)
          items.push(el)
        })
      })

      let pinTopEd = 0, pinRangeEd = 1
      let pEd = 0, pTargetEd = 0, rafEd = null, lastTEd = 0, lastKeyEd = null
      let offsets = [], centre = 0

      const measureEd = () => {
        const r = pinEl.getBoundingClientRect()
        pinTopEd   = r.top + window.scrollY
        pinRangeEd = Math.max(1, pinEl.offsetHeight - window.innerHeight)
        offsets    = items.map((el) => el.offsetTop + el.offsetHeight / 2)
        centre     = reelBox ? reelBox.clientHeight * 0.5 : 0
      }

      const renderEd = (v) => {
        const key = v.toFixed(4)
        if (key === lastKeyEd) return
        lastKeyEd = key

        edLines.forEach((line, i) => {
          const win = i === 0 ? ED.line1 : ED.line2
          const e   = easeOutEd(banEd(v, win[0], win[1]))
          line.style.transform = `translate3d(${((e - 1) * 106).toFixed(2)}%, 0, 0)`
        })

        if (note) {
          const e = easeOutEd(banEd(v, ED.note[0], ED.note[1]))
          note.style.transform = `translate3d(${((1 - e) * -40).toFixed(1)}px, 0, 0)`
          note.style.opacity   = e.toFixed(3)
        }

        if (skillsTitle) {
          const e = easeOutEd(banEd(v, ED.title[0], ED.title[1]))
          skillsTitle.style.transform = `translate3d(${((1 - e) * ED.enter).toFixed(1)}px, 0, 0)`
          skillsTitle.style.opacity   = e.toFixed(3)
        }

        const n   = items.length
        const cur = banEd(v, ED.reel[0], ED.reel[1]) * (n - 1)
        if (offsets.length === n && n) {
          const i0 = Math.max(0, Math.min(n - 1, Math.floor(cur)))
          const i1 = Math.min(n - 1, i0 + 1)
          const y  = offsets[i0] + (offsets[i1] - offsets[i0]) * (cur - i0)
          reelIn.style.transform = `translate3d(0, ${(centre - y).toFixed(1)}px, 0)`
        }

        items.forEach((el, i) => {
          const d       = cur - i
          const arrive  = easeOutEd(clamp01ed(d + 1))
          const past    = clamp01ed((d - 1.1) / 2.4)
          el.style.transform =
            `translate3d(${((1 - arrive) * ED.enter).toFixed(1)}px, 0, 0) ` +
            `scale(${(0.965 + 0.035 * arrive).toFixed(3)})`
          el.style.opacity = (arrive * (1 - past * 0.72)).toFixed(3)
        })

        styleEd.setProperty('--edP', clamp01ed(v).toFixed(4))
      }

      const stepEd = (now) => {
        const dt = lastTEd ? Math.min((now - lastTEd) / 1000, 0.25) : 0.016
        lastTEd = now
        pEd += (pTargetEd - pEd) * (1 - Math.exp(-dt / 0.11))
        if (Math.abs(pTargetEd - pEd) < 0.0004) pEd = pTargetEd
        renderEd(pEd)
        if (pEd === pTargetEd) { lastTEd = 0; rafEd = null; return }
        rafEd = requestAnimationFrame(stepEd)
      }

      const kickEd = () => { if (rafEd === null) rafEd = requestAnimationFrame(stepEd) }

      const onScrollEd = () => { pTargetEd = clamp01ed((window.scrollY - pinTopEd) / pinRangeEd); kickEd() }
      window.addEventListener('scroll', onScrollEd, { passive: true })
      window.addEventListener('resize', () => { measureEd(); onScrollEd() })
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => { measureEd(); onScrollEd() })
      }

      if (reduceMotion.matches) {
        styleEd.setProperty('--edP', '1')
      } else {
        measureEd()
        onScrollEd()
      }
    }

    /* ---- 11 · FOOTER ---- */
    const ftSection = document.querySelector('.ft')

    if (ftSection && heroContent.footer) {
      const styleFt  = ftSection.style
      const ftLines  = [...ftSection.querySelectorAll('.ft-line')]
      const topBtn   = ftSection.querySelector('.ft-top')

      const clamp01ft = (v) => Math.min(1, Math.max(0, v))
      const easeOutFt = (t) => 1 - Math.pow(1 - t, 3)
      let pFt = 0, pTargetFt = 0, rafFt = null, lastTFt = 0, lastKeyFt = null

      const renderFt = (v) => {
        const key = v.toFixed(4)
        if (key === lastKeyFt) return
        lastKeyFt = key
        ftLines.forEach((line, i) => {
          const e = easeOutFt(clamp01ft((v - i * 0.12) / 0.62))
          line.style.transform = `translate3d(0, ${((1 - e) * 108).toFixed(2)}%, 0)`
        })
        styleFt.setProperty('--ftP', v.toFixed(4))
      }

      const stepFt = (now) => {
        const dt = lastTFt ? Math.min((now - lastTFt) / 1000, 0.25) : 0.016
        lastTFt = now
        pFt += (pTargetFt - pFt) * (1 - Math.exp(-dt / 0.13))
        if (Math.abs(pTargetFt - pFt) < 0.0006) pFt = pTargetFt
        renderFt(pFt)
        if (pFt === pTargetFt) { lastTFt = 0; rafFt = null; return }
        rafFt = requestAnimationFrame(stepFt)
      }

      const kickFt = () => { if (rafFt === null) rafFt = requestAnimationFrame(stepFt) }

      const onScrollFt = () => {
        const r = ftSection.getBoundingClientRect()
        pTargetFt = clamp01ft((window.innerHeight - r.top) / (window.innerHeight * 0.72))
        kickFt()
      }

      window.addEventListener('scroll', onScrollFt, { passive: true })
      window.addEventListener('resize', onScrollFt)

      if (reduceMotion.matches) {
        styleFt.setProperty('--ftP', '1')
        ftLines.forEach((l) => { l.style.transform = 'none' })
      } else {
        onScrollFt()
      }

      if (topBtn) {
        topBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' })
        })
      }
    }

    /* ---- Dev/QA jump params ---- */
    if (s2pParam !== null && s2.jump) {
      requestAnimationFrame(() => requestAnimationFrame(() => s2.jump(Number(s2pParam) || 0)))
    }
    if (s3tParam !== null && s2.jumpTr) {
      requestAnimationFrame(() => requestAnimationFrame(() => s2.jumpTr(Number(s3tParam) || 0)))
    }
    if (wkParam !== null && worksApi) {
      requestAnimationFrame(() => requestAnimationFrame(() => worksApi.enter()))
    }

    // Cleanup on unmount
    return () => {
      disableInteractions()
      window.removeEventListener('scroll', () => {})
      window.removeEventListener('resize', () => {})
    }
  }, []) // Run once after first render

  return (
    <>
      <main>
        <HeroSection content={heroContent} />
        <Section2 content={heroContent} />
        <BigRobotSection content={heroContent} />
        <EditorialSection content={heroContent} />
        <SmallRobotSection content={heroContent} />
      </main>

      <WorksOverlay content={heroContent} />
      <FooterSection content={heroContent} />

      {/* cinematic black flash between chapters */}
      <div className="flash" aria-hidden="true"></div>

      {/* Persistent interactive cursor light illuminating text across all scroll sections */}
      <div className="cursor-light" aria-hidden="true"></div>
    </>
  )
}
