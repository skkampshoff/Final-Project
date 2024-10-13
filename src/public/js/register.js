const regform = document.forms["regform"]

const addError = (name) => {
   const error = document.getElementById(`${name}-error`)
   error.style.display = "inline"
}

regform.onsubmit = (event) => {
    let valid = true

    if (regform.username.value === "") {
        addError("username")
        valid = false
    }

    if (!valid) {
        console.log("invalid")
        event.preventDefault()
    }
    else {
        fetch("/user/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: regform.username.value
            })
        }).then((res) => {
            if (res.ok) {
                // window.location.href = '/thanks.html'
            }
        }).catch((err) => {
            console.error(err)
        })
    }       
}

