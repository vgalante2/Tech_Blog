const { DataTypes, Model} = require('sequelize')
const client = require('../db/client')
const { hash, compare } = require("bcrypt");

class User extends Model {
    async comparePass(formPass) {
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
            notNull: true,
            validate: {
                len: 6
            }
        }
    },
    {
        sequelize: client,
        hooks: {
          async beforeCreate(user) {
            user.password = await hash(user.password, 10);
          },
        },
        modelName: "user",
        scopes: {
          withoutPassword: {
            attributes: { exclude: ["password"] },
          },
        },
      }
)

