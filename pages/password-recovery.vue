<script setup>
definePageMeta({
    layout: 'empty'
})

const { resetPassword } = useAuth()

const formData = ref({});
const formResponse = ref({
    message: '',
    success: false
});

const handleForm = async () => {

    let response = await resetPassword(formData?.value?.email)
    formResponse.value.message = response.message
    formResponse.value.success = response.success

    setTimeout(() => {
        formData.value = {};
        formResponse.value = {
            message: '',
            success: false
        };
    }, 3000)
}

</script>
<template>
   <div class="flex min-h-screen p-4">
            <UCard class="m-auto bg-white shadow-md rounded-md w-full max-w-sm">
                <div class="font-bold mb-6 text-center">Reset your password</div>
                <div class="mb-6 text-sm opacity-70">Enter the email address associated with your account and we'll send you a link to reset your password.</div>
               
                <div v-if="formResponse.message" class="text-sm mb-4 duration-300"
                        :class="formResponse.success ? 'text-brand-success' : 'text-brand-error'"
                        >
                        {{ formResponse.message }}
                    </div>
                    <FormKit type="form" :actions="false" @submit="handleForm" v-model="formData">
                        <FormKit type="email" label="Email" name="email" validation="required|email"></FormKit>
                        <div class="flex flex-col mt-8">
                            <UButton color="brand-blue" type="submit" class="justify-center gap-2"> 
                                Send
                            </UButton>
                        </div>
                    </FormKit>
                    <UDivider label="OR" class="my-6" />
                    <div class="text-center">
                        <UButton variant="soft" color="brand-green" block to="/login">Back to login</UButton>
                    </div>
            </UCard>
        </div>
</template>