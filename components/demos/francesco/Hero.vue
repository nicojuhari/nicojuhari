<script setup>
    import { gsap } from "gsap";

    


    onMounted(() => {

       
        let mm = gsap.matchMedia();
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        const imageOptions = { opacity: 1, y: 0, x: 0, duration: 1.6, ease: "power3.out" }
        tl.set('[data-gsap-grid] div img', { opacity: 0})
        mm.add("(min-width: 768px)", () => {
            //desktop
            tl.to('[data-gsap-grid] div img', { ...imageOptions, stagger: {
                amount: .2,
                from: "center",
                axis: "x",
            }
        })
            .to('[data-gsap-bg]', { opacity: .7, duration:.1, background: 'black' }, '-=.6')
        })

        // mm.add("(max-width: 767px)", () => {
        //     //mobile
        //     tl.to('[data-gsap-grid] div img', { ...imageOptions, rotate: '360deg',  stagger: {
        //         amount: .2,
        //         from: "center",
        //         axis: "x",
        //     }
        // })
        //     .to('[data-gsap-bg]', { opacity: .7, background: 'black' })
        // })
        
        // const toOptions = { opacity: 0, y: 0 }
        

        // tl.to('[data-gsap-title]', { ...toOptions })
        //     .to('[data-gsap-subtitle]', { ...toOptions }, '-=0.3')
        //     .to('[data-gsap-btn]', { ...toOptions, stagger: .2 }, '-=0.3')
        //     .to('[data-gsap-ingredients]', { ...imageOptions, stagger: .2 })
        //     .to('[data-gsap-pizza]', { rotate: -180, duration: 1.4, x: 0 }, '-=2.5')
        
        // tl.to('[data-gsap-grid] div img', { ...imageOptions, stagger: {
        //     amount: .2,
        //     from: "center",
        //     axis: "x",
        // } })
        // .to('[data-gsap-bg]', { opacity: .5, background: 'black' })
    });
</script>
<template>
    <div class="relative">
        <div class="relative overflow-hidden">
            <div class=" md:grid-cols-5 h-[calc(100vh-56px)] grid-rows-5 md:grid-rows-1 hidden md:grid" data-gsap-grid>
                <div data-gsap-img-one>
                    <img src="https://nicojuhari.b-cdn.net/francesco/demo-francesco-grid-1.png" class="object-cover h-full w-full"/>
                </div>
                <div data-gsap-img-two>
                    <img src="https://nicojuhari.b-cdn.net/francesco/demo-francesco-grid-2.png" class="object-cover h-full w-full"/>
                </div>
                <div data-gsap-img-three>
                    <img src="https://nicojuhari.b-cdn.net/francesco/demo-francesco-grid-3.png" class="object-cover h-full w-full"/>
                </div>
                <div data-gsap-img-four>
                    <img src="https://nicojuhari.b-cdn.net/francesco/demo-francesco-grid-4.png" class="object-cover h-full w-full"/>
                </div>
                <div data-gsap-img-five>
                    <img src="https://nicojuhari.b-cdn.net/francesco/demo-francesco-grid-5.png" class="object-cover h-full w-full"/>
                </div>
            </div>
            <div class="h-[calc(100vh-156px)] md:hidden">
                <img src="https://nicojuhari.b-cdn.net/francesco/demo-francesco-grid-2.png" class="object-cover h-full w-full"/>
            </div>
            <div class="absolute h-full w-full top-0 left-0 duration-500 hidden md:block" data-gsap-bg></div>
            <div class="absolute h-full w-full top-0 left-0 duration-500 bg-black bg-opacity-50 md:hidden" data-gsap-bg></div>
            <div class="absolute h-full top-0 text-white left-0 w-full">
                <div class="container grid place-content-center h-full p-4">
                    <h1 class="font-extrabold text-5xl md:text-6xl uppercase text-center my-10">Ristorante Francesco </h1>
                    <div class="text-3xl md:text-2xl text-center">Your Italian Restaurant in the 9th district of Vienna for 30 years.</div>
                </div>
            </div>
        </div>
        <div class="bg-slate-50 py-10 md:py-20">
            <div class="container grid md:grid-cols-2 gap-6">
                <div>
                    <div class="flex gap-2 items-center shadow-md p-4 rounded-md bg-white">
                        <Icon name="ic:round-access-time" class="inline-block w-12 h-12 text-[#cc6f41] flex-shrink-0"/>
                        <div>
                            <div class="font-bold">Tuesday - Sunday from 12 p.m. to midnight.<br> (closed on Monday)</div>
                            <div class="mt-2">Take away until 10:45 p.m., kitchen until 11 p.m.</div>
                        </div>
                    </div>
                    <div class="flex gap-2 items-center mt-6 shadow-md p-4 rounded-md bg-white">
                        <Icon name="material-symbols:location-on-outline" class="inline-block w-12 h-12 text-[#cc6f41] flex-shrink-0"/>
                        <div class="font-bold">Währinger Strasse 66, 1090 Vienna</div>
                    </div>
                </div>
                <div class="text-lg flex-col gap-8 items-center justify-center shadow-md p-4 rounded-md bg-white">
                    <div>You can order from our food menu, drinks menu, and wine list until <strong>10:45 p.m.</strong> and pick them up in approximately <strong>10-20 minutes.</strong></div>
                    <button class="flex-shrink-0 btn bg-[#cc6f41] text-white mt-8 mx-auto">Order Now - 123 45 67 89</button>
                </div>
            </div>
        </div>
        
        
    </div>
</template>
<style>
    .text-shadow {
        text-shadow: 0 0 10px rgba(0,0,0,.5);
    }

    [data-gsap-img-one] img, [data-gsap-img-three] img, [data-gsap-img-five] img {
        transform: translate(-100%, 0);
    }

    [data-gsap-img-two] img, [data-gsap-img-four] img {
        transform: translate(100%, 0);
    }

    @media (min-width: 768px) {

        [data-gsap-grid] img {
            transform: rotate(90deg);
        }

        [data-gsap-img-one] img, [data-gsap-img-three] img, [data-gsap-img-five] img {
            transform: translate(0, -100%);
        }

        [data-gsap-img-two] img, [data-gsap-img-four] img {
            transform: translate(0, 100%);
        }
    }
</style>