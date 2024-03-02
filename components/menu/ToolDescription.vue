<script setup>

</script>
<template>
    <div class="my-10 md:my-14">
        <h3 class="text-3xl font-bold mb-6 text-center">How it works</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div class="p-6 flex flex-col justify-center items-center text-center gap-4">
                <Icon name="i-ph-pencil-light" class="w-10 h-10 text-brand-600 text-center"/>
                <div class="font-medium text-center text-xl">Create</div>
                <div>Categories, products and allergens, include appetizing food images to attract customers and boost orders.</div>
            </div>
            <div class="p-6 flex flex-col justify-center items-center text-center gap-4">
                <Icon name="i-ph-copy-light" class="w-10 h-10 text-brand-600 text-center"/>
                <div class="font-medium text-center text-xl">Copy</div>
                <div>Choose from our collection of pre-designed menu templates, which are fast, modern, and responsive.</div>
            </div>
            <div class="p-6 flex flex-col justify-center items-center text-center gap-4">
                <Icon name="i-ph-arrow-square-down-light" class="w-10 h-10 text-brand-600 text-center"/>
                <div class="font-medium text-center text-xl">Paste</div>
                <div>Iclude it into your website or app. Your beautiful, digital menu is ready to impress customers and drive sales.</div>
            </div>
        </div>
        <div class="mt-8 text-center">
            <UButton to="/demos/free-food-menu-design" title="Free Food Menu Design" color="red" variant="soft" size="lg">View the Menu Designs</UButton>
        </div>
    </div>
    <MainMyMenuServices/>
    <div class="my-10 md:my-14">
        <h3 class="text-3xl font-bold mb-6">What is a digital food menu ?</h3>
        <div>A digital food menu is an electronic version of a restaurant's menu displayed on a screen or accessed through a website or mobile app. <br>Unlike a static PDF, it's dynamic and interactive, offering several advantages over traditional paper menus. </div>
    </div>
    <div class="my-10 md:my-14">
            <h3 class="text-3xl font-bold mb-6">Digital menu advantages:</h3>
        <ul class="space-y-3">
            <li>
                1. Convenient browsing: Customers can quickly explore menus on their devices, bypassing physical menus and wait times. Ordering is simple with a few taps.
            </li>
            <li>
                2. On-demand adaptability: Easily update prices, specials, or entire menus without having to reprint them. Provide seasonal delights to keep things interesting and exciting.
            </li>
            <li>
                3. Delightful visuals: Impress customers with high-quality photos and engaging descriptions. Showcase your culinary creations and increase order value.
            </li>
            <li>
                4. Save the environment by going digital: Eliminate printing costs and reduce environmental impact. Digital menus are both cost-effective and environmentally friendly, which benefits everyone.
            </li>
            <li>
                5. Enhance the experience: Provide customers with interactive features such as nutritional information, allergen flags, and even custom orders. Increase trust and satisfaction through transparency and personalization.
            </li>
            <li>
                6. SEO boost for your business: Attract more diners by improving your website's visibility with keyword-rich digital menus that search engines love.
            </li>
        </ul>
    </div>
</template>