const {Model, DataTypes } = require('sequelize')
const client = require('../db/client')

class Post extends Model {}


Post.init(
    {
    id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        }, 
    title: { 
        type: DataTypes.TEXT,
        allowNull: false
    }, 
    text: { 
        type: DataTypes.TEXT,
        allowNull: false
    } 
    }, 
    { 
     sequelize: client,
     modelName: 'post',
    } 
)

module.exports = Post