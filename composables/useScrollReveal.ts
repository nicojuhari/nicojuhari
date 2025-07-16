// composables/useScrollReveal.ts
import { useElementVisibility } from '@vueuse/core'
import { useTemplateRef } from '#imports'
import { ref, computed } from 'vue'

export function useScrollReveal(options?: {
  threshold?: number
  delay?: number
  y?: number
  once?: boolean
}) {
  const el = useTemplateRef<HTMLElement>('el')

  const isVisible = useElementVisibility(el, {
    threshold: options?.threshold ?? 0.5,
  })

  const hasAnimated = ref(false)

  const visible = computed(() => {
    if (options?.once) {
      if (isVisible.value && !hasAnimated.value) {
        hasAnimated.value = true
      }
      return hasAnimated.value
    }
    return isVisible.value
  })

  const motion = computed(() => ({
    initial: { opacity: 0, y: options?.y ?? 40 },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        delay: options?.delay ?? 0,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }))

  return {
    el,
    motion,
    visible,
  }
}
