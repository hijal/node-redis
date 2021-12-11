const asyncHandler = require('express-async-handler');
const asyncRedis = require('async-redis');
const Todo = require('../models/todo');

const client = asyncRedis.createClient();

const getAll = asyncHandler(async (req, res) => {
	try {
		const todos = await Todo.find({});
		const todosCached = await client.get('todos');

		if (todosCached) {
			res.status(200).json({
				success: true,
				data: todosCached,
			});
		} else {
			res.status(200).json({
				success: true,
				data: todos,
			});
			await client.set('todosCached', todos, 'EX', 10);
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err,
		});
	}
});

const create = (req, res) => {
	Todo.create(req.body, (err, todo) => {
		if (err) {
			res.json({
				success: false,
				message: err,
			});
		}
		res.json({
			success: true,
			message: 'Todo created!',
			todo: todo,
		});
	});
};

const findById = (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);
		const todoCached = await client.get('todo');

		if (todoCached) {
			res.status(200).json({
				success: true,
				data: todoCached,
			});
		} else {
			res.status(200).json({
				success: true,
				data: todo,
			});
			await client.set('todoCached', todo, 'EX', 10);
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err,
		});
	}
};

const update = (req, res) => {
	Todo.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
		if (err) {
			res.json({
				success: false,
				message: err,
			});
		}
		res.json({
			success: true,
			message: 'Todo updated!',
		});
	});
};

const remove = (req, res) => {
	Todo.findByIdAndDelete(req.params.id, (err, todo) => {
		if (err) {
			res.json({
				success: false,
				message: err,
			});
		}
		res.json({
			success: true,
			message: 'Todo deleted!',
		});
	});
};

module.exports = {
	getAll,
	create,
	findById,
	update,
	remove,
};
