<script setup lang="ts">
    import {  reset } from '@formkit/vue'
    const { loginUser, redirectTo } = useAuth()
    const isLoading = ref(false);
    const signUp = ref(false);

    const formData = reactive({
        email: '',
        password: '',
    })

    const loginMessage = reactive({
        success: false,
        message: ''
    })

    const handleForm = async (provider:string) => {
        try {
            isLoading.value = true
            
            //create
            if(signUp.value && provider === 'email') provider = 'create-with-email';
            
            let result = await loginUser(provider, formData.email, formData.password)
            
            loginMessage.message = result.message;
            loginMessage.success = result.success

            if(result.success) {
                reset('loginForm')
                setTimeout(() => {
                    redirectTo()
                }, 1400)
            }

        } catch (e) {
            console.log(e)
            isLoading.value = false
        } finally {
            setTimeout(() => {
                isLoading.value = false
            }, 1200)

            setTimeout(() => {
                loginMessage.message = ''
                loginMessage.success = false
            }, 2400)
        }
    }

</script>
<template>
    <div class="flex min-h-screen p-4">
        <UCard class="m-auto bg-white shadow-md rounded-md w-full max-w-sm">
            <div class="font-bold mb-6 text-center">{{ signUp ? 'Create a FREE account' : 'Sign In' }}</div>
            <UButton color="gray" variant="outline" size="md" class="w-full justify-center gap-4"
                @click.prevent="handleForm('google')">
                <UIcon name="i-logos-google-icon" dynamic />
                <span>Continue with Google</span>
            </UButton>
            <UDivider label="OR" class="my-6" />
            <div v-if="loginMessage.message" class="text-sm mb-4 duration-300"
                    :class="loginMessage.success ? 'text-brand-success' : 'text-brand-error'"
                    >
                    {{ loginMessage.message }}
                </div>
            <FormKit type="form" :actions="false" @submit="handleForm('email')" v-model="formData" id="loginForm">
                <FormKit type="email" label="Email" name="email" validation="required|email"></FormKit>
                <FormKit type="password" label="Password" name="password" validation="required|length:6,20" minlength="6" maxlength="20"></FormKit>
                <div class="text-sm mt-2 h-5">
                    <NuxtLink to="/password-recovery" class="text-brand-primary" v-if="!signUp">Forgot your password ?</NuxtLink>
                </div>
                <div class="flex flex-col mt-8">
                    <UButton color="brand-blue" type="submit" class="justify-center gap-2" :loading="isLoading"> 
                        {{ signUp ? 'Create Account' : 'Sign In' }}
                    </UButton>
                </div>
            </FormKit>
            <div class="text-center w-full mt-10">
                <a @click.prevent="signUp = !signUp" class="cursor-pointer">
                    <span v-if="signUp">Already have an account? <b class="text-brand-primary ml-1">Sign In</b></span>
                    <span v-else>No account yet? <b class="text-brand-primary ml-1">Create a Free Account</b></span>
                </a>
            </div>
            <div class="mt-8 text-sm text-center opacity-7 0 text-gray-700">
                By using 1FoodMenu you agree with our<br>
                <a href="https://1food.menu/terms-and-conditions" target="_blank"
                    class="font-semibold text-brand-color-600">Terms</a>
                and
                <a href="https://1food.menu/privacy-policy" target="_blank"
                    class="font-semibold text-brand-color-600">Privacy</a>
            </div>
        </UCard>
    </div>
</template>