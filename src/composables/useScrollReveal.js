/**
 * src/composables/useScrollReveal.js
 *
 * Small GSAP + ScrollTrigger helper for scroll-driven reveals.
 * Respects prefers-reduced-motion: when set, targets are shown
 * instantly and no ScrollTriggers are created.
 *
 * Usage:
 *   const { revealOne, revealStagger } = useScrollReveal()
 *   onMounted(() => revealStagger(el.value, '.card'))
 */

import { onBeforeUnmount } from 'vue'
import { gsap, ScrollTrigger } from '@/plugins/gsap'

export function prefersReducedMotion () {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useScrollReveal () {
  const reduced = prefersReducedMotion()
  const triggers = []

  function clearProps (targets) {
    gsap.set(targets, { clearProps: 'all' })
  }

  // Reveal a single element (or NodeList) on scroll.
  function revealOne (target, options = {}) {
    if (!target) return
    if (reduced) {
      clearProps(target)
      return
    }
    const {
      y = 40,
      x = 0,
      duration = 0.9,
      delay = 0,
      start = 'top 85%',
      from = {},
    } = options

    const tween = gsap.from(target, {
      opacity: 0,
      y,
      x,
      duration,
      delay,
      ease: 'power3.out',
      ...from,
      scrollTrigger: {
        trigger: target,
        start,
        toggleActions: 'play none none none',
        once: true,
      },
    })
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    return tween
  }

  // Reveal children of `container` matching `selector` with a stagger.
  function revealStagger (container, selector, options = {}) {
    if (!container) return
    const items = selector ? container.querySelectorAll(selector) : container.children
    if (!items || !items.length) return
    if (reduced) {
      clearProps(items)
      return
    }
    const {
      y = 48,
      duration = 0.8,
      stagger = 0.12,
      start = 'top 80%',
    } = options

    const tween = gsap.from(items, {
      opacity: 0,
      y,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: 'play none none none',
        once: true,
      },
    })
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    return tween
  }

  // Generic timeline factory for custom intros (e.g. hero).
  function timeline (config = {}) {
    return gsap.timeline(config)
  }

  onBeforeUnmount(() => {
    triggers.forEach((t) => t && t.kill())
    triggers.length = 0
  })

  return { reduced, revealOne, revealStagger, timeline, gsap, ScrollTrigger }
}

export default useScrollReveal
