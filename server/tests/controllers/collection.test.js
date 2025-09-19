const { app, request } = require('../setup');
const { Collection, Character, User } = require('../../models');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('CollectionController', () => {
  let testUser;
  let testCharacter;
  let token;

  beforeEach(async () => {
    testUser = await User.create({
      username: 'collector',
      email: 'collector@test.com',
      password: 'hashedpass'
    });

    testCharacter = await Character.create({
      name: 'Test Character',
      vision: 'Pyro',
      weaponType: 'Sword',
      rarity: 5,
      region: 'Mondstadt',
      imageUrl: 'https://example.com/character.png',
      description: 'Test character description'
    });

    token = 'fake-token';
    jwt.verify.mockReturnValue({ id: testUser.id });
  });

  describe('GET /collections', () => {
    it('should return user collections', async () => {
      await Collection.create({
        UserId: testUser.id,
        CharacterId: testCharacter.id
      });

      const response = await request(app)
        .get('/collections')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].Character).toHaveProperty('id', testCharacter.id);
    });

    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/collections');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /collections/character/:id', () => {
    it('should add character to collection', async () => {
      const response = await request(app)
        .post(`/collections/character/${testCharacter.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Character added to collection');

      const collection = await Collection.findOne({
        where: {
          UserId: testUser.id,
          CharacterId: testCharacter.id
        }
      });
      expect(collection).toBeTruthy();
    });

    it('should return 404 for non-existent character', async () => {
      const response = await request(app)
        .post('/collections/character/99999')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it('should prevent duplicate character in collection', async () => {
      await Collection.create({
        UserId: testUser.id,
        CharacterId: testCharacter.id
      });

      const response = await request(app)
        .post(`/collections/character/${testCharacter.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Character already in collection');
    });
  });

  describe('DELETE /collections/character/:id', () => {
    beforeEach(async () => {
      await Collection.create({
        UserId: testUser.id,
        CharacterId: testCharacter.id
      });
    });

    it('should remove character from collection', async () => {
      const response = await request(app)
        .delete(`/collections/character/${testCharacter.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Character removed from collection');

      const collection = await Collection.findOne({
        where: {
          UserId: testUser.id,
          CharacterId: testCharacter.id
        }
      });
      expect(collection).toBeFalsy();
    });

    it('should return 404 for non-existent character in collection', async () => {
      const response = await request(app)
        .delete('/collections/character/99999')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });
});