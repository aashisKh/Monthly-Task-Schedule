
import { getToken } from "./getToken.mjs"
let responseMessage
const manageResponse = (statusCode, message) => {
    responseMessage = {
        SERVER_CODE: statusCode,
        message: message
    }
}

const authenticateToken = async () => {
    
    const token = getToken()
    await fetch('http://localhost:4000/authenticate',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if(response.status == 403){
            manageResponse(response.status, response.statusText)
        }
        if(response.status == 401){
            manageResponse(response.status, response.statusText)
        }
        if(response.status == 200){
            manageResponse(response.status, response.statusText)
        }

    })
    .catch(error => {
        manageResponse(500, "Internal Server Error !!!")
    })
    return responseMessage
}

export {
authenticateToken
}