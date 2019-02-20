const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const resultsRouter = require('./routes/results');
const paramsRouter = require('./routes/params');

const app = express();

app.disable('etag');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/results', resultsRouter);
app.use('/params', paramsRouter);

module.exports = app;
