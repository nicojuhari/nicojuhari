import { ref } from "vue";
import axios from "axios";
import { useStorage } from "@vueuse/core";

export const storageZones = useStorage("bunny-cdn-api-zones", []);
export const accountAPIkey = useStorage("bunny-cdn-api-key", '');
export const storageFiles = ref([]);
export const pullZones = ref([]);
export const activePullZoneURL = ref("");

export default function useStorageZone() {
    
    const route = useRoute();
    const backEndUrl = "/api/send-request";
    const storageInfo = ref(null);
    const isLoading = ref(false);
   
   

    const getStorageZones = async (apiKey) => {
        isLoading.value = true;

        const url = "https://api.bunny.net/storagezone?page=1&perPage=1000&includeDeleted=false";
        try {
            let result = await axios.post(backEndUrl, {
                method: "GET",
                url,
                headers: {
                    Accept: "application/json",
                    AccessKey: apiKey,
                },
            });
            storageZones.value = result?.data?.Items;
            accountAPIkey.value = apiKey;
            return true;
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            isLoading.value = false;
        }
    };

    //get Storage Files / Images in JSON format
    const getStorageFiles = async (path) => {
        isLoading.value = true;
        const storageObj = storageZones?.value?.find((obj) => obj.Id == route.params.id) || {};

        let url = `https://${storageObj?.StorageHostname}/${storageObj.Name}/${path}`;

        try {
            let result = await axios.post(backEndUrl, {
                method: "GET",
                url,
                headers: {
                    Accept: "*/*",
                    AccessKey: storageObj.Password,
                },
            });

            storageFiles.value = result.data;
            // console.log("Files fetched successfully");
        } catch (err) {
            console.error(err.message);
        } finally {
            isLoading.value = false;
        }
    };

    const getStorageInfo = async () => {
        try {
            let url = `https://api.bunny.net/storagezone/${route.params.id}`;

            const result = await axios.post(backEndUrl, {
                method: "GET",
                url,
                headers: {
                    Accept: "application/json",
                    AccessKey: accountAPIkey.value,
                },
            });
            storageInfo.value = result.data;
        } catch (err) {
            console.log(err);
            console.error(err.message);
            storageInfo.value = null;
        }
    };

    return { getStorageZones, getStorageFiles, getStorageInfo, storageInfo, isLoading };
}
