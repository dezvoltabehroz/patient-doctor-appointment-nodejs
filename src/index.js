'use strict'

// Getting dependencies
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Middlewares
const { response, errorHandler } = require('./middlewares');

// Creating express app
const app = express();

// HTTP header Security
var helmet = require('helmet');
app.use(helmet());

// secure your various HTTP headers
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
// app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

// Body parser Configurations
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));

// Getting dependency
const dotenv = require('dotenv');
dotenv.config();

// using middlewares
app.use(response);
app.use(cors());
app.use(bodyParser.json());

// Getting all routes
const {
    indexRoutes,
    userRouter,
    authRouter,

    // Old Routes
    doctorRouter,
    sessionRouter,
    drugTypeRouter,
    drugModeRouter,
    drugRouter,
    prescriptionRouter,
    PatientAssignmentRouter,
    translationRouter,
    fileUploadRouter
} = require('./routes');

// Routes
app.use('/', indexRoutes);
app.use('/api/file', fileUploadRouter);
app.use('/api/auth', authRouter);

// Old Routes
app.use('/api/user', userRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/session', sessionRouter);
app.use('/api/drugType', drugTypeRouter);
app.use('/api/drugMode', drugModeRouter);
app.use('/api/drug', drugRouter);
app.use('/api/prescription', prescriptionRouter);
app.use('/api/assign', PatientAssignmentRouter);
app.use('/api/translation', translationRouter);

// catch 404 and forward to error handler
app.use((req, res) => { return res.reply({ statusCode: 404 }) });
app.use(errorHandler);

app.use(function (err, req, res, next) {
    console.log("====================== Error Before App Crashed ======================")
    console.log(err)
    console.log(err.status)
});

// Mongo DB Connection
const { DB_SERVER_URL, DB_SERVER_PORT, DB_NAME } = process.env
const dbConnectionString = DB_SERVER_URL + ':' + DB_SERVER_PORT + '/' + DB_NAME;
mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connected successfully');
});


module.exports = app;