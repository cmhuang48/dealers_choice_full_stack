const express = require('express');
const app = express();
const path = require('path');
const { Orchestra, Musician, syncAndSeed } = require('./db/db.js');

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../index.html')));

app.get('/api/orchestras', async (req, res, next) => {
  try {
    res.send(await Orchestra.findAll({
      include: [
        Musician
      ]
    }));
  }
  catch(ex) {
    next(ex);
  }
});

app.get('/api/musicians', async (req, res, next) => {
  try {
    res.send(await Musician.findAll());
  }
  catch(ex) {
    next(ex);
  }
});

app.post('/api/musicians', async (req, res, next) => {
  try {
    res.status(201).send(await Musician.create(req.body));
  }
  catch(ex) {
    next(ex);
  }
});

app.delete('/api/musicians/:id', async (req, res, next) => {
  try {
    const musician = await Musician.findByPk(req.params.id);
    await musician.destroy();
    res.sendStatus(204);
  }
  catch(ex) {
    next(ex);
  }
});

app.put('/api/musicians/:id', async (req, res, next) => {
  try {
    const musician = await Musician.findByPk(req.params.id);
    res.send(await musician.update(req.body));
  }
  catch(ex) {
    next(ex);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex) {
    console.log(ex);
  }
};

init();