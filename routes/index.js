const router = require('express').Router()
const User = require('../models/User.js')
async function attachUser(req, res, next) {
    const user_id = req.session.user_id
    if (user_id) {
        const user = await User.findByPk(user_id, {
            attributes: ['id', 'username', 'email', 'posts']
        })
        req.user = user.get({plain:true})
        return next()
    }
    next()
}
const users = require('./user_routes')

router.use('/api/events',attachUser, users)

const posts = require('./user_routes.js')

router.use('/api/events',attachUser, posts)

const views = require('./view_routes.js')

router.use('/',attachUser, views)

module.exports = router