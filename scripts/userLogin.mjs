
import { usernameExp,passwordExp } from "./regularExpression.mjs"
import { handleLogin } from "./handleLoginRegistration.mjs"
const urlList = {
    login: "http://localhost:4000/user/login",
    register: "http://localhost:4000/user/register"
}
const userLogin = {
    username: document.getElementById('username'),
    password: document.getElementById("password"),
    login: document.getElementById("login"),
}

const handleUserLogin = async (e) => {
    e.preventDefault()
    const username = userLogin.username.value 
    const password = userLogin.password.value

    if(!usernameExp.test(username)){
        return alert('Enter proper username')
    }
    if(password.length < 5){
        return alert('Enter proper password')
    }
    const loginResponse = await handleLogin(urlList.login, {username,password})
    if(loginResponse.status){
        alert(loginResponse.message)
        window.location.href = 'calendar.html'
        return
    }
    return alert(loginResponse.message)
}

userLogin.login.onclick = handleUserLogin