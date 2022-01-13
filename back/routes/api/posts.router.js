const express = require("express")
const { check, validationResult } = require("express-validator")
const auth = require("../../middleware/auth")
const Post = require("../../models/post.mongo")
const Profile = require("../../models/profile.mongo")
const User = require("../../models/user.mongo")
const router = express.Router()

router.post(
    "/",
    [auth, [check("text", "Text is required").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() })
        }

        try {
            const user = await User.findById(req.user.id).select("-password")
            const newPost = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            }
            const post = new Post(newPost)
            await post.save()
            res.json(post)
        } catch (e) {
            console.error(e.message)
            res.status(500).send("Server Error")
        }
    }
)

router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (e) {
        console.error(e.message)
        res.status(500).send("Server Error")
    }
})

router.get("/:id", auth, async (req, res) => {
    const { id } = req.params
    try {
        const post = await Post.findById(id)
        if (!post) return res.status(404).json({ msg: "No post found" })
        res.json(post)
    } catch (e) {
        if (e.kind === "ObjectId")
            return res.status(400).json({ msg: "Post not found" })
        console.error(e.message)
        res.status(500).send("Server Error")
    }
})

router.delete("/:idPost", auth, async (req, res) => {
    console.log(`=> \n\n${JSON.stringify(req.user)}\n\n`)
    const idUser = req.user.id
    const { idPost } = req.params
    try {
        const post = await Post.findById(idPost)
        if (!post) return res.status(404).json({ msg: "Post not found" })
        if (post.user.toString() === idUser) {
            await Post.findByIdAndRemove(idPost)
            res.json({ msg: "Post removed" })
        } else {
            res.status(401).send("This post doesnt belong to you")
        }
    } catch (e) {
        if (e.kind === "ObjectId")
            return res.status(400).json({ msg: "Post not found" })
        console.error(e.message)
        res.status(500).send("Server Error")
    }
})

router.put("/like/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ msg: "Post not found" })
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length > 0
        ) {
            return res.status(400).json({ msg: "post already like" })
        }
        post.likes.unshift({ user: req.user.id })
        await post.save()
        res.json(post.likes)
    } catch (e) {
        if (e.kind === "ObjectId")
            return res.status(400).json({ msg: "Post not found" })
        console.error(e.message)
        res.status(500).send("Server Error")
    }
})

router.put("/unlike/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ msg: "Post not found" })
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length === 0
        ) {
            return res
                .status(400)
                .json({ msg: "You didn't liked this post yet" })
        }
        post.likes = post.likes.filter(
            (like) => like.user.toString() !== req.user.id
        )
        await post.save()
        res.json(post.likes)
    } catch (e) {
        if (e.kind === "ObjectId")
            return res.status(400).json({ msg: "Post not found" })
        console.error(e.message)
        res.status(500).send("Server Error")
    }
})

router.post(
    "/comment/:commentId",
    [auth, [check("text", "Text is required").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() })
        }

        try {
            const user = await User.findById(req.user.id).select("-password")
            const post = await Post.findById(req.params.commentId)
            if (!post) return res.status(404).json({ msg: "Post not found" })
            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            }
            post.comments.unshift(newComment)
            await post.save()
            res.json(post.comments)
        } catch (e) {
            if (e.kind === "ObjectId")
                return res.status(400).json({ msg: "Post not found" })
            console.error(e.message)
            res.status(500).send("Server Error")
        }
    }
)

router.delete("/comment/:idPost/:commentId", auth, async (req, res) => {
    const { idPost } = req.params
    const { commentId } = req.params
    try {
        const post = await Post.findById(idPost)
        if (!post) return res.status(404).json({ msg: "Post not found" })

        const comment = post.comments.find(
            (comment) => comment.id === commentId
        )

        if (!comment)
            return res.status(404).json({ msg: "Comment does not exist" })

        if (comment.user.toString() !== req.user.id)
            return res
                .status(403)
                .json({ msg: "the comment doesnt belong to you" })

        post.comments = post.comments.filter(
            (comment) => comment.id !== commentId
        )
        await post.save()
        res.json({ msg: "Comment deleted" })
    } catch (e) {
        if (e.kind === "ObjectId")
            return res.status(400).json({ msg: "Post not found" })
        console.error(e.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router
