const { app, request } = require('../setup');
const { Collection, Character, User } = require('../../models');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const jwt = require('jsonwebtoken');

jest.mock('@google/generative-ai');
jest.mock('jsonwebtoken');

describe('RecommendationController', () => {
  let testUser;
  let characters;
  let token;
  let mockGenAI;
  let mockModel;
  let mockChat;

  beforeEach(async () => {
    // Create test user
    testUser = await User.create({
      username: 'collector',
      email: 'collector@test.com',
      password: 'hashedpass'
    });

    // Create test characters
    characters = await Character.bulkCreate([
      {
        name: 'Character 1',
        vision: 'Pyro',
        weaponType: 'Sword',
        rarity: 5,
        region: 'Mondstadt'
      },
      {
        name: 'Character 2',
        vision: 'Hydro',
        weaponType: 'Bow',
        rarity: 4,
        region: 'Liyue'
      }
    ]);

    // Add one character to user's collection
    await Collection.create({
      UserId: testUser.id,
      CharacterId: characters[0].id
    });

    // Setup JWT mock
    token = 'fake-token';
    jwt.verify.mockReturnValue({ id: testUser.id });

    // Setup Gemini AI mocks
    mockChat = {
      sendMessage: jest.fn().mockResolvedValue({
        response: {
          text: jest.fn().mockReturnValue('This is a recommendation for Character 2')
        }
      })
    };

    mockModel = {
      startChat: jest.fn().mockReturnValue(mockChat)
    };

    mockGenAI = {
      getGenerativeModel: jest.fn().mockReturnValue(mockModel)
    };

    GoogleGenerativeAI.mockImplementation(() => mockGenAI);
  });

  describe('GET /recommendation', () => {
    it('should return AI recommendation based on user collection', async () => {
      const response = await request(app)
        .get('/recommendation')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('character');
      expect(response.body).toHaveProperty('recommendation');
      expect(typeof response.body.recommendation).toBe('string');
      expect(mockChat.sendMessage).toHaveBeenCalled();
    });

    it('should handle empty collection case', async () => {
      await Collection.destroy({
        where: {
          UserId: testUser.id
        }
      });

      const response = await request(app)
        .get('/recommendation')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('character');
      expect(response.body).toHaveProperty('recommendation');
    });

    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/recommendation');

      expect(response.status).toBe(401);
    });

    it('should handle AI API errors gracefully', async () => {
      mockChat.sendMessage.mockRejectedValue(new Error('AI API Error'));

      const response = await request(app)
        .get('/recommendation')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Failed to get AI recommendation');
    });
  });
});