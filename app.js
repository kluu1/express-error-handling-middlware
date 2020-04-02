const express = require('express');
const bodyParser = require('body-parser');
const handleErrors = require('./middleware/handleErrors');
const { BadRequest } = require('./utils/errors');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/post', async (req, res, next) => {
  const { title, author } = req.body;

  if (!title || !author) {
    throw new BadRequest('Missing required fields: title or author');
  }

  try {
    const post = await db.post.insert({ title, author });
    res.json(post);
  } catch (err) {
    next(err)
  }
});

app.use(handleErrors);

app.listen(port, () =>
  console.log(`app is listening at http://localhost:${port}`)
);
