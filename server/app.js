require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var profileRouter = require('./routes/profile');
var jobsRouter = require('./routes/jobs');
var postsRouter = require('./routes/posts');
var blockchainRouter = require('./routes/blockchain');
var aiRouter = require('./routes/ai');

var app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));

mongoose.connect("mongodb+srv://worktusharsinha01:2PdUz99X4HeyYE46@cluster1.rd6tq3q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error('MongoDB connection error:', err); process.exit(1); });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/jobs', jobsRouter);
app.use('/posts', postsRouter);
app.use('/blockchain', blockchainRouter);
app.use('/ai', aiRouter);

module.exports = app;
