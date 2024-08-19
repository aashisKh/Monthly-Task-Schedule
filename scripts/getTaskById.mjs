
import { getToken } from "./getToken.mjs"
const url = 'http://localhost:4000/task/gettaskbyid?taskId='

const getUserTaskById = async (id) => {
    const token = getToken()
    id = parseInt(id)
    const initialResponse = await fetch(`${url}${id}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    return await initialResponse.json()
}

export {
    getUserTaskById
}