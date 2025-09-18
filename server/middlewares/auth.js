const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')

const authentication = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        
        if (!bearerToken) {
            throw { name: 'invalidToken' };
        }

        const token = bearerToken.split(' ')[1];
        if (!token) {
            throw { name: 'invalidToken' };
        }

        const data = verifyToken(token);
        const user = await User.findByPk(data.id);

        if (!user) {
            throw { name: 'invalidToken' };
        }
        
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {authentication}