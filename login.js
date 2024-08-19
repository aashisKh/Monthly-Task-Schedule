(function(){
const fileName = window.location.pathname
const token = window.localStorage.getItem('token')

switch(fileName){
    case '/':
        if(token){
            window.location = 'calendar.html'
        }
        break
    
    case '/calendar.html':
        if(!token){
            window.location = '/'
        }
        break
    default:
        if(token){
            window.location = 'calendar.html'
        }   
}

}())