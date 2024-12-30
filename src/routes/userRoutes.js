const { Router } = require('express');
const { 
  createUserController, 
  getUsersController, 
  getUserByIdController, 
  updateUserController, 
  deleteUserController 
} = require('../controllers/userController');
const { validateUserMiddleware } = require('../middlewares/validate');

const router = Router();

// Endpoint untuk CRUD user
router.post('/users/', validateUserMiddleware, createUserController);
router.get('/users/', getUsersController);
router.get('/users/:id', getUserByIdController);
router.put('/users/:id', validateUserMiddleware, updateUserController);
router.delete('/users/:id', deleteUserController);

module.exports = router;
