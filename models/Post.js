const {Model, DataTypes } = require('sequelize')
const client = require('../db/client')

class Post extends Model {}


Post.init(
    {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
    },
    {
     sequelize: client
    }
)

module.exports = Post