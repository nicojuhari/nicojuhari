

<script setup>
import { ref } from "vue";
// import usePath from "../../use/usePath";
// import { prepareFileName, getFileExtension, getFileName, fileReader, readFileFromURL } from "../../utils";
// import useFiles from "../../use/useFiles";

const { uploadFileToServer, isLoading} = useFiles();
const { currentPath } = usePath();
const emit = defineEmits(['uploaded', 'close']);



const fileToUpload = ref(null);

const file = ref(null)
const fileURL = ref(null)
const src = ref("");
const fileFullName = ref("");
const fileExtension = ref("");
const newFileName = ref("");
const oldFileName = ref("");


const handleUpload = async (e) => {
    src.value = await fileReader(e.target.files[0]);
    fileToUpload.value = e.target.files[0];
    fileFullName.value = e.target.files[0].name;
    fileExtension.value = getFileExtension(e.target.files[0].name)
    oldFileName.value = prepareFileName(getFileName(e.target.files[0]?.name))
};

// get image from url
const handleUploadFromUrl = () => {
    setTimeout(async () => {
        try {
            let file = await readFileFromURL(fileURL.value);

            if(file == null) return;

            src.value = await fileReader(file);
            fileToUpload.value = file;
            fileFullName.value = file.name;
            fileExtension.value = getFileExtension(file.name)
            oldFileName.value = prepareFileName(file.name)
        } catch (error) {
            console.log(error);
        }
    }, 600);
};

const clearFilesData = () => {
    src.value = '';
    fileToUpload.value = null;
    newFileName.value = '';
    oldFileName.value = '';
    fileExtension.value = '';
    fileURL.value = '';
}


const sendToServer = async () => {
    let result;

    if (src.value == null) return;

    let fileExtension = getFileExtension(fileFullName.value)
    let fileName = oldFileName.value + "." + fileExtension

    if (newFileName.value != '' && newFileName.value.length >= 3) {
        fileName = prepareFileName(newFileName.value) + "." + fileExtension
    }

    result = await uploadFileToServer(currentPath.value + fileName, fileToUpload.value);

    if (result.HttpCode == 201) {

        clearFilesData()

        setTimeout(() => {
            emit('uploaded');
        }, 300);
    }
};

</script>

<template>    
        <div class="p-4 relative">
            <div class="flex justify-between">
                <div class="font-medium">Upload a file</div>
                <Icon name="ph:x-light" class="w-6 h-6 shrink-0 ml-auto cursor-pointer" @click="$emit('close')"/>
            </div>
            <form class="mt-6" v-if="!src">
                <input type="file" name="image" ref="file" id="image-upload" @change="handleUpload"
                    accept="image/* | video/* | audio/* | .pdf" class="hidden" />
                <div>
                    <label for="image-upload">
                        <div
                            class="h-32 w-full rounded border border-gray-300 bg-slate-50 cursor-pointer grid place-content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-300 w-20 h-20" viewBox="0 0 256 256">
                                <path fill="currentColor"
                                    d="M222 152v56a14 14 0 0 1-14 14H48a14 14 0 0 1-14-14v-56a6 6 0 0 1 12 0v56a2 2 0 0 0 2 2h160a2 2 0 0 0 2-2v-56a6 6 0 0 1 12 0ZM92.24 84.24L122 54.49V152a6 6 0 0 0 12 0V54.49l29.76 29.75a6 6 0 0 0 8.48-8.48l-40-40a6 6 0 0 0-8.48 0l-40 40a6 6 0 0 0 8.48 8.48Z" />
                            </svg>
                        </div>
                    </label>
                    <div class="text-center text-sm my-1">Images | Videos | Audio | PDF</div>
                </div>
                <div class="flex items-center justify-center my-10 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-gray-300 to-transparent">
                    <div class="bg-white px-2">OR</div>
                </div>
               <div class="my-6">
                    <UInput v-model="fileURL" placeholder="Enter file URL" @input="handleUploadFromUrl"/>
                </div>
            </form>
            <div v-else>
                <div class="mt-6 flex justify-between items-center">
                    <div class="truncate">
                        File Name: <span class="text-gray-400"
                            :class="{ 'line-through !text-green ': newFileName.length > 2 }">{{ oldFileName }}.{{
                                fileExtension }}</span>
                    </div>
                    <UButton square color="red" class="ml-auto !text-white cursor-pointer shrink-0"
                        @click="clearFilesData">
                        <Icon name="ph:trash-light" class="w-6 h-6" />
                    </UButton>
                </div>
                <div v-if="src" class="mt-2">
                     <BunnyStorageFileType :fileName="fileFullName" :fileUrl="src" :fileExtension="fileExtension"></BunnyStorageFileType>
                </div>
                <div class="mt-2" v-if="oldFileName">
                    <label>Rename your file</label>
                    <UInput v-model="newFileName"/>
                    <div v-if="newFileName.length > 2" class="mt-2">
                        New file name: {{ prepareFileName(newFileName) }}.{{ fileExtension }}
                    </div>
                </div>
                <UButton @click.prevent="sendToServer" block class="mt-6" color="teal">Upload</UButton>
            </div>
            <Loading v-if="isLoading" />
    </div>
</template>