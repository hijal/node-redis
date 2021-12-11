const express = require('express');
const todoController = require('../controllers/todoController');
const router = express.Router();

router.get('/', todoController.getAll);
// router.post('/', todoController.create);
// router.get('/:id', todoController.findById);
// router.put('/:id', todoController.update);
// router.delete('/:id', todoController.remove);

module.exports = router;
