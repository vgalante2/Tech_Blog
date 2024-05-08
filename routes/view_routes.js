const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')


function isAuth(req, res, next) {
    if(!req.session.user_id) {
       res.redirect('/login')
    }

    return next()
}


// Get home page
router.get('/', async (req, res) => {
    const post = await Post.findAll()


    res.render('home', {
        post: post.map(p => p.get({plain: true}) )
    })

})

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

router.get('/register', (req, res) => {
    let userObj = {
        isLoggedIn: req.user ? true : false,
        user: req.user
    }
    res.render('register', userObj)
})

router.get('/login', (req, res) => {
    let userObj = {
        isLoggedIn: req.user ? true : false,
        user: req.user,
    

    }
    res.render('login', userObj)
})

router.get('/user', isAuth, async (req, res) => {
let userObj ={
    isLoggedIn: true,
    user: req.user
}

  const user = await User.findByPk(req.user.id)

  console.log(userObj)
  res.render('dashboard', userObj)
})


module.exports = router