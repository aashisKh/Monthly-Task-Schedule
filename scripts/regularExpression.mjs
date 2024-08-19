
const usernameExp = /^[a-zA-Z]\w{4,}$/;
const passwordExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export{
    usernameExp,
    passwordExp,
    emailExp
}
