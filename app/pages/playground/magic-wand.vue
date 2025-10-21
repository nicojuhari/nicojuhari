<script setup lang="ts">
    
    useSeoMeta({
        title: 'Magic Wand Sparkles - CSS Animations and JavaScript | Playground',
        description: 'A fun playground that creates magic wand sparkles using JavaScript and CSS animations.',
    })
    
    import "@/assets/styles/magic-wand.css"

    definePageMeta({
        layout: 'empty'
    })

    
    
    const containerRef = ref<HTMLElement | null>(null)

    onMounted(() => {
        // Any additional logic if needed
        window.addEventListener('click', (e) => {
            const x = e.clientX
            const y = e.clientY

            //run foreach 12 times to create sparkles
            for (let i = 0; i < 12; i++) {
                const star = document.createElement('div')
                star.setAttribute('aria-hidden', 'true')
                star.classList.add('star')
                // star.innerText = '⭐'
                star.style.left = `${x}px`
                star.style.top = `${y}px`

                //set random angle and distance
                const angle = Math.floor(Math.random() * 360)  // Random angle
                const distance = Math.floor(Math.random() * 40 + 90)  // Random distance
                const rotation = Math.floor(Math.random() * 360 + 60) // Random rotation
                
                star.style.setProperty('--angle', angle + 'deg')
                star.style.setProperty('--distance', distance + 'px')
                star.style.setProperty('--rotation', rotation + 'deg')

                containerRef.value?.appendChild(star)


                setTimeout(() => {
                    star.remove()
                }, 1000 + 300 + 200); // Match the total animation duration
            }    

        })
    })
</script>
<template>
    <div class="magic-wand bg-blue-950 relative" ref="containerRef">
    </div>
</template>