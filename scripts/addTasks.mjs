
import { getToken } from "./getToken.mjs"


const addUserTask = async (newTask) => {
    console.log(newTask)
    const token = getToken()
    const initialResponse = await fetch('http://localhost:4000/task/addtask',{
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTask)
    })

    return await initialResponse.json()
    
}




export {
    addUserTask
}