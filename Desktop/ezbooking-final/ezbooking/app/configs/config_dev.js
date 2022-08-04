var appConfig = {
    env: 'dev',
    port: 3000,
    baseUrl:'http://localhost:3000',
    prefix : '/ezbooking', // (/<project> or '')
    staticUrl: '',
    grid_limit : 20,
    white_list : [],
    csrf_ignore : [],// /<module>/<route>/<method>
    http_proxy: '',
    perm_default : ['view','add','edit','delete','export','import'],
    cors : [],
    redis : {
        host : '127.0.0.1',
        port : '6379',
        prefix : 'ezbooking',
        db: 0,
        options: {}
    },
    db : {
        host: 'cluster0.37hvk.mongodb.net',
        port: '27017',
        replicaset:'',
        name: 'ezbooking_db',
        username: 'root',
        password: 'fY6qAxgVESej7Ms'
    },
    secret : {
        session: 'RT#4234oqyw',
        password : 'RT#4234oqyw',
        memcache: 'ytewq43yw',
        token_name: '_csrf'
    },
    recaptcha : {
        'site_key':'6LdQD1kUAAAAACq2sw706h0o3NqCzCT5YVRGau6S',
        'secret_key':'6LdQD1kUAAAAAFHOHifLGwgz3LZ-x99lEsK1wfzT'
    },
    login : {
        captcha_enable : 5,
        incorrect : 10, //blocking after 10 times
        block_time : 600000 //10 minutes
    },
    file : {
        thumbnail_maximum : 1048576*2, //2MB
        thumbnail_mimetype : ['image/png','image/jpg','image/jpeg'],
        maximum_photo : 1048576*10 //10MB
    }
};
module.exports = appConfig;
