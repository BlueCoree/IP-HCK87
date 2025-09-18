const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static async register(req, res, next) {
        try {
            const create = await User.create(req.body);
            res.status(201).json({ id: create.id, username: create.username, email: create.email, element: create.element });
        } catch (error) {
            console.log(error, '<<< error register server');
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) {
                next({ name: 'isEmail' })
                return;
            }

            if (!password) {
                next({ name: 'isPassword' })
                return;
            }

            const user = await User.findeOne({ where: { email } })

            if (!user) {
                next({ name: 'Unauthentication' })
                return;
            }

            const isPasswordValid = comparePassword(password, user.password)

            if (!isPasswordValid) {
                next({ name: 'Unauthentication' })
            }

            const access_token = signToken({ id: user.id, username: user.username, email: user.email, element: user.element })
            res.status(200).json({ access_token });
        } catch (error) {
            next(error);
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            const { id_token } = req.body;

            if (!id_token) {
                throw { name: 'BadRequest', message: 'ID token is required' };
            }

            
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();

            const user = await User.findOne({where: { email: payload.email}})

            if (user) {
                const access_token = signToken({ id: user.id, username: user.username, email: user.email, element: user.element });
                res.status(200).json({ access_token });
                return;
            } else {
                const newUser = await User.create({
                    email: payload.email,
                    username: payload.name,
                    password: Math.random().toString(36).slice(-8),
                    element: 'pyro'
                })
                const access_token = signToken({ id: newUser.id, username: newUser.username, email: newUser.email, element: newUser.element });
                res.status(201).json({ access_token });
                return;
            }
        } catch (error) {
            console.log(error, '<<< error login google server');
            next(error)
        }
    }
}

module.exports = UserController;