var express = require('express');
const morgan = require('morgan');
var path = require('path');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var engine = require('ejs-locals');
var csrf = require('csurf');
var multipart = require('connect-multiparty');
const mongoose = require('mongoose');
const passport = require('passport');
const nodemailer =  require('nodemailer');

const { body } = require('express-validator');

const env = process.env.NODE_ENV == 'dev' ? 'dev' : 'pro'; //default

/*** Variable Global ***/
global.appConfig = require('./app/configs/config_' + env);
global._basepath = __dirname + '/';
global._baseUrl = appConfig.prefix == '' ? appConfig.baseUrl + '/' : appConfig.baseUrl + appConfig.prefix + '/';
global._staticUrl = appConfig.staticUrl ? appConfig.staticUrl + '/' : _baseUrl;
global._adminUrl = _baseUrl + 'admin';
var ttt = new Date();
global._versionCache = ttt.getTime();

//load all library and helpers
global.helpers = require('./app/helpers');
global.libs = require('./app/libs');

var app = express();
app.use(multipart());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var session_config = {
    secret: appConfig.secret.session,
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/',
        secure: false,
        maxAge: 3600000,
    }, //60 minutes
    store: new redisStore({ host: appConfig.redis.host, port: appConfig.redis.port, client: redis.createClient(appConfig.redis), ttl: 10800 }),
};

if (env == 'dev') {
    session_config.cookie.path = appConfig.prefix;
}

app.use(session(session_config));

// /*** Static setup ***/
var staticOptions = {
    maxAge: env === 'dev' ? 0 : '30d', //Cache to browser on pro,sta
    setHeaders: function (res, path, stat) {
        //ignore cache
        let ext = path.split('.').pop();
        if (['html', 'htm', 'xlsx', 'txt'].indexOf(ext) >= 0) {
            res.setHeader('Cache-Control', 'public, max-age=0');
        }
    },
};
app.use(appConfig.prefix + '/media', express.static('media', staticOptions));
app.use(appConfig.prefix + '/public', express.static('public', staticOptions));

// /*** View engine setup  ***/
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.set('view options', { root: _basepath + 'app/views' });

// //security
app.use(csrf());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(flash());

// //middleware token
app.use(function (req, res, next) {
    var token = req.csrfToken();
    res.cookie('CSRF-TOKEN', token);
    res.locals.csrftoken = token;
    next();
});

// //handle csrf error
app.use(function (err, req, res, next) {
    //Ignore csrf
    if (appConfig.csrf_ignore.indexOf(req.path) != -1) return next();
    return next(err);
});

var mdw = function (req, res, next) {
    res.locals.pageTitle = 'EZBOOKING';
	res.locals.pageKeywords = 'EZBOOKING';
	res.locals.pageDesc = 'EZBOOKING ';

	res.locals.ogTitle = 'EZBOOKING';
	res.locals.ogDesc =  'EZBOOKING';
	res.locals.ogImg = _staticUrl+'public/frontend/assets/images/thumbshare.jpg';
	res.locals.ogUrl = _baseUrl;

    //------------admin-------------------
	res.locals.admin_userdata = req.session.admin_userdata;
	res.locals.admin_menu = req.session.admin_menu;
	res.locals.adminUrl = _baseUrl+'admin/';
	res.locals.staticUrl = _staticUrl;
	res.locals.publicUrl = _staticUrl+'public/';
	res.locals.frontendUrl = _staticUrl+'public/frontend/';
	res.locals.mediaUrl = _staticUrl+'media/';
	res.locals.faviconUrl = (process.env.NODE_ENV == 'dev') ? _staticUrl+'public/ico/develop.ico' : _staticUrl+'public/frontend/assets/images/favicon.ico';
	res.locals.is_login = (req.session.user_info) ? 1 : 0;
	res.locals.is_update = (req.session.user_info) ? req.session.user_info.is_update : '';
	res.locals.user_fb_id = (req.session.user_info) ? req.session.user_info.fb_id : '';
	res.locals.user_avatar = (req.session.user_info) ? req.session.user_info.avatar : '';
	res.locals.user_fullname = (req.session.user_info) ? req.session.user_info.name : '';
	res.locals.c_router = '';
	res.locals.menu_layout = (req.session.menu_layout) ? req.session.menu_layout : 'top';
	res.locals.language = (req.session.language) ? req.session.language : 'vn';

    //------------ezbooking------------------
    res.locals.userdata = req.session.userdata;

    next();
};

// //Load all modules
var modules = require('./app/modules');
app.use('/', mdw, modules);

/*** Catch 404 and forward to error handler ***/
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/*** Error handler ***/
app.use(function (err, req, res, next) {
    if (err.code == 'EBADCSRFTOKEN') {
        return res.status(403).send('Forbidden');
    }

    //hidden err.stack on production
    if (env !== 'dev') {
        err.stack = null;
    }

    res.locals.error = err;
    return req.method == 'POST' ? res.status(200).send(err.message) : res.render('error');
});

/*** Launch ***/
/*
var port = process.env.PORT || appConfig.port;
app.listen(port);
console.log('Run on port ' + port);
*/

module.exports = app;
