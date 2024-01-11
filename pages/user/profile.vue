<script setup lang="ts">
const user : any = useUser();
// import { ref } from 'vue'

// const portalKey = import.meta.env.VITE_STRIPE_PORTAL_KEY
const { resetPassword } = useAuth();


const resetPasswordMessage = reactive({
    success: false,
    message: ''
})
// const user = auth.currentUser

const resetUserPassword = async () => {
    try {
        const result = await resetPassword(user?.value?.email)

        resetPasswordMessage.success = result.success
        resetPasswordMessage.message = result.message
        
    } catch (e) {
        console.log(e)
    } finally {
        setTimeout(()=> {
            resetPasswordMessage.success = false
            resetPasswordMessage.message = ''
        }, 4000)
    }

}

// //get menus from DB
// const { data: userMenus, error } = useFetch(`/menus/user/${auth.currentUser.uid}`);


</script>
<template>
    <div class="container">
        <h1 class="text-center my-10">Your Profile</h1>
        <UCard>
            <div class="flex flex-col gap-6">
                <div class="flex gap-4">
                    <div>Your Email:</div>
                    <div class="font-medium">{{ user.email }}</div>
                </div>
                <div class="flex gap-4">
                    <div>Password:</div>
                    <a href="#" class="font-medium underline text-brand-color" @click.prevent="resetUserPassword"> Reset
                        password</a>
                    <div v-if="resetPasswordMessage.message" class="text-sm mb-4 duration-300"
                        :class="resetPasswordMessage.success ? 'text-brand-success' : 'text-brand-error'"
                        >
                        {{ resetPasswordMessage.message }}
                    </div>
                </div>
                <div class="flex gap-4">
                    <div>Account created:</div>
                    <pre class="font-medium">{{ new Date(user.metadata.creationTime).toLocaleDateString() }}</pre>
                </div>
                <div class="flex gap-4">
                    <div>Last login:</div>
                    <pre class="font-medium">{{ new Date(user.metadata.lastSignInTime).toLocaleString() }}</pre>
                </div>
                <!-- <a v-if="userMenus?.length" :href="`https://billing.stripe.com/p/login/${portalKey}`" target="_blank">
                    <Button>
                        View all Your Subscriptions
                    </Button>
                </a> -->
                </div>
        </UCard>
    </div>
</template>