const router = require('express').Router()
const { User, Post, Comment } = require('../models');


router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
      model: User,
      attributes: ['username']
    }
  })
    return res.json(posts)

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
    const post = await Post.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        }
      ]
    })
    return res.json(post)

  }
  catch (err) {
    console.log(err)
    return res.json({
      message: 'Bad Request',
      error: err
    })
  }
})

module.exports = router;