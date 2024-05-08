const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')


function isAuth(req, res, next) {
    if(!req.session.user_id) {
       res.redirect('/login')
    }

    return next()
}

router.get('/', async (req, res) => {
    let userObj = {
        isLoggedIn: req.body ? true : false,
        user: req.user
    }

    res.render('home', userObj)

})

router.get('/posts', async (req, res) => {
    const posts = await Post.findAll()
    res.render('posts', {
        posts: posts.map(p => p.get({plain: true}) )
    })
})

router.get('/dashboard', (req, res) => {
    let userObj = {
        isLoggedIn: req.body ? true : false,
        user: req.user
    }
    
    res.render('dashboard', userObj)
})

router.get('/register', async (req, res) => {
    let userObj = {
        isLoggedIn: req.user ? true : false,
        user: req.user
    }
    res.render('register', userObj)
})

router.get('/login', async (req, res) => {
    let userObj = {
        isLoggedIn: req.user ? true : false,
        user: req.user,
    }

    res.render('login', userObj)
})


router.get('/logout', async (req, res) => {
    let userObj = {
        isLoggedIn: req.user ? true : false,
        user: req.user
    }

    res.render('logout', userObj)
})

router.get('/user', isAuth, async (req, res) => {
    if (!req.user) {
        // Handle case where user is not set
        return res.status(404).send("User not found");
    }
    const user = await User.findByPk(req.user.id);
    let userObj = {
        isLoggedIn: true,
        user: req.user
    };
    res.render('dashboard', userObj);
});



module.exports = router