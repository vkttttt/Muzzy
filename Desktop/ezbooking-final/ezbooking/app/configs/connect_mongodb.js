var mongoose = require('mongoose');
const { MongoClient } =  require("mongodb");
//connect mongoDB

var connectionString = `mongodb://${appConfig.db.username}:${appConfig.db.password}@${appConfig.db.host}:${appConfig.db.port}/${appConfig.db.name}`;
if(appConfig.db.replicaset){
    connectionString = `mongodb://${appConfig.db.username}:${appConfig.db.password}@${appConfig.db.replicaset}/${appConfig.db.name}`;
}

connectionString = `mongodb+srv://${appConfig.db.username}:${appConfig.db.password}@cluster0.37hvk.mongodb.net/${appConfig.db.name}?retryWrites=true&w=majority`

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    //reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    keepAlive: true,
    //reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};
mongoose.connect(encodeURI(connectionString), options).then(res => {
    console.log("Connected to MongoDB");
}).catch(err => { // if error we will be here
    console.error('Connect database failed with error:', err.stack);
    process.exit(1);
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
//mongoose.set("debug", true);
process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    mongoose.disconnect();
    process.exit();
})

const client = new MongoClient(connectionString);
module.exports = { mongoose, client }
