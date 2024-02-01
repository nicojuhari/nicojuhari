import axios from 'axios'

export default defineEventHandler(async (event) => {
   
    const body = await readBody(event)
    try {
        let response = await axios.request(body)
        return response.data
    } catch (err) {
        console.error('swsss============', err)
    }
})