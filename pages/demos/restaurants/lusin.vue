<script setup lang="ts">

const currentURL = useRoute().path
const loading = ref(true);

onMounted(async () => {
    try {
        loading.value = true;
        const { createMenu } = await useMenuDefault();
        fetch('https://api.1food.menu/v1/menus/677972a80011654b9076').then(res => res.json()).then(menuData => {
            createMenu(menuData, {
                version: 1,
                priceSymbol: '$',
                priceSymbolPosition: 1,
                labels: {
                    allergens: 'Allergens',
                    outOfStock: 'Currently Unavailable',
                    categoryAll: 'All',
                },
                features: {
                    credits: false,
                    categoryTabs: true,
                    allergenTabs: true,
                }
            });
        })
    } catch(e) {
        console.error(e)
    } finally {
        loading.value = false;
    }
});

</script>
<template>
    <div class="relative font-sans">
        <div class="h-full overflow-hidden absolute inset-0">
            <img src="https://lusinrestaurant.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-25-at-4.57.20-PM-2.jpeg" alt="Lusin Restaurant" class="w-full object-cover object-center h-full" />
            <div class="absolute inset-0 bg-linear-to-b from-black/80 to-black/30 basckdrop-blur-3xl"></div>
        </div>
        <div class="relative top-0 left-0 right-0 z-10 h-14 text-white">
            <div class="flex items-center justify-between py-4 container">
                <NuxtLink to="/">
                    <img src="https://nicojuhari.b-cdn.net/demos/lusin/lusin-logo.png" alt="Lusin Restaurant" class="w-auto h-8 object-cover mx-auto" />
                </NuxtLink>
                <nav>
                    <ul class="flex gap-6 items-center">
                        <li>
                            <UButton :to="currentURL + '#catering'" class="bg-white text-black hover:bg-white/80 rounded-full px-6">Catering</UButton>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
         
        <div class="container relative pt-44 pb-72">
            <div class="text-center w-full">
                <img src="https://nicojuhari.b-cdn.net/demos/lusin/lusin-logo-animation.gif" alt="Lusin Restaurant" class="w-auto h-[240px] object-cover mx-auto" />
                <h1 class="text-2xl text-white font-thin uppercase font-sans">Lusin Saudi Arabia</h1>
                <div class="flex gap-6 justify-center mt-10">
                    <UButton :to="currentURL + '#menu'" class="text-white bg-[#d10f8b] hover:bg-[#d10f8b]/80 rounded-full px-6" size="xl">
                        View Menu
                    </UButton>
                    <UButton :to="currentURL + '#reservation'" class="bg-white text-black hover:bg-white/80 rounded-full px-6" size="xl">
                        Reserve a table
                    </UButton>
                </div>
            </div>
        </div>
    </div>
    <div class="font-sans">
        <!-- Menu -->
         <div id="menu" class="bg-gray-100/50">
            <div class="container pt-24 pb-16">
                <h2 class="text-3xl text-[#d10f8b] font-thin uppercase font-sans text-center">Menu</h2>
                <div id="OneFoodMenu" class="mt-10"></div>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/1food-menu@0.6.10/dist/style.css"/>
                <div v-if="loading" class="flex justify-center items-center">
                    <Loading />
                </div>
            </div>
         </div>
        <!-- About -->
        <div id="about" class="container my-24">
            <div>
                <h2 class="text-3xl text-[#d10f8b] font-thin uppercase font-sans text-center">About</h2>
                <div class="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <img src="https://nicojuhari.b-cdn.net/demos/lusin/lusin-gallery-1.jpeg" alt="Lusin Restaurant" class="w-full h-full object-cover rounded-lg" />
                        <img src="https://nicojuhari.b-cdn.net/demos/lusin/lusin-gallery-2.jpg" alt="Lusin Restaurant" class="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div class="text-lg space-y-4">
                        <p>Lusin is Armenian cuisine.  Lusin comes expressing “the moon”; a beautiful and delicate symbol in the Armenian culture.</p>
                        <p>Lusin is a leading brand in the Kingdom of Saudi Arabia and the United Kingdom to Serve Armenian foods with a modern twist.</p>
                        <p>As an Armenian cuisine, it is reflecting the Armenian culture with its relish music, food, literature, and nature. Prepare yourself to savor an evocative cuisine to celebrate the centuries-old tradition of a proud people.</p>
                        <p>Lusin serves its guest's enticing Armenian specialties renowned for its distinctive aromas and flavorful preparations.</p>
                        <div class="flex justify-center md:!justify-start mt-10 lg:mt-0">
                            <UButton class="bg-[#d10f8b] text-white hover:bg-[#d10f8b]/80 rounded-full px-6" size="xl">Read More</UButton>
                        </div>
                        <!-- <p>Take a gastronomic journey and be tempted by a collection of exquisite dishes that feature pomegranate tanginess, along with an aromatically rich aftertaste such as Manti, Kebab, and traditional appetizers aplenty.</p> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-100/50 py-24">
            <div class="container text-center">
              <h3 class="text-xl font-semibold mb-4">Follow Us</h3>
              <p class="mb-6">Stay connected and see what's cooking at Lusin</p>
              
              <div class="flex justify-center gap-6">
                <!-- Instagram -->
                <a href="#" class="flex items-center">
                    <UIcon name="i-ph-instagram-logo" class="w-8 h-8 text-gray-800" />
                </a>
                
                <!-- Facebook -->
                <a href="#" class="flex items-center">
                    <UIcon name="i-ph-facebook-logo" class="w-8 h-8 text-gray-800" />
                </a>
                
                <!-- TripAdvisor -->
                <a href="#" class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 32 32"><path fill="currenColor" d="M30.683 12.708c.375-1.609 1.568-3.219 1.568-3.219h-5.349c-3.005-1.943-6.647-2.968-10.688-2.968c-4.187 0-7.968 1.041-10.953 3H.252s1.176 1.583 1.556 3.181C.835 14.046.252 15.666.252 17.447c0 4.416 3.599 8.011 8.015 8.011c2.527 0 4.765-1.183 6.245-3.005l1.697 2.552l1.724-2.584a7.85 7.85 0 0 0 2.937 2.324c1.943.88 4.125.979 6.125.239c4.141-1.536 6.26-6.161 4.74-10.301a7.8 7.8 0 0 0-1.079-1.98zm-4.23 10.765a6.32 6.32 0 0 1-4.891-.192a6.33 6.33 0 0 1-2.651-2.303c-.272-.4-.5-.833-.672-1.296c-.199-.527-.292-1.068-.344-1.62c-.099-1.109.057-2.229.536-3.271a6.4 6.4 0 0 1 3.604-3.328c3.319-1.219 7 .484 8.219 3.791c1.224 3.308-.479 6.991-3.781 8.215h-.02zm-12.89-2.446a6.4 6.4 0 0 1-5.297 2.817c-3.525 0-6.401-2.875-6.401-6.396s2.876-6.401 6.401-6.401c3.527 0 6.396 2.88 6.396 6.401c0 .219-.036.416-.063.64c-.109 1.079-.453 2.1-1.036 2.959zm-9.366-3.663c0 2.188 1.781 3.959 3.964 3.959s3.959-1.771 3.959-3.959a3.959 3.959 0 0 0-7.918 0zm16.068 0a3.956 3.956 0 1 0 3.953-3.952a3.963 3.963 0 0 0-3.959 3.952zm-14.697 0a2.594 2.594 0 0 1 2.583-2.593c1.417 0 2.599 1.167 2.599 2.593a2.6 2.6 0 0 1-5.203 0zm16.047 0a2.593 2.593 0 0 1 2.593-2.593a2.597 2.597 0 0 1-.015 5.193a2.597 2.597 0 0 1-2.6-2.6zm-5.407-9.443c2.88 0 5.48.516 7.761 1.548a8.1 8.1 0 0 0-2.543.479a7.9 7.9 0 0 0-4.5 4.167c-.416.88-.635 1.812-.719 2.755a8.03 8.03 0 0 0-7.844-7.437c2.281-.979 4.928-1.511 7.787-1.511z"/></svg>
                </a>
              </div>
            </div>

        </div>

        
 
    <div class="py-24">
      <!-- <h2 class="text-3xl text-[#d10f8b] font-thin uppercase font-sans text-center">Contact Information</h2> -->
      
      <div class="container mx-auto">
        <div class="p-8">
          <div class="grid md:grid-cols-3 gap-8">
            <!-- Hours & Contact (1/3) -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">OPERATING HOURS</h3>
              <div class="text-lg">
                <span class="text-[#d10f8b]">Monday - Sunday</span><br>
                <span class="text-gray-600">12:00 PM - 01:00 AM</span>
              </div>
            </div>
            <div class="space-y-4">
                 <h3 class="text-lg font-semibold mb-4 uppercase">Contacts</h3>
                <div class="flex items-center gap-3">
                  <UIcon name="i-ph-phone" class="w-5 h-5 text-[#d10f8b]" />
                  <a href="tel:+966115200161" class="text-gray-600 hover:underline">
                    +966 11 520 0161
                  </a>
                </div>
                <div class="flex items-center gap-3">
                  <UIcon name="i-ph-device-mobile" class="w-5 h-5 text-[#d10f8b]" />
                  <a href="tel:920002690" class="text-gray-600 hover:underline">
                    +966 920002690
                  </a>
                </div>
                <div class="flex items-center gap-3">
                  <UIcon name="i-ph-envelope" class="w-5 h-5 text-[#d10f8b]" />
                  <a href="mailto:lusinrestaurant@mira-foods.com" class="text-gray-600 hover:underline">
                    lusinrestaurant@mira-foods.com
                  </a>
                </div>
              </div>
            <!-- Locations (2/3) -->
            <div>
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold uppercase">Our Locations</h3>
                <!-- Lusin Diyafa -->
                <div class="space-y-2.5">
                  <h4 class="font-semibold text-[#d10f8b]">LUSIN DIYAFA</h4>
                  <p class="text-sm text-gray-700">Diyafa Plaza, Northern Ring Branch Road, Riyadh</p>
                  <UButton 
                    to="https://maps.google.com" 
                    target="_blank"
                    size="sm"
                    class="bg-black/10 text-black hover:bg-black/20 rounded-full px-4 border border-black/10"
                  >
                    <UIcon name="i-ph-map-pin" class="w-4 h-4" />
                    View on Google Maps
                  </UButton>
                </div>

                <!-- Lusin Centria -->
                <div class="space-y-2.5 mt-10">
                  <h4 class="font-semibold text-[#d10f8b]">LUSIN CENTRIA</h4>
                  <p class="text-sm text-gray-700">Prince Muhammad Ibn Abd Al Aziz, Centria Mall Olaya Street, Riyadh</p>
                  <UButton 
                    to="https://maps.google.com" 
                    target="_blank"
                    size="sm"
                    class="bg-black/10 text-black hover:bg-black/20 rounded-full px-4 border border-black/10"
                  >
                    <UIcon name="i-ph-map-pin" class="w-4 h-4" />
                    View on Google Maps
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <footer class="text-center bg-gray-100/50">
    
        <!-- Social Media Section -->
        

        <!-- Additional Footer Content -->
        <div class="py-8 container">
          <p class="text-sm">
            © 2025 Lusin Restaurant. All rights reserved.
          </p>
          <!-- <p class="text-gray-400 text-sm mt-2">
            Experience authentic Middle Eastern cuisine in the heart of Riyadh
          </p> -->
    
    </div>
  </footer>


        <!-- location -->
  

        <!-- Gallery -->

        <!-- Testimonials -->

        <!-- Contact -->

        <!-- Contact -->
    </div>
</template>

