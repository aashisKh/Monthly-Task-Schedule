
const tokenName = "token"

const handleLogin = async (url,userData) => {
    let response
    const initialResponse = await fetch(
        url,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        }
    )
    if(initialResponse.status != 200){
        response = await initialResponse.json()
        return response
    }
    if(initialResponse.status == 200){
        response = await initialResponse.json()
        window.localStorage.setItem(tokenName,response.token)
        return response
    }
}

const handleRegistration = async (url, userData) => {
    let response
    const initialResponse = await fetch(
        url,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        }
    )
    if(initialResponse.status != 200){
        response = await initialResponse.json()
        return response
    }
    if(initialResponse.status == 200){
        response = await initialResponse.json()
        window.localStorage.setItem(tokenName,response.token)
        return response
    }
}

export {
    handleLogin,
    handleRegistration
}