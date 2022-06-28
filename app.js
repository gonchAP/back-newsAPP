const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const newsRouter = require('./routes/newsRouter');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/usersRouter');

const app = express();
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload({}));
app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/news', newsRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(5000, () => {
  console.log('Server listens port :5000');
});

module.exports = app;
