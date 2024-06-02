const router = require('express').Router();
const { hash, compare } = require('bcrypt')

const {User, Post, Comment} = require('../models');

// The `/api/users` endpoint

async function handleError(err, res) {
  console.log(err)
  return res.redirect('/home')
}

router.post('/auth/register', async (req, res) => {
  try {
      let newUser = req.body
      const user = await User.create(newUser)
      req.session.user_id = user.id
      return res.redirect('/dashboard')

  } catch (err) {
      handleError(err, res)
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
              return res.redirect('/dashboard')
          }
          return res.redirect(req.get('referer'))
      }
      return res.redirect(req.get('referer'))

  } catch (err) {
      handleError(err, res)
  }
})

router.post('/auth/post', async (req, res) => {
  try {
      const user = await User.findByPk(req.session.user_id)
      user.createPost(req.body)
 
      return res.redirect('/dashboard')

  } catch (err) {
      handleError(err, res)
  }
})

router.put('/auth/post', async (req, res) => {
  try {
    if(req.session.user_id){
      const post = await Post.findByPk(req.body.postId)
      const updateText = {text:req.body.text}
      post.update(updateText)
 
      return res.json({message:'success'})
    }
    return res.redirect('/login')
  } catch (err) {
      handleError(err, res)
  }
})

router.delete('/auth/post', async (req, res) => {
  try {
    if(req.session.user_id){
      await Post.destroy({
        where: {
          id: req.body.postId
      }
      })
  
 
      return res.json({message:'success'})
    }
    return res.redirect('/login')
  } catch (err) {
      handleError(err, res)
  }
})

router.post('/auth/comment', async (req, res) => {
  try {
    const com = req.body
    if(req.session.user_id){
      com.userId = req.session.user_id
        const comment = await Comment.create(req.body)
        return res.json(comment)
    }
    return res.redirect('/login')
  } catch (err) {
      handleError(err, res)
  }
})

router.put('/auth/comment', async (req, res) => {
  try {
    if(req.session.user_id){
      const comment = await comment.findByPk(req.body.id)
      const updateText = {text:req.body.text}
      comment.update(updateText)
 
      return res.json({message:'success'})
    }
    return res.redirect('/login')
  } catch (err) {
      handleError(err, res)
  }
})

router.delete('/auth/comment', async (req, res) => {
  try {
    if(req.session.user_id){
      await Comment.destroy({
        where: {
          id: req.body.id
      }
      })
  
 
      return res.json({message:'success'})
    }
    return res.redirect('/login')
  } catch (err) {
      handleError(err, res)
  }
})



router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [Post, Comment]
    })
    return res.json(users)

  }
  catch (err) {
    console.log(err)
    return res.json({
      message: 'Bad Request',
      error: err
    })
  }
});

router.get('/:id', async (req, res) => {
  let id = req.params.id
  try {
    const user = await User.findByPk(id, {
      include: [Post, Comment]
    })
    return res.json(user)

  }
  catch (err) {
    console.log(err)
    return res.json({
      message: 'Bad Request',
      error: err
    })
  }
});

router.post('/', async (req, res) => {
  try {
    let newUser = req.body

    const user = await User.create(newUser)
    return res.json(user)

  } catch (err) {
    console.log(err)
    return res.json({
      message: 'Bad Request',
      error: err
    })
  }
})

router.post('/login', async (req, res) => {
    try {
      let input = req.body
      const user = await User.findOne({
        where: {
          username: input.username,
        }
      })
      if(user){
        const is_valid = await user.validatePass(input.password)
        if(is_valid){
            return res.json({message: 'Passwords Match'})
        }
        return res.json({message: 'Incorrect Password'})
      }
      return res.json({message: 'No User with that name'})
  
    } catch (err) {
      console.log(err)
      return res.json({
        message: 'Bad Request',
        error: err
      })
    }
  })

router.put('/:id', async (req, res) => {
  try {
    let newUser = req.body
    let id = req.params.id
    if(newUser.password){
        newUser.password =  await hash(newUser.password, 10)
    }
    const user = await User.findByPk(id)
    user.update(newUser)
    return res.json(user)

  } catch (err) {
    console.log(err)
    return res.json({
      message: 'Bad Request',
      error: err
    })
  }
});
router.delete('/:id', async (req, res) => {
  let id = req.params.id
  try {
    const user = await User.findByPk(id, {
      include: [Post, Comment]
    })
    await user.destroy()
    return res.json({
      message: `User with ID ${id} removed from Database`
    })

  }
  catch (err) {
    console.log(err)
    return res.json({
      message: 'Bad Request',
      error: err
    })
  }
});

module.exports = router;
