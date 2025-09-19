const { app, request } = require('../setup');
const { Character } = require('../../models');

describe('CharacterController', () => {
  let testCharacter;

  beforeEach(async () => {
    testCharacter = await Character.create({
      name: 'Test Character',
      vision: 'Pyro',
      weaponType: 'Sword',
      rarity: 5,
      region: 'Mondstadt',
      imageUrl: 'https://example.com/character.png',
      description: 'Test character description'
    });
  });

  describe('GET /characters', () => {
    it('should return all characters', async () => {
      const response = await request(app)
        .get('/characters');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
    });

    it('should filter characters by vision', async () => {
      const response = await request(app)
        .get('/characters')
        .query({ vision: 'Pyro' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.every(char => char.vision === 'Pyro')).toBe(true);
    });

    it('should filter characters by weaponType', async () => {
      const response = await request(app)
        .get('/characters')
        .query({ weaponType: 'Sword' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.every(char => char.weaponType === 'Sword')).toBe(true);
    });
  });

  describe('GET /characters/:id', () => {
    it('should return a specific character by id', async () => {
      const response = await request(app)
        .get(`/characters/${testCharacter.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', testCharacter.id);
      expect(response.body).toHaveProperty('name', testCharacter.name);
    });

    it('should return 404 for non-existent character', async () => {
      const response = await request(app)
        .get('/characters/99999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Character not found');
    });
  });
});