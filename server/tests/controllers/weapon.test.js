const { app, request, testUser } = require('../setup');
const { Weapon } = require('../../models');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('WeaponController', () => {
  let testWeapon;
  let token;

  beforeEach(async () => {
    testWeapon = await Weapon.create({
      name: 'Test Sword',
      type: 'Sword',
      rarity: 5,
      baseATK: 48,
      subStat: 'CRIT Rate',
      subValue: 9.6,
      passive: 'Test passive ability',
      description: 'Test weapon description',
      imageUrl: 'https://example.com/weapon.png'
    });

    token = 'fake-token';
    jwt.verify.mockReturnValue({ id: 1 });
  });

  describe('GET /weapons', () => {
    it('should return all weapons', async () => {
      const response = await request(app)
        .get('/weapons');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
    });

    it('should filter weapons by type', async () => {
      const response = await request(app)
        .get('/weapons')
        .query({ type: 'Sword' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.every(weapon => weapon.type === 'Sword')).toBe(true);
    });

    it('should filter weapons by rarity', async () => {
      const response = await request(app)
        .get('/weapons')
        .query({ rarity: 5 });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.every(weapon => weapon.rarity === 5)).toBe(true);
    });
  });

  describe('GET /weapons/:id', () => {
    it('should return a specific weapon by id', async () => {
      const response = await request(app)
        .get(`/weapons/${testWeapon.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', testWeapon.id);
      expect(response.body).toHaveProperty('name', testWeapon.name);
    });

    it('should return 404 for non-existent weapon', async () => {
      const response = await request(app)
        .get('/weapons/99999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Weapon not found');
    });
  });
});