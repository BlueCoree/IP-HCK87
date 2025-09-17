const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')

const authentication = async (req, res, next) => {
    const bearerToken = req.headers.authorization

    if (!bearerToken) {
        next({name: 'invalidToken'})
        return;
    }

    try {
        const data = verifyToken(bearerToken)
        const user = await User.findByPk(data.id)

        if (!user) {
            next({name: 'invalidToken'})
            return;
        }
        
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}