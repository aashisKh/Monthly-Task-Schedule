


import { getToken } from "./getToken.mjs"


const updateUserTask = async (taskToUpdate) => {
    const token = getToken()
    const initialResponse = await fetch('http://localhost:4000/task/updatetask',{
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(taskToUpdate)
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
    updateUserTask
}