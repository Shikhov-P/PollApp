const MONGO_USERNAME = '';
const MONGO_PASSWORD = '';
const MONGO_HOSTNAME = '';
const MONGO_PORT = '';
const MONGO_DB = '';

module.exports = {
    mongoURI: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`,
    pusherAppId: '',
    pusherKey: '',
    pusherSecret: '',
    pusherCluster: '',
    pusherEncrypted: true
};
