const { app, request, testUser } = require('../setup');
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('UserController', () => {
  describe('POST /register', () => {
    beforeEach(async () => {
      await User.destroy({ where: {}, truncate: true });
      bcrypt.hashSync.mockReturnValue('hashedPassword');
    });

    it('should successfully register a new user', async () => {
      const response = await request(app)
        .post('/register')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(testUser.email);
      expect(bcrypt.hashSync).toHaveBeenCalledWith(testUser.password, 10);
    });

    it('should return 400 if email is already registered', async () => {
      await User.create({
        ...testUser,
        password: 'hashedPassword'
      });

      const response = await request(app)
        .post('/register')
        .send(testUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email already registered');
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          email: testUser.email
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /login', () => {
    beforeEach(async () => {
      await User.destroy({ where: {}, truncate: true });
      await User.create({
        username: testUser.username,
        email: testUser.email,
        password: 'hashedPassword'
      });

      bcrypt.compareSync.mockReturnValue(true);
      jwt.sign.mockReturnValue('fakeToken');
    });

    it('should successfully login with correct credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('access_token');
      expect(bcrypt.compareSync).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalled();
    });

    it('should return 401 with incorrect password', async () => {
      bcrypt.compareSync.mockReturnValue(false);

      const response = await request(app)
        .post('/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Invalid email/password');
    });

    it('should return 401 with non-existent email', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'nonexistent@example.com',
          password: testUser.password
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Invalid email/password');
    });
  });
});