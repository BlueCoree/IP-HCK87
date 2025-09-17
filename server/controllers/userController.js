const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class UserController {
  static async register(req, res, next) {
    try {
        const create = await User.create(req.body);
      res.status(201).json({id: create.id, username: create.username, email: create.email, element: create.element});
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const {email, password} = req.body

      if (!email) {
        next({name: 'isEmail'})
        return;
      }

      if (!password) {
        next({name: 'isPassword'})
        return;
      }

      const user = await User.findeOne({where: {email}})

      if (!user) {
        next({name: 'Unauthentication'})
        return;
      }

      const isPasswordValid = comparePassword(password, user.password)

      if (!isPasswordValid) {
        next({name: 'Unauthentication'})
      }

      const access_token = signToken({id: user.id, username: user.username, email: user.email, element: user.element})
      res.status(200).json({access_token});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;