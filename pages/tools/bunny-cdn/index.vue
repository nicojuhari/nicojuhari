<script setup>
useHead({
    title: 'Streamline Your Bunny.net CDN: Free Asset Management Tool',
    meta: [
        { name: 'description', content: 'Manage all your Bunny.net assets (images, videos, PDFs) in one place! This free tool simplifies your workflow with easy uploads, organisation, and file deletion' }
    ],
})

const showModal = ref(false);

</script>
<template>
    <div>
        <BunnyHero />
        <BunnyStorageList v-if="storageZones?.length" />
        <div class="container py-24" v-else>
            <div class="text-center py-6">
                <div class="mb-4">To get started, enter your <a href="https://bunny.net?ref=kw3bknywrh" target="_blank"
                        rel="nofollow" class="font-medium">Bunny.net</a> API key and fetch your storages.</div>
                <UButton color="brand" size="md" variant="outline" @click="showModal = true">
                    <Icon name="ph:key-light" class="w-6 h-6" />
                    Configure your Storage
                </UButton>
            </div>
        </div>
        <div class="container space-y-4 py-8">
            <h3 class="text-2xl pt-4 font-semibold">What is a CDN (Content Delivery Network)?</h3>
            <p>A Content Delivery Network (CDN) is a geographically distributed network of servers that stores and
                delivers your website's content (images, videos, PDFs, etc.) to users based on their location.</p>
            <p>This can significantly improve website performance by:</p>
            <ul class="list-inside list-disc space-y-1.5">
                <li><strong>Reducing Load Times:</strong> Files are served from servers closer to the user, minimizing
                    the distance data
                    needs to travel.</li>
                <li><strong>Enhancing User Experience:</strong> Faster loading times lead to a smoother browsing
                    experience and
                    potentially higher customer engagement.</li>
                <li><strong>Increasing Website Availability:</strong> CDNs are designed for redundancy, ensuring your
                    website remains
                    accessible even if a single server experiences an issue.</li>
            </ul>
            <h3 class="text-2xl pt-4 font-semibold">Why Use Bunny.net?</h3>
            <p><a href="https://bunny.net?ref=kw3bknywrh" target="_blank" rel="nofollow external">Bunny.net</a> is a
                popular CDN provider offering a variety of features to optimize your website's speed and reliability.
            </p>
            <p>Here's why it stands out:</p>
            <ul class="list-inside list-disc space-y-1.5">
                <li><strong>Global Network:</strong> Bunny.net boasts a vast network of servers worldwide, ensuring fast
                    content delivery
                    across the globe.</li>
                <li><strong>Security Features:</strong> Bunny.net offers robust security features like DDoS protection
                    and SSL certificates
                    to safeguard your website from online threats.</li>
                <li><strong>Performance Optimization:</strong> Utilize tools like image and video optimization to
                    further
                    reduce file size and improve loading times.</li>
                <li><strong>Cost-Effective Plans:</strong> Choose from a variety of plans to fit your specific bandwidth
                    and storage needs.</li>
            </ul>
            <h3 class="text-2xl pt-4 font-semibold">Effortless Bunny.net Asset Management: Upload, Organize, and Share
            </h3>
            <p>Now, managing your website's assets hosted on Bunny.net is easier than ever!</p>
            <p>Our free tool simplifies your workflow by providing a central hub for all your images, videos, and PDFs.
            </p>
            <ul class="list-inside list-disc space-y-1.5">
                <li><strong>Easy Uploads &amp; Renaming:</strong> Upload and rename files directly within the tool,
                    saving you time and
                    effort.</li>
                <li><strong>Organized Folders:</strong> Create and navigate through folders to keep your asset library
                    well-structured and
                    easy to find what you need.</li>
                <li><strong>Secure File Deletion:</strong> Remove unwanted files with ease, ensuring your asset library
                    stays clean and
                    organized.</li>
                <li><strong>Shareable Links:</strong> Generate secure links to share your assets with team members or
                    clients for
                    collaboration.</li>
            </ul>
            <h3 class="text-2xl pt-4 font-semibold">FAQs:</h3>
            <h4 class="text-lg font-medium pt-4">Is this tool free?</h4>
            <p>Yes, the basic features of this tool are completely free to use.</p>
            <h4 class="text-lg font-medium pt-4">Does this tool affect my Bunny.net pricing?</h4>
            <p>No, the tool itself is separate from your Bunny.net plan. However, downloading and viewing your files
                will use your monthly bandwidth allocation.</p>
            <h4 class="text-lg font-medium pt-4">Is my Bunny.net API key secure?</h4>
            <p>Absolutely! Your API key is stored securely in your browser&#39;s local storage and not accessible
                online. You can also refresh your API key directly on the Bunny.net dashboard for added security.</p>
            <h4 class="text-lg font-medium pt-4">Can I share my assets with others?</h4>
            <p>Yes, you can generate secure links to share your assets with team members, clients, or anyone else you
                choose.</p>

            <div class="pt-4"><strong>Ready to Experience Streamlined Asset Management?</strong></div>

            <p>Take control of your Bunny.net assets today! Use our free tool to simplify uploads, organization, and
                sharing. <br>For pricing options and detailed terms of service, visit <a class="text-orange-600" 
                    href="https://bunny.net?ref=kw3bknywrh" target="_blank" rel="nofollow external">Bunny.net</a></p>

            <p><strong>Start Managing Your Assets Now!</strong></p>
        </div>
        <UModal v-model="showModal" class="custom-class">
            <BunnyModalsStorageConfig @close="showModal = false" />
        </UModal>
    </div>
</template>