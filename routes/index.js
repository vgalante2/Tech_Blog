const router = require('express').Router()
const User = require('../models/User.js')
const Post = require('../models/Post.js')

async function attachUser(req, res, next) {
    const user_id = req.session.user_id
    if (user_id) {
        const user = await User.findByPk(user_id, {
            attributes: ['id', 'username', 'email', 'posts'],
            include: [{
                model: Post,
                as: 'posts'  // Ensure this alias matches your model associations
            }],
        })
        req.user = user.get({plain:true})
        return next()
    }
    next()
}

const user_routes = require('./user_routes')

router.use('/auth',attachUser, user_routes)

const blog_routes = require('./blog_routes.js')

router.use('/posts',attachUser, blog_routes)

const views = require('./view_routes.js')

router.use('/',attachUser, views)

module.exports = router