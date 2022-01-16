const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token")
    if (!token) {
        return res.status(401).json({ msg: "no token, authorization denied" })
    }
    try {
        const decoded = jwt.verify(token, process.env.MYSECRETTOKEN)
        req.user = decoded.user
        next()
    } catch (e) {
        return res.status(401).json({ msg: "token is not valid" })
    }
}
