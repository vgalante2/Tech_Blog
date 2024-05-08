const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')



router.get('/', async (req, res) => {
    try{
        const users = await User.scope('withoutPassword').findAll({
            include: {model: Post},
        })
        return res.json(users)
    }
    catch (err) {
        console.log(err)
    }
})


router.get('/:id', async (req, res) => {
    let id = req.params.id
    try {
        const user = await User.scope('withoutPassword').findByPk(id,
            {
                include: { model: Post },
            })
        return res.json(user)

    }
    catch (err) {
        handleError(err, res)
    }
})



router.post('/register', async (req, res) => {
    try {
        let newUser = req.body

        const user = await User.create(newUser)
        req.session.user_id = user.id
        return res.redirect('/dashboard')

    } catch (err) {
        console.log(err)
    }
})


router.post('/login', async (req, res) => {
    try {

        let input = req.body
        console.log('Received login request for username:', input.username);
        const user = await User.findOne({
            where: {
                username: input.username,
            }
        })
        if (user) {
            console.log('Theres a user: ' + user.username)
            const is_valid = await user.validatePass(input.password)
            if (is_valid) {
                console.log('youre logged in ' + user.username)
                req.session.user_id = user.id
                req.session.username = user.username
                
                return res.redirect(req.get('referer'))
                
            }
           
            return res.redirect(req.get('referer'))
        }
        
        return res.redirect(req.get('referer'))

    } catch (err) {
       console.log(err)
    }
})

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy()
        return res.redirect('/logout')
    }
    catch (err) {
        console.log(err)
    }
})


// router.post('dashboard', async (req, res) => {
//     try {
        
//     }
// })


module.exports = router;
