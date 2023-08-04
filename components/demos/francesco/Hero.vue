<script setup>

</script>
<template>
    <div>
        <div class="container grid grid-cols-1 md:grid-cols-2 py-4 gap-4">
            <div>
                <h1 class="font-bold text-3xl uppercase text-center my-10">Ristorante Francesco </h1>
                <div class="text-lg">Your Italian Restaurant in the 9th district of Vienna for 30 years.</div>
                <div class="py-6"></div>
                <div class="flex gap-2 items-center">
                    <Icon name="ic:round-access-time" class="inline-block w-12 h-12 text-[#cc6f41] flex-shrink-0"/>
                    <div>
                        <div class="font-bold">Tuesday - Sunday from 12 p.m. to midnight.<br> (closed on Monday)</div>
                        <div class="mt-2">Take away until 10:45 p.m., kitchen until 11 p.m.</div>
                    </div>
                </div>
                <div class="flex gap-2 items-center mt-6">
                        <Icon name="material-symbols:location-on-outline" class="inline-block w-12 h-12 text-[#cc6f41] flex-shrink-0"/>
                        <div class="font-bold">Währinger Strasse 66, 1090 Vienna</div>
                    </div>
            </div>
            <div>
                <img src="https://nicojuhari.b-cdn.net/francesco/hero-demo-francesco-vienna.jpeg" alt="Demo Francesco Vienna" class="w-full">
            </div>
        </div>
        <div class="container my-10">
            <div class="text-lg flex gap-8">
                <div>You can order from our food menu, drinks menu, and wine list until <strong>10:45 p.m.</strong> <br>and pick them up in approximately <strong>10-20 minutes</strong></div>
                <button class="flex-shrink-0 btn bg-[#cc6f41] text-white ml-auto">Order Now - 123 45 67 89</button>
            </div>
        </div>
    </div>
</template>