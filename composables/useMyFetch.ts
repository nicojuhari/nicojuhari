
const result:any = ref(null)

export const useMyFetch = (url: string, options: any = {}) => {
    return new Promise(async (resolve, reject) => {
        const { getUserToken } = useAuth()
        const token = await getUserToken()
        if(token) options.headers = { ...options?.headers, 'Authorization': token }
        result.value = await useFetch( url, options )
        
        resolve(result)
    })
}