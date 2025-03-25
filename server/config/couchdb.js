const nano = require('nano');

const couch = nano(process.env.COUCHDB_URL);

const getDatabase = (dbName) => couch.use(dbName);

module.exports = { couch, getDatabase };