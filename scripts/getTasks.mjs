
import { getToken } from "./getToken.mjs"

let url = 'http://localhost:4000/task/gettask/?date='

const getUserTasks = async (date) => {
    const token = getToken()
    const initialResponse = await fetch(`${url}${date}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if(initialResponse.status == 401){
    window.localStorage.removeItem('token')
        window.location.href = 'index.html'
    }
    return await initialResponse.json()
}

export {
    getUserTasks
}