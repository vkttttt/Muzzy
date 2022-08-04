var appConfig = {
	env:'pro',
	port: 9,
	baseUrl:'',
	prefix : '', // '/projectname' or ''
	staticUrl: '',
	grid_limit : 10,
	whitelist : [],
	csrf_ignore : [''],// /<module>/<route>/method
	http_proxy: '',
	perm_default : ['view','add','edit','delete','export','import'],
	cors : {
		whitelist : []
	},
	redis : {
		host : '10.30.46.20',
		port : '6379',
		prefix : 'ezbooking',
		db: 0,
		options: {}
	},
	db : {
		host: '10.30.46.20',
		port: '27017',
		replicaset:'',
		name: '',
		username: '',
		password: ''
	},
	secret : {
		session: '683a4bda6',
		password : '683a4bda6',
		memcache: '683a4bda6',
		token_name: ''
	},
	recaptcha : {
		site_key : '',
		secret_key : ''
	},
	login : {
		captcha_enable : 3,
		incorrect : 6, //blocking after 6 times
		block_time : 600000 //10 minutes
	},
	file : {
		thumbnail_maximum : 1048576*5, //2MB
		thumbnail_mimetype : ['image/png','image/jpg','image/jpeg'],
		maximum_photo : 1048576*10 //5MB
	}
};
module.exports = appConfig;
