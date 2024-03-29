const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const auth = require("../../middleware/auth")
const User = require("../../models/user.mongo")
const router = express.Router()

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json({ user: user })
    } catch (e) {
        console.error(e.message)
        res.status(500).send("Server Error")
    }
})

router.post(
    "/",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }

        const { email, password } = req.body
        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid credentials" }] })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid credentials" }] })
            }
            const payload = {
                user: {
                    id: user._id,
                },
            }
            jwt.sign(
                payload,
                process.env.MYSECRETTOKEN,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                }
            )
        } catch (e) {
            console.error(e.message)
            return res.status(500).send("Server Error")
        }
    }
)

module.exports = router
