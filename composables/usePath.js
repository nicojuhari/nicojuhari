import { ref } from "vue";

const currentPath = ref(null);

export default function usePath() {
    const route = useRoute();
    const router = useRouter();

    currentPath.value = route.hash.replace("#", "");

    const changePath = (val, staticVal = false) => {
        
        if (val == currentPath.value) return;
        let newHash = "";

        if (staticVal) {
            newHash = val;
        } else {
            newHash = currentPath.value + val + "/";
        }
        currentPath.value = newHash;

        if (newHash.indexOf("#") != 0 && newHash != "") newHash = "#" + newHash;
        console.log(newHash);
        router.replace({ hash: newHash });
    };

    return {
        currentPath,
        changePath,
    };
}
