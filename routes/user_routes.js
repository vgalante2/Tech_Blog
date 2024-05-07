const router = require('express').Router()
const User = require('../models/User')




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



router.post('/auth/register', async (req, res) => {
    try {
        let newUser = req.body

        const user = await User.create(newUser)
        req.session.user_id = user.id
        return res.redirect('/create')

    } catch (err) {
        console.log(err)
    }
})


router.post('/auth/login', async (req, res) => {
    try {
        let input = req.body
        const user = await User.findOne({
            where: {
                username: input.username,
            }
        })
        if (user) {
            const is_valid = await user.validatePass(input.password)
            if (is_valid) {
                req.session.user_id = user.id
                return res.redirect(req.get('referer'))
            }
            return res.redirect(req.get('referer'))
        }
        return res.redirect(req.get('referer'))

    } catch (err) {
        console.log(err)
    }

})

router.post('/auth/register',  async (req, res) => {
    try{
        let newUser = req.body 
         const user = await User.create(newUser)
         req.session.user_id = user.id

         console.log(user)
         return res.redirect('/create')

    }
    catch (err) {
        console.log(err)
    }
})