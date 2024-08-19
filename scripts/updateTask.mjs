


import { getToken } from "./getToken.mjs"


const updateUserTask = async (taskToUpdate) => {
    console.log(taskToUpdate)
    const token = getToken()
    const initialResponse = await fetch('http://localhost:4000/task/updatetask',{
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(taskToUpdate)
    })

    return await initialResponse.json()
    
}




export {
    updateUserTask
}