const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

function isAuth(req, res, next) {
    if(!req.session.user_id) {
       res.redirect('/login')
    }

    return next()
}



// Create a post
router.post('/', isAuth, async (req, res) => {
    try {
        if (!req.session.user_id) {
            // If there's no user_id in the session, respond with an error or redirect
            return res.status(403).send("User must be logged in to post.");
        }

        const newPost = await Post.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.user_id  // Ensure this is being correctly populated
        });

        res.redirect('/');
    } catch (error) {
        console.error("Error in POST /home:", error);
        if (!res.headersSent) {
            res.status(500).send("Error processing your request.");
        }
    }
});

module.exports = router