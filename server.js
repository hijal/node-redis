const express = require('express');
const connectDB = require('./config/db');

const indexRouter = require('./routes/index');

const app = express();
require('dotenv').config();

connectDB();

app.use(express.json({ extended: true }));

app.use(indexRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
