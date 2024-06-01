const {Model, DataTypes} = require('sequelize');
const client = require('../db/client');


class Comment extends Model {}

Comment.init(

    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize: client,
        modelName: 'comment'
    }
)

module.exports = Comment