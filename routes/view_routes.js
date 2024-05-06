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

router.get('/create', (req, res) => {
    res.render('form')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/users',isAuth, async (req, res) => {
let userObj ={
    isLoggedIn: true,
    user: user.id
}

  const user = await User.findByPk(req.user.id)

  console.log(userObj)
  res.render('register', userObj)
})


module.exports = router