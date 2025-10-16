<script setup lang="ts">
    useSeoMeta({
        title: 'Rain of Emojis - CSS Animations and JavaScript | Playground',
        description: 'A fun playground that creates a rain of emojis using JavaScript, Vue and CSS animations.',
    })
    definePageMeta({
        layout: 'empty'
    })
    // celebration of emojis
    const emojis = ['🎉','🎊','✨','💫','🌟','🔥','🚀','🌈','💥','🍾','🥳','😄','😆','😁','😂','🤣','😊','😇','🙂','😉']
    const containerRef = ref<HTMLElement | null>(null)


    const createEmojiElement = () => {
        if (!containerRef.value) return null

        const emojiEl = document.createElement('div')
        emojiEl.classList.add('emoji')
        emojiEl.setAttribute('aria-hidden', 'true') // Accessibility: hide from screen readers
        emojiEl.style.left = `${Math.random() * 100}%`
        emojiEl.style.fontSize = `${Math.random() * 24 + 24}px` // 24px to 48px

        const animationDuration = Math.random() * 3 + 3 // 3s to 6s
        emojiEl.style.animationDuration = `${animationDuration}s` // 3s to 6s
        emojiEl.innerText = emojis[Math.floor(Math.random() * emojis.length)] ?? ''

        containerRef.value.appendChild(emojiEl)

        // Remove the element after animation duration to prevent DOM overload
        setTimeout(() => {
            emojiEl.remove()
        }, animationDuration * 1000 + 200) // Match the max animation duration

    }
    
    onMounted(() => {
        window.setInterval(() => {
            createEmojiElement()
        }, 200) // Update every second
    })

</script>
<template>
    <h1 class="my-6 text-center">Rain of Emojis - CSS Animations and JavaScript | Playground</h1>
    <div ref="containerRef" class="emojis-rain fixed inset-0 overflow-hidden bg-gray-950 z-1">
        <!-- Emojis will be appended here -->
    </div>
</template>
<style>
    @keyframes emojiRain {
        from {
            transform: translateX(-50%) translateY(-100%);  /* Start slightly above the viewport */ 
        }
        to {
            transform: translateX(-50%) translateY(100vh);
        }
    }
    .emojis-rain .emoji{
        position: absolute;
        top: 0;
        user-select: none;
        animation: emojiRain linear forwards;
        will-change: transform;
    }
</style>

