const axios = require("axios")
const express = require("express")
const { check, validationResult } = require("express-validator")
const auth = require("../../middleware/auth")
const Profile = require("../../models/profile.mongo")
const User = require("../../models/user.mongo")
const Post = require("../../models/post.mongo")

const router = express.Router()

router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            "user",
            ["name, avatar"]
        )
        if (!profile) {
            return res.status(400).json({ msg: "no profile for this user" })
        }
        res.json(profile)
    } catch (e) {
        res.status(500).send("Server Error")
    }
})

router.get("/github/:username", async (req, res) => {
    try {
        const uri = `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENTID}&client_secret=${process.env.GITHUB_SECRET}`
        const options = {
            headers: { "user-agent": "node.js" },
        }
        const resp = await axios.get(uri, options)

        res.json(resp.data)
    } catch (e) {
        if (e.response.status === 404) {
            return res.status(404).json({ msg: "No Github profile found" })
        }
        console.error(e)
        res.status(500).send("Server Error")
    }
})

router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find({}).populate("user", [
            "name",
            "avatar",
        ])
        res.json(profiles)
    } catch (e) {
        console.error(e.message)
        res.status(500).send("Server Error")
    }
})

router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params
    try {
        const profile = await Profile.findOne({ user: userId }).populate(
            "user",
            ["name", "avatar"]
        )
        if (!profile) return res.status(400).json({ msg: "Profile not found" })
        res.json(profile)
    } catch (e) {
        if (e.kind === "ObjectId")
            return res.status(400).json({ msg: "Profile not found" })
        console.error(e.message)
        res.status(500).send("Server Error")
    }
})

router.delete("/experience/:experienceId", auth, async (req, res) => {
    const { experienceId } = req.params
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        const removeIndex = profile.experience
            .map((item) => item.id)
            .indexOf(experienceId)
        profile.experience.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)
    } catch (e) {
        console.error(e.message)
        res.status(500).send("Server Error")
    }
})

router.put(
    "/education",
    [
        auth,
        [
            check("school", "School is required").not().isEmpty(),
            check("degree", "Degree of study is required").not().isEmpty(),
            check("fieldofstudy", "Field of study is required").not().isEmpty(),
            check("from", "From date is required").not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { school, degree, fieldofstudy, from, to, current, description } =
            req.body

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description,
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id })
            profile.education.unshift(newEdu)
            await profile.save()
            res.json(profile)
        } catch (e) {
            console.error(e.message)
            res.status(500).send("Server Error")
        }
    }
)

router.delete("/education/:educationId", auth, async (req, res) => {
    const { educationId } = req.params
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        const removeIndex = profile.education
            .map((item) => item.id)
            .indexOf(educationId)
        profile.education.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)
    } catch (e) {
        console.error(e.message)
        res.status(500).send("Server Error")
    }
})

router.put(
    "/experience",
    [
        auth,
        [
            check("title", "Title is required").not().isEmpty(),
            check("company", "Company is required").not().isEmpty(),
            check("from", "From date is required").not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { title, company, location, from, to, current, description } =
            req.body

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id })
            profile.experience.unshift(newExp)
            await profile.save()
            res.json(profile)
        } catch (e) {
            console.error(e.message)
            res.status(500).send("Server Error")
        }
    }
)

router.delete("/", auth, async (req, res) => {
    try {
        await Post.deleteMany({ user: req.user.id })
        await Profile.findOneAndRemove({ user: req.user.id })
        await User.findOneAndRemove({ _id: req.user.id })
        res.json({ msg: "User deleted" })
    } catch (e) {
        console.error(e.message)
        res.status(500).send("Server Error")
    }
})

router.post(
    "/",
    [
        auth,
        [
            check("status", "Status is required").not().isEmpty(),
            check("skills", "Skills is required").not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
        } = req.body

        const profileFields = {}
        profileFields.user = req.user.id
        if (company) profileFields.company = company
        if (website) profileFields.website = website
        if (location) profileFields.location = location
        if (bio) profileFields.bio = bio
        if (status) profileFields.status = status
        if (githubusername) profileFields.githubusername = githubusername
        if (skills) {
            profileFields.skills = skills
                .split(",")
                .map((skill) => skill.trim())
        }

        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube
        if (facebook) profileFields.social.facebook = facebook
        if (twitter) profileFields.social.twitter = twitter
        if (instagram) profileFields.social.instagram = instagram
        if (linkedin) profileFields.social.linkedin = linkedin

        try {
            let profile = await Profile.findOne({ user: req.user.id })
            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )
                return res.json(profile)
            }
            profile = new Profile(profileFields)
            await profile.save()
            return res.json(profile)
        } catch (e) {
            console.error(e.message)
            res.status(500).send("Server Error")
        }
    }
)

module.exports = router
