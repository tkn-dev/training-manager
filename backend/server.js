/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const systemLogger = require('./log/systemLogger');
const log = require('./log/constants');
const exerciseRouter = require('./routes/exercise');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/exercises', exerciseRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  systemLogger.info(log.INF.SERVER_STARTED, port);
});
