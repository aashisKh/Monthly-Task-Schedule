
import { usernameExp,passwordExp,emailExp } from "./regularExpression.mjs"
import { handleLogin, handleRegistration } from "./handleLoginRegistration.mjs"

const urlList = {
    register: "http://localhost:4000/user/register"
}

const userRegister = {
    username: document.getElementById('username'),
    password: document.getElementById("password"),
    register: document.getElementById("register"),
    email: document.getElementById('email')
}

const handleUserRegister = async (e) => {
    e.preventDefault()
    const username = userRegister.username.value 
    const password = userRegister.password.value
    const email = userRegister.email.value

    if(!usernameExp.test(username)){
        return alert('Enter proper username')
    }
    if(!passwordExp.test(password)){
        return alert('Enter proper password')
    }
    if(!emailExp.test(email)){
        return alert('Enter proper email')
    }

    const registerResponse = await handleRegistration(urlList.register, {username,password,email})
    if(registerResponse.status){
        alert(registerResponse.message)
        window.location.href = 'calendar.html'
        return
    }
    return alert(registerResponse.message)
}

userRegister.register.onclick = handleUserRegister
