<script setup>
    useHead({
        title: 'Free QR Code Generator - No Account Required!',
        meta: [
            { name: 'description', content: 'Easily generate free QR codes for your website URL. No signup needed! Download high-quality QR code images in seconds. Get yours now!' }
        ],
    })
</script>
<template>
    <div class="container">
        <h1 class="title mb-2">Free QR Code Generator</h1>
        <h2 class="mb-8">Get your QR code in seconds and for free! Simply enter your website URL below.</h2>
        <ClientOnly>
            <QrCodeGenerator />
            <template #fallback>
            <!-- this will be rendered on server side -->
            <Loading class="mx-auto"/>
          </template>
        </ClientOnly>
        <div class="space-y-2 mt-6">
            <h3 class="text-2xl pt-4 font-semibold">What is a QR code?</h3>
            <p>QR codes (Quick Response codes) are the square, black and white patterns that appear everywhere.</p>
            <p>They connect the physical and digital worlds, allowing you to instantaneously share information with a
                scan of your smartphone.</p>
            <p>Our Free QR Code Generator allows you to create your own QR codes quickly, easily, and for free!</p>
    
            <h3 class="text-2xl pt-4 font-semibold">Who needs QR codes?</h3>
    
            <p>Everyone can profit from using QR codes! Here are a few examples:</p>
            <ul class="list-disc list-inside space-y-1.5">
                <li>Businesses can use them on business cards, pamphlets, or product packaging to lead clients to their
                    website,social media profiles, or online menus.</li>
                <li>Marketers can use them to promote and give discounts, encouraging customers to scan and redeem
                    deals.</li>
                <li>Artists and creatives: Provide links to your portfolio, online store, or social network profiles for
                    simple access.</li>
                <li>Personal Use: Send your Wi-Fi password, contact information, or a link to a special occasion photo
                    album.</li>
            </ul>
            <h3 class="text-2xl pt-4 font-semibold">How to Use Our Free QR Code Generator:</h3>
            <ol class="list-decimal list-inside space-y-1.5">
                <li><strong>Enter your website's URL.</strong> This is the most
                    common use for QR codes, directing users to a specific web page.</li>
                <li><strong>Customize (Optional).</strong> Some free generators
                    may offer limited customization options, like size or color.</li>
                <li><strong>Download your QR code image.</strong> Save it to your
                    device for printing or sharing online.</li>
            </ol>
            <p><strong>Simple, fast, and free!</strong></p>
            <p>Our free QR code generator eliminates the need for complex software or expensive subscriptions. In just a
                few clicks, you'll have a scannable QR code ready to use!</p>
    
            <h3 class="text-2xl pt-4 font-semibold">FAQs:</h3>
    
            <div class="text-lg pt-4 font-bold">Does my QR code expire?</div>
            <p>No, your QR code will remain valid as long as the linked information (e.g., website URL) stays the same.
            </p>
    
            <div class="text-lg pt-4 font-bold">Can I use a QR code for anything other than website URLs?</div>
            <p>Yes! QR codes can encode various data types like text, contact information, email addresses, or even
                vCard details. However, our free generator might be limited to URLs for now.</p>
    
            <div class="text-lg pt-4 font-bold">How do I scan a QR code?</div>
            <p>Most smartphones have built-in QR code scanners. Simply open your camera app and point it at the QR code.
                You'll be directed to the linked information automatically.</p>
    
            <div class="text-lg pt-4 font-bold">Can I edit my QR code after downloading it?</div>
            <p>Unfortunately, no. Once downloaded, the QR code represents the information encoded at that time. If you
                need to make changes, you'll need to
                generate a new QR code.</p>
    
            <p class="pt-8"><strong>Ready to get started?</strong></p>
            <p>Generate your free QR code today and experience the convenience of this powerful tool! Simply copy and paste your desired URL and let our generator do the rest.</p>
        </div>
    </div>
</template>