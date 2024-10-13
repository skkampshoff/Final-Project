window.onload = function() {
    const search = new URLSearchParams(window.location.search)

    fetch(`/user/${search.get("id")}`)
    .then((res) => {
        if(res.ok) {
            return res.json()
        } else {
            throw res
        }
    }).then((data) => {
        document.getElementById("greeting").innerHTML = `Hello ${data.username}`
    }).catch((err) => {
        console.log(err)
    })
}