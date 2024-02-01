import { ref } from "vue";
import axios from "axios";
import { storageZones } from "./useStorageZones";


export default function useFiles() {
    const route = useRoute();

    const isLoading = ref(false);
    const storageObj = storageZones?.value.find((obj) => obj.Id == route.params.id) || {};

    const uploadFileToServer = async (path, file) => {
        isLoading.value = true;

        let url = `https://${storageObj?.StorageHostname}/${storageObj.Name}/${path}`;

        try {
            const result = await axios.put(url, file, {
                headers: {
                    "Content-Type": "application/octet-stream",
                    AccessKey: storageObj.Password,
                    Accept: "*/*",
                },
            });
            // console.log(result.data.Message);
            return result.data;
        } catch (e) {
            console.log(e);
            console.error(e.message);
        } finally {
            isLoading.value = false;
        }
    };

    const deleteFileFromServer = async (path, guid = "") => {
        isLoading.value = true;

        let url = `https://${storageObj?.StorageHostname}/${storageObj.Name}/${path}`;

        try {
            const result = await axios.delete(url, {
                headers: {
                    AccessKey: storageObj.Password,
                    Accept: "*/*",
                },
            });
            // console.log(result.data.Message);
            return result.data;
        } catch (e) {
            console.log(e);
            console.error(e.message);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        isLoading,
        uploadFileToServer,
        deleteFileFromServer,
    };
}
