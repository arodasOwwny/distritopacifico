// Ejemplo de uso de GSAP en Vue 3
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar plugins (opcional)
gsap.registerPlugin(ScrollTrigger)

export default {
  setup() {
    const box = ref(null)
    
    onMounted(() => {
      // Animación básica
      gsap.from(box.value, {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power3.out'
      })
      
      // Animación con ScrollTrigger
      gsap.from('.card', {
        scrollTrigger: {
          trigger: '.card',
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        opacity: 0,
        y: 100
      })
      
      // Timeline
      const tl = gsap.timeline()
      tl.to('.element1', { x: 100, duration: 1 })
        .to('.element2', { rotation: 360, duration: 1 })
        .to('.element3', { scale: 1.5, duration: 0.5 })
    })
    
    return { box }
  }
}

// Composable para reutilizar animaciones
export const useGsapAnimation = () => {
  const fadeIn = (target, options = {}) => {
    return gsap.from(target, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      ...options
    })
  }
  
  const slideIn = (target, direction = 'left') => {
    const x = direction === 'left' ? -100 : 100
    return gsap.from(target, {
      x,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
  }
  
  return { fadeIn, slideIn }
}
