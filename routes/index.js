const router = require('express').Router()

const users = require('./user_routes')

const views = require('./view_routes')

const posts = require('./blog_routes')

// const comments = require('./comment_routes')
// router.use('/comments', comments)

router.use('/api/users', users)
router.use('/api/posts', posts)
router.use('/', views)

module.exports = router