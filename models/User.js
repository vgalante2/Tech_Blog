const { DataTypes, Model} = require('sequelize')
const client = require('../db/client')
const { hash, compare } = require("bcrypt");

class User extends Model {
    async validatePass(formPass) {
 const is_valid = await compare(formPass, this.password)
 return is_valid
    }
}


User.init(
    {
        username: {
            type: DataTypes.STRING,
            notNull: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            notNull: true,
            unique: {
                args: true,
                message: "user with this already exists"
            },
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: 6
            }
        }
    },
    {
        sequelize: client,
        modelName: "user",
        hooks: {
          async beforeCreate(user) {
            user.password = await hash(user.password, 10);
          },
        },
        scopes: {
          withoutPassword: {
            attributes: { exclude: ["password"] },
          },
        },
      }
)


module.exports = User