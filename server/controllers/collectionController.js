const { Collection, Character } = require('../models');

class CollectionController {
    static async getUserCollection(req, res, next) {
        try {
            const userId = req.user.id;
            // Get all collections for the user
            const collections = await Collection.findAll({
                where: { userId },
                include: [Character]
            });

            res.json(collections);
        } catch (err) {
            next(err);
        }
    }

    static async addCharacter(req, res, next) {
        try {
            const userId = req.user.id;
            const { characterId } = req.body;

            await Collection.create({
                userId,
                charaterId: characterId
            });

            const collections = await Collection.findAll({
                where: { userId },
                include: [Character]
            });

            res.json(collections);
        } catch (err) {
            next(err);
        }
    }

    static async removeCharacter(req, res, next) {
        try {
            const userId = req.user.id;
            const characterId = req.params.id;

            await Collection.destroy({
                where: {
                    userId,
                    charaterId: characterId
                }
            });

            const collections = await Collection.findAll({
                where: { userId },
                include: [Character]
            });

            res.json(collections);
        } catch (err) {
            next(err);
        }
    }

//   static async removeCharacter(req, res, next) {
//     try {
//         const userId = req.user.id;
//         const characterId = req.params.id;

//         const collection = await Collection.findOne({ where: { userId } });
//         if (!collection) throw { name: 'NotFound', message: 'Collection not found' };

//         await collection.removeCharacter(characterId);

//         const updatedCollection = await Collection.findOne({
//             where: { userId },
//             include: [Character]
//         });

//         res.json(updatedCollection);
//     } catch (err) {
//         next(err);
//     }
// }
};

module.exports = CollectionController