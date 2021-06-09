const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

app.use(bodyParser());
app.use(cors());
app.get('/', (req, res) => {
	res.send('wey gud!');
});

app.get('/videos', async (req, res) => {
	const files = fs.readdirSync(path.join(__dirname, 'public/videos'));
	console.log(files);
	res.json(files);
});

app.post('/delete', async (req, res) => {
	const { name } = req.body;
	const filePath = path.join(__dirname, 'public/videos/' + name);
	const isFileThere = fs.existsSync(filePath);
	if (isFileThere) {
		fs.unlinkSync(filePath);
	}

	const files = fs.readdirSync(path.join(__dirname, 'public/videos'));
	console.log(files);
	res.json(files);
});

app.post('/upload', async (req, res) => {
	res.send(200);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
