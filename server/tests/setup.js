const { sequelize } = require('../models');
const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'testpassword123'
};

let userToken;

beforeAll(async () => {
  jest.setTimeout(20000); // Set timeout to 20 seconds
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // Reset database
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    await sequelize.close();
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
});

beforeEach(async () => {
  try {
    await sequelize.truncate({ cascade: true, force: true }); // Clear all tables
    jest.clearAllMocks();
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  }
});

module.exports = {
  app,
  request,
  testUser,
  userToken
};