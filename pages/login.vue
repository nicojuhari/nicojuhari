<script setup>
    const { loginWithGoogle } = useAuth()

    const signUp = false;
</script>
<template>
    <div class="flex min-h-screen p-4">
        <UCard class="m-auto bg-white shadow-md rounded-md w-full max-w-sm">
            <div class="font-bold mb-6 text-center">{{ signUp ? 'Create Account' : 'Sign In' }}</div>
            <UButton color="gray" variant="outline" size="md" class="w-full justify-center gap-4"
                @click.prevent="loginWithGoogle">
                <UIcon name="i-logos-google-icon" dynamic />
                <span>Continue with Google</span>
            </UButton>
            <UDivider label="OR" class="my-6" />

            <div class="mt-10 text-sm text-center opacity-7 0 text-gray-700">
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