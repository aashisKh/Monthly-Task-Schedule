
import { getToken } from "./getToken.mjs"


const addUserTask = async (newTask) => {
    const token = getToken()
    const initialResponse = await fetch('http://localhost:4000/task/addtask',{
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTask)
    })
    if(initialResponse.status != 200){
        window.localStorage.removeItem('token')
        window.location = 'index.html'
    }else{
        const response = await initialResponse.json()
        return response
        }
}




export {
    addUserTask
}