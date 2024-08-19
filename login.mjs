import { authenticateToken } from "./scripts/authenticateToken.mjs"

const checkServerStatusCode = (statusCode) => {
    if(statusCode == 500){
        return false
      }
    if(statusCode == 403){
        return false
      }
    if(statusCode == 401){
        return false
      }
    if(statusCode == 200){
        return true
      }
}

(async function(){
const fileName = window.location.pathname
const token = window.localStorage.getItem('token')

switch(fileName){
    case '/':
        if(token){
          const response = await authenticateToken()
          const statusCodeResponse = checkServerStatusCode(response.SERVER_CODE)
          if(!statusCodeResponse){
            window.localStorage.removeItem('token')
            return 
          }
          window.location = 'calendar.html'            
        }
        break
    
    case '/calendar.html':

        if(!token){
            window.location = '/'
        }
        if(token){
            const response = await authenticateToken()
            const statusCodeResponse = checkServerStatusCode(response.SERVER_CODE)
            if(!statusCodeResponse){
                window.localStorage.removeItem('token')
                window.location = '/'
                return 
            }
            window.document.body.style.visibility = 'visible'
          }
        break
    default:
        if(token){
            const response = await authenticateToken()
            const statusCodeResponse = checkServerStatusCode(response.SERVER_CODE)
            if(!statusCodeResponse){
                window.localStorage.removeItem('token')
                window.location = '/'
                return 
            }
            window.location = 'calendar.html'              
          }  
}

}())