const User = require('./User');
const Post = require('./Post');

// User has many Posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// Post belongs to User
Post.belongsTo(User, {
    foreignKey: 'user_id'
});



module.exports = { User, Post };