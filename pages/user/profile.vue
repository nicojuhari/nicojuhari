<script setup>
const user = useUser()
// import { ref } from 'vue'

const portalKey = import.meta.env.VITE_STRIPE_PORTAL_KEY
// const { resetPassword } = useAuth();


const resetPasswordMessage = ref('')
// const user = auth.currentUser

const resetUserPassword = async () => {
    try {
        // await resetPassword(auth.currentUser.email)
        resetPasswordMessage.value = 'Check your email, for reset password link'
    } catch (e) {
        console.log(e)
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
                    <div v-if="resetPasswordMessage" class="text-brand-red">{{ resetPasswordMessage }}</div>
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