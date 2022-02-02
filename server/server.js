const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const apiRouter = require('./routers/apiRouter.js');
const authRouter = require('./routers/authRouter.js')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.use('/authentication', authRouter);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))
})

app.use('/', express.static(path.join(__dirname, '../dist')))

app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

app.use((req, res) => {
    console.log('Error: page not found')
    res.status(404).send('Error: page not found');
});

app.use((err, req, res, next) => {
  if (!err) err = {
    log: 'Express error handler caught unknown middleware',
    message: { err: 'An unknown error occurred'},
  };
  console.log(err);
  return res.status(500).json(err);
});


module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));