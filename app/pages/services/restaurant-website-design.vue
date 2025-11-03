<script setup>
useHead({
    title: 'Restaurant Website Design | Custom Websites for Restaurants',
    meta: [
        { name: 'description', content: 'Professional restaurant website design service. I build fast, mobile-friendly restaurant websites that attract more customers and increase sales.' }
    ]
})

const form = ref({
    fullName: '',
    restaurantName: '',
    contact: '',
    websiteOrMenu: '',
    message: ''
})

const submitForm = () => {
    console.log('Form submitted:', form.value)
    // Handle form submission
}

const demos = [
    {
        icon: '🍕',
        name: 'Italian Bistro',
        description: 'Elegant one-page design with booking'
    },
    {
        icon: '☕',
        name: 'Modern Café',
        description: 'Warm and friendly look with digital menu'
    },
    {
        icon: '🌮',
        name: 'Street Food Truck',
        description: 'Fast and colorful mobile-first site'
    }
]

const features = [
    {
        icon: 'i-ph-paint-brush',
        title: 'Modern Design',
        description: 'Simple and pixel-perfect design that converts.'
    },
    {
        icon: 'i-ph-fork-knife',
        title: 'Digital Food Menu',
        description: 'Mobile-friendly and easy-to-update menu.'
    },
    {
        icon: 'i-ph-calendar-check',
        title: 'Clear CTAs',
        description: 'Users know exactly what to do next.'
    },
    {
        icon: 'i-ph-rocket',
        title: 'SEO Optimized',
        description: 'Helps to rank higher in search results.'
    },
    {
        icon: 'i-ph-info',
        title: 'Important Details',
        description: 'Contacts, location, and hours are easy to find.'
    },
    {
        icon: 'i-ph-speedometer',
        title: 'Fast',
        description: 'Users don\'t wait long for your site to load.'
    }
]

const pricingPlans = [
    {
        name: 'Starter',
        price: '€299',
        includes: ['One-page modern website', 'Menu & contact', 'Mobile responsive', 'Basic SEO']
    },
    {
        name: 'Pro',
        price: '€499',
        includes: ['Multi-page design', 'Booking form', 'SEO optimization', 'Google Maps integration'],
        featured: true
    },
    {
        name: 'Premium',
        price: '€699+',
        includes: ['Full design', 'Online ordering', 'Delivery setup', 'Custom features']
    }
]

const badList = [
    'Hard to view menus on mobile or only PDF menus.',
    'Slow loading, old design, and outdated information.',
    'No clear CTAs, users are confused about what to do next.'
]

const goodList = [
    'Looks great on all devices',
    'Easy to update your menu and photos',
    'Fast, modern and responsive design (mobile-first)',
    'Easy-to-edit digital menu (no PDFs)',
    'WhatsApp or Table Booking integrations',
    'SEO & Google Business setup',
    'Hosting & domain setup (optional)'
]
</script>

<template>
    <div>
        <!-- Hero Section -->
        <div class="container py-20 lg:py-32">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="space-y-8">
                    <h1 class="page-title">
                        Restaurant Website Design
                    </h1>
                    <p class="text-gray-500 text-lg leading-relaxed">
                        I build fast, beautiful, and mobile-friendly restaurant websites that attract more customers and increase sales.
                    </p>
                    <div class="flex flex-wrap gap-6">
                        <UButton size="xl" color="primary" to="#contact">
                            Request a Free Demo
                        </UButton>
                        <UButton size="xl" variant="outline" to="#examples">
                            See Examples
                        </UButton>
                    </div>
                </div>
                <div class="relative">
                    <!-- Image Placeholder -->
                    <img src="/images/services/restaurant-website-design__mobile-friendly-restaurant-website.webp" alt="Restaurant Website Design" class="w-full" />
                </div>
            </div>
        </div>
        
        <!-- The Problem (Hook Section) -->
        <div class="py-20 bg-white">
            <div class="container container-sm text-center">
                <h2 class="title mb-8">
                    Why most restaurant websites fail
                </h2>
                <p class="space-y-6 text-lg text-red-700">
                        Hard to use on mobile - Load slowly - PDF menu  - Leave visitors confused.
                </p>
            </div>
        </div>

        <!-- The Solution -->
        <div class="pb-20 bg-white">
            <div class="container">
                <div class="max-w-4xl mx-auto">
                    <h2 class="title mb-8 text-center">
                        What is a great restaurant website?
                    </h2>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div v-for="feature in features" :key="feature.title" class="bg-gray-50 p-6 rounded-lg border">
                            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <UIcon :name="feature.icon" class="w-6 h-6 text-green-600" />
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
                            <p class="text-gray-600">{{ feature.description }}</p>
                        </div>
                    </div>
                    <div class="text-center mt-8">
                        Today, more than 80% of people check a restaurant online before visiting.
                    </div>
                </div>
            </div>
        </div>

        <!-- Examples -->
        <section id="examples" class="py-20 bg-white hidden">
            <div class="container mx-auto px-6">
                <div class="max-w-3xl mx-auto text-center mb-16">
                    <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                        See How Good Restaurant Websites Look
                    </h2>
                    <p class="text-lg text-gray-600 leading-relaxed">
                        We've designed websites for different types of food businesses — from cozy cafes to gourmet restaurants.
                        Here are a few demos:
                    </p>
                </div>

                <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div v-for="demo in demos" :key="demo.name" class="group">
                        <!-- Image Placeholder -->
                        <div class="aspect-[4/3] bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <span class="text-6xl">{{ demo.icon }}</span>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ demo.name }}</h3>
                        <p class="text-gray-600">{{ demo.description }}</p>
                    </div>
                </div>

                <div class="text-center mt-12">
                    <UButton size="lg" variant="outline" to="/restaurant-website-examples">
                        View All Demos
                    </UButton>
                </div>
            </div>
        </section>

        <!-- How It Works -->
        <div class="py-20 bg-gray-50">
            <div class="container">
                <h2 class="title mb-2 text-center">
                        Create a restaurant website in 3 simple steps
                </h2>
                <p class="text-center mb-8">Everything done for you - from design to launch.</p>
                <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div class="relative">
                        <div class="bg-white p-8 rounded-xl shadow-sm text-center">
                            <div class="w-16 h-16 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                                1
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-3">Send your info</h3>
                            <p class="text-gray-600">Share your menu or current website link.</p>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="bg-white p-8 rounded-xl shadow-sm text-center">
                            <div class="w-16 h-16 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                                2
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-3">Get your demo</h3>
                            <p class="text-gray-600">We build a free demo website in 2-3 days.</p>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="bg-white p-8 rounded-xl shadow-sm text-center">
                            <div class="w-16 h-16 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                                3
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-3">Launch your new site</h3>
                            <p class="text-gray-600">Once you approve, we publish it live.</p>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-12">
                    <UButton color="primary" to="#contact" class="px-8">
                        Request a Free Demo Website
                    </UButton>
                </div>
            </div>
        </div>

        <!-- Pricing -->
        <section class="py-20 bg-white hidden">
            <div class="container mx-auto px-6">
                <div class="max-w-3xl mx-auto text-center mb-16">
                    <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Choose the Plan That Fits Your Restaurant
                    </h2>
                </div>

                <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div v-for="plan in pricingPlans" :key="plan.name" 
                         :class="[
                             'bg-white border-2 rounded-2xl p-8',
                             plan.featured ? 'border-orange-500 shadow-xl scale-105' : 'border-gray-200'
                         ]">
                        <div v-if="plan.featured" class="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                            Most Popular
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ plan.name }}</h3>
                        <div class="text-4xl font-bold text-gray-900 mb-6">{{ plan.price }}</div>
                        <ul class="space-y-3 mb-8">
                            <li v-for="item in plan.includes" :key="item" class="flex items-start gap-3">
                                <UIcon name="i-ph-check-circle" class="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                                <span class="text-gray-600">{{ item }}</span>
                            </li>
                        </ul>
                        <UButton 
                            :color="plan.featured ? 'primary' : 'gray'" 
                            :variant="plan.featured ? 'solid' : 'outline'"
                            class="w-full"
                            size="lg"
                            to="#contact"
                        >
                            Get Started
                        </UButton>
                    </div>
                </div>

                <p class="text-center text-gray-600 mt-8">Custom features available on request.</p>
            </div>
        </section>

        <!-- Contact Form -->
        <div id="contact" class="py-20 bg-white">
            <div class="container container-sm">
                <div class="text-center">
                    <h2 class="title mb-6">
                        Get your free demo
                    </h2>
                    <p class="text-lg mb-8">
                        Stop losing customers because of an outdated or missing website.<br class="hidden sm:block">
                        Get your demo website within 3 days - no obligation.
                    </p>
                
                    <form @submit.prevent="submitForm" class="space-y-6">
                        <UFormField label="Full Name" required>
                            <UInput v-model="form.fullName" size="lg" placeholder="John Doe" />
                        </UFormField>

                        <UFormField label="Restaurant Name" required>
                            <UInput v-model="form.restaurantName" size="lg" placeholder="Your Restaurant Name" />
                        </UFormField>

                        <UFormField label="Phone / Email" required>
                            <UInput v-model="form.contact" size="lg" placeholder="phone@example.com" />
                        </UFormField>

                        <UFormField label="Website or PDF Menu (optional)">
                            <UInput v-model="form.websiteOrMenu" size="lg" placeholder="https://..." />
                        </UFormField>

                        <UFormField label="Message">
                            <UTextarea v-model="form.message" :rows="5" class="w-full" placeholder="Tell us about your restaurant and what you need..." />
                        </UFormField>
                        <div class="flex justify-end">
                            <UButton type="submit" size="xl" color="primary">
                                Request Demo Website
                            </UButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>