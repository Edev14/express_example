const isEmailValid = (input) => {

    const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]){2,6}$/

    const test = emailRegex.test(input);

    if (test) return true
    else return false

}

module.exports = { 
    isEmailValid,
}