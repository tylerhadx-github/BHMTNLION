/**
 * plugins/gsap.js
 *
 * Registers GSAP plugins once for the whole app.
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
