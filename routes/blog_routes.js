const router = require('express').Router()

const Post = require('../models/Post')





// Create a post
router.post('/posts', async (req, res) => {
 await Post.create(req.body)

    res.redirect('/')
})

module.exports = router