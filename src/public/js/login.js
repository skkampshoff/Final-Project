const loginform = document.forms["loginform"]

const addError = (name) => {
    const error = document.getElementById(`${name}-error`)
    error.style.display = "inline"
}

loginform.onsubmit = (event) => {
    let valid = true

    if (isNaN(parseInt(loginform.query.value))) {
        addError("query")
        valid = false
    }

    if (!valid) {
        console.log("invalid")
        event.preventDefault()
    }
    else {
        event.preventDefault()
        window.location.href = `/user.html?id=${loginform.query.value}`
    }
}