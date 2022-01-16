const express = require("express")
const path = require("path")
require("dotenv").config()
const DBconnect = require("./db/mongo")
const authRouter = require("./routes/api/auth.router")
const postsRouter = require("./routes/api/posts.router")
const profileRouter = require("./routes/api/profile.router")
const usersRouter = require("./routes/api/users.router")
const app = express()

const PORT = process.env.PORT || 5000

DBconnect()

app.use(express.json({ extended: false }))

app.use("/api/auth", authRouter)
app.use("/api/posts", postsRouter)
app.use("/api/profile", profileRouter)
app.use("/api/users", usersRouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("../front/build"))
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../", "front", "build", "index.html")
        )
    })
}

app.listen(PORT, () => {
    console.log(`currently listening on ${PORT}`)
})
