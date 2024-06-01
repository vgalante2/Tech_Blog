const router = require('express').Router()
const { User, Post, Comment } = require('../models')

function isAuth(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    return next()
}

async function postExists(req, res, next) {
    const post = await Post.findByPk(req.params.id)
    if (!post) {
        return res.redirect('/dashboard')
    }
    return next()
}
function formatDate(rawdate) {
    const date = new Date(rawdate)
    return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    }) + ' ' + date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })
}
function makePostsObj(posts, id) {
    let postObj = []
    posts.forEach(post => {
        let comments = []
        const commentsExist = post.comments ? true : false;
        if (commentsExist) {
            post.comments.forEach(comment => {
                comments.push(
                    {
                        id: comment.id,
                        text: comment.text,
                        username: comment.user.username,
                        user_id: comment.user.id,
                        date: formatDate(comment.createdAt),
                        canEdit: isSameUser(id, comment.user.id)
                    }
                )
            })
        }
        postObj.push(
            {
                id: post.id,
                title: post.title,
                text: post.text,
                user_id: post.user.id,
                username: post.user.username,
                date: formatDate(post.createdAt),
                comments: comments,
                canEdit: isSameUser(id, post.user.id)
            }
        )
    })
    return postObj
}
function isSameUser(userId, objUserId) {
    if (objUserId === userId) {
        return true
    }
    return false
}

router.get('/', async (req, res) => {
    let userObj = {
        isLoggedIn: req.session.user_id ? true : false,
        user_id: req.session.user_id
    }
    const posts = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Comment,
                include: [
                    {
                        model: User,
                        attributes: ['username', 'id']
                    }
                ]
            }]
    })
    userObj.posts = makePostsObj(posts, userObj.user_id)

    res.render('home', userObj)
})
router.get('/post/:id', postExists, async (req, res) => {
    let userObj = {
        isLoggedIn: req.session.user_id ? true : false,
        user_id: req.session.user_id
    }
    const post = await Post.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Comment,
                include: [
                    {
                        model: User,
                        attributes: ['username', 'id']
                    }
                ]
            }
        ]
    })
    userObj.posts = makePostsObj([post], userObj.user_id)

    res.render('post', userObj)
})

router.get('/dashboard', isAuth, async (req, res) => {
    let userObj = {
        isLoggedIn: req.session.user_id ? true : false,
        user_id: req.session.user_id
    }

    const posts = await Post.findAll({
        where: {
            userId: req.session.user_id
        },
        include: [
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Comment,
                include: [
                    {
                        model: User,
                        attributes: ['username', 'id']
                    }
                ]
            }]
    })
    userObj.posts = makePostsObj(posts, userObj.user_id)
    res.render('dashboard', userObj)
})

router.get('/login', async (req, res) => {
    if (req.session.user_id) {
        res.redirect('/')
    }

    res.render('login')
})

router.get('/register', async (req, res) => {
    if (req.session.user_id) {
        res.redirect('/')
    }
    res.render('register')
})

router.get('/logout', async (req, res) => {
    req.session.destroy()

    res.redirect('/')
})

module.exports = router
