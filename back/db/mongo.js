const mongoose = require("mongoose")
const MONGO_URL = process.env.MONGO_URL

const DBconnect = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("db connected")
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

module.exports = DBconnect
