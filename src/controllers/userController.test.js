const request = require('supertest');
const app = require('../app');
const { pool } = require('../config/database');

// Mock database query dengan jest
jest.mock('../config/database', () => ({
  pool: {
    execute: jest.fn(),
  },
}));

describe('User Routes', () => {
  // Test untuk POST /users
  describe('POST /users', () => {
    test('should create a new user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
      };

      pool.execute.mockResolvedValue([{ affectedRows: 1, insertId: 1 }]);

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created successfully');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.name).toBe(newUser.name);
    });

    test('should return 400 if missing required fields', async () => {
      const response = await request(app)
        .post('/users')
        .send({ name: 'John Doe' });

      expect(response.status).toBe(400);
    });
  });

  // Test untuk GET /users
  describe('GET /users', () => {
    test('should get all users', async () => {
      const mockUsers = [
        { id: '1', name: 'John Doe', email: 'john.doe@example.com', age: 30 },
        { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', age: 25 },
      ];

      pool.execute.mockResolvedValue([mockUsers]);

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('John Doe');
    });

    test('should return 500 on server error', async () => {
      pool.execute.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/users');

      expect(response.status).toBe(500);
    });
  });

  // Test untuk GET /users/:id
  describe('GET /users/:id', () => {
    test('should return user by ID', async () => {
      const mockUser = { id: '1', name: 'John Doe', email: 'john.doe@example.com', age: 30 };

      pool.execute.mockResolvedValue([[mockUser]]);

      const response = await request(app).get('/users/1');

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(mockUser.id);
      expect(response.body.name).toBe(mockUser.name);
    });

    test('should return 404 if user not found', async () => {
      pool.execute.mockResolvedValue([[]]);

      const response = await request(app).get('/users/999');

      expect(response.status).toBe(404);
    });
  });

  // Test untuk PUT /users/:id
  describe('PUT /users/:id', () => {
    test('should update user by ID', async () => {
      const updatedUser = { name: 'John Updated', email: 'john.updated@example.com', age: 35 };

      pool.execute.mockResolvedValue([{ affectedRows: 1 }]);

      const response = await request(app)
        .put('/users/1')
        .send(updatedUser);

      expect(response.status).toBe(200);
    });

    test('should return 404 if user not found', async () => {
      const updatedUser = { name: 'John Updated', email: 'john.updated@example.com', age: 35 };

      pool.execute.mockResolvedValue([{ affectedRows: 0 }]);

      const response = await request(app)
        .put('/users/999')
        .send(updatedUser);

      expect(response.status).toBe(404);
    });
  });

  // Test untuk DELETE /users/:id
  describe('DELETE /users/:id', () => {
    test('should delete user by ID', async () => {
      pool.execute.mockResolvedValue([{ affectedRows: 1 }]);

      const response = await request(app).delete('/users/1');

      expect(response.status).toBe(200);
    });

    test('should return 404 if user not found', async () => {
      pool.execute.mockResolvedValue([{ affectedRows: 0 }]);

      const response = await request(app).delete('/users/999');

      expect(response.status).toBe(404);
    });
  });
});
