const express = require("express")
const dbloader = require("better-sqlite3")
const fs = require("fs")
const path = require("path")

const app = express()
const db = dbloader("database.db")

const sql = fs.readFileSync(path.resolve(__dirname, "schema.sqlite"), "utf-8")
db.exec(sql)

app.use(express.static(path.resolve(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post("/user/new", (req, res) => {
    const { username } = req.body
    
    console.log(username)

    if(username === undefined) {
        res.status(400).send("Username is a required field")
    }

    try {
        const r = db.prepare("INSERT INTO users (username) VALUES ($username)")
        .run({
            username: username
        })
        console.log(r)

        res.send()
    } catch (err) {
        console.log(err)

        res.status(500).send()
    }
})

app.get("/user/:id", (req, res) => {
    try {
        const data = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id)

        if (data === undefined) {
            res.sendStatus(404)
        } else {
            console.log(data)
            res.send(data)
        }
    } catch (err) {
        res.sendStatus(500)
    }
})

app.delete("/user/:id", (req, res) => {
    const { id } = req.params

    try {
        const del = db.prepare("DELETE FROM users WHERE id = $id")
        .run({
            id: id
        })

        if (del === undefined) {
            res.sendStatus(404)
        } else {
            res.send(del)
        }

    } catch (err) {
        res.sendStatus(500)
    }
})

app.listen(3000, () => {
    console.log("listening on port 3000.")
})