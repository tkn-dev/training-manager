/* eslint-disable no-console */
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'training_manager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/exercises/api', (req, res) => {
  pool.query('SELECT name FROM exercises;', (error, results) => {
    if (error) {
      console.log(error);
      res.status(400);
      res.json({ message: '取得に失敗しました。' });
    } else {
      res.status(200);
      res.json({
        message: '取得に成功しました。',
        result: results.map((result) => result.name),
      });
    }
  });
});

app.post('/exercises/api', (req, res) => {
  pool.query(
    `INSERT INTO exercises (name) VALUES ('${req.body.name}');`,
    (error) => {
      if (error) {
        console.log(error);
        res.status(400);
        res.json({ message: '登録に失敗しました。' });
      } else {
        res.status(201);
        res.json({ message: '登録に成功しました。' });
      }
    },
  );
});

app.delete('/exercise/api', (req, res) => {
  pool.query(
    `DELETE FROM exercises WHERE name = '${req.body.name}';`,
    (error) => {
      if (error) {
        console.log(error);
        res.status(400);
        res.json({ message: '削除に失敗しました。' });
      } else {
        res.status(201);
        res.json({ message: '削除に成功しました。' });
      }
    },
  );
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
