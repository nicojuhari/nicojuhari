<script setup>

</script>
<template>
    <div class="container-custom">
    <!-- Page Title -->
    <header class="mb-8 sm:mb-12 text-center">
      <h1 class="title mb-4">Typography & Spacing Guide</h1>
      <p class="paragraph text-gray-600">A reference for creating clean, cool, and understandable designs with TailwindCSS</p>
    </header>

    <!-- Typography Section -->
    <section class="mb-8 sm:mb-12">
      <h2 class="subtitle mb-4">1. Typography</h2>

      <article class="mb-6 sm:mb-8">
        <h3 class="h3 mb-2">Font Sizes</h3>
        <p class="paragraph mb-4">Use a consistent scale for different text elements:</p>
        <div class="space-y-2">
          <h1 class="h1">Heading 1 (text-4xl)</h1>
          <h2 class="h2">Heading 2 (text-3xl)</h2>
          <h3 class="h3">Heading 3 (text-2xl)</h3>
          <p class="paragraph">Paragraph (text-base)</p>
          <span class="caption">Caption (text-sm)</span>
        </div>
      </article>

      <article class="mb-6 sm:mb-8">
        <h3 class="h3 mb-2">Font Weights & Line Heights</h3>
        <p class="paragraph">Adjust weight and line height for readability and emphasis:</p>
        <ul class="list-disc list-inside space-y-2 mt-4">
          <li><span class="font-bold">Bold (font-bold):</span> Use for headers or important text.</li>
          <li><span class="font-semibold">Semibold (font-semibold):</span> For subheaders or secondary emphasis.</li>
          <li><span class="font-normal">Normal (font-normal):</span> Default for body text.</li>
          <li><span class="font-light">Light (font-light):</span> Use sparingly for muted content.</li>
        </ul>
      </article>

      <article class="mb-6 sm:mb-8">
        <h3 class="h3 mb-2">Color Usage</h3>
        <p class="paragraph">Ensure proper contrast for readability:</p>
        <div class="space-y-2 mt-4">
          <p class="paragraph text-gray-800">High Contrast: Text on a light background.</p>
          <p class="paragraph text-gray-600">Muted Text: Use for less important content.</p>
          <p class="paragraph text-blue-600 hover:text-blue-800">Links: Interactive and clear.</p>
        </div>
      </article>
    </section>

    <!-- Spacing Section -->
    <section class="mb-8 sm:mb-12">
      <h2 class="subtitle mb-4">2. Spacing</h2>

      <article class="mb-6 sm:mb-8">
        <h3 class="h3 mb-2">Consistent Spacing</h3>
        <p class="paragraph">Use Tailwind's spacing scale for paddings and margins:</p>
        <ul class="list-disc list-inside mt-4">
          <li><span class="inline-block bg-gray-100 p-2 mr-2">p-4</span>Padding: 1rem (16px).</li>
          <li><span class="inline-block bg-gray-100 p-2 mr-2">m-8</span>Margin: 2rem (32px).</li>
        </ul>
      </article>

      <article class="mb-6 sm:mb-8">
        <h3 class="h3 mb-2">White Space</h3>
        <p class="paragraph">White space improves readability and focus. Example:</p>
        <div class="card mt-4">
          <p class="paragraph">This block uses padding and margins to create a balanced layout.</p>
        </div>
      </article>
    </section>

    <!-- Hierarchy Section -->
    <section class="mb-12">
      <h2 class="subtitle mb-4">3. Hierarchy</h2>

      <article class="mb-8">
        <h3 class="h3 mb-2">Guiding the User</h3>
        <p class="paragraph">Use size, weight, and color to create a clear visual flow:</p>
        <div class="mt-4 space-y-4">
          <h1 class="h1">Main Title</h1>
          <h2 class="h2 text-gray-700">Subheading</h2>
          <p class="paragraph">Body text follows, with less emphasis and smaller font size.</p>
        </div>
      </article>

      <article class="mb-8">
        <h3 class="h3 mb-2">Using Grid Systems</h3>
        <p class="paragraph">Leverage Tailwind's grid for responsive layouts:</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div class="card">Content Block 1</div>
          <div class="card">Content Block 2</div>
        </div>
      </article>
    </section>

    <!-- Footer -->
    <footer class="text-center mt-12">
      <p class="caption">Made with ❤️ and TailwindCSS</p>
    </footer>
  </div>
</template>

<style scoped>
    .title {
      @apply text-3xl sm:text-4xl font-bold leading-tight;
    }
    .subtitle {
      @apply text-2xl sm:text-3xl font-semibold leading-snug;
    }
    .paragraph {
      @apply text-sm sm:text-base font-normal leading-relaxed;
    }
    .caption {
      @apply text-xs sm:text-sm font-light text-gray-500;
    }
    h1, .h1 {
      @apply text-3xl sm:text-4xl font-bold leading-tight;
    }
    h2, .h2 {
      @apply text-2xl sm:text-3xl font-semibold leading-snug;
    }
    h3, .h3 {
      @apply text-xl sm:text-2xl font-medium leading-snug;
    }
    p, .p {
      @apply text-sm sm:text-base font-normal leading-relaxed;
    }
    .card {
      @apply bg-white shadow-lg rounded-lg p-4 sm:p-8;
    }
    .container-custom {
      @apply container mx-auto py-8 sm:py-12 px-4 sm:px-6;
    }
  </style>