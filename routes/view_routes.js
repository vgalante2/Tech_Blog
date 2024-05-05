const router = require('express').Router()
const Post = require('../models/Post')

// Get home page
router.get('/', async (req, res) => {
    const post = await Post.findAll()


    res.render('home', {
        post: post.map(p => p.get({plain: true}) )
    })

})

router.get('/create', (req, res) => {
    res.render('form')
})


module.exports = router