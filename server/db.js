
const {MongoClient} = require('mongodb')
require('dotenv').config()

let dbConnection

module.exports = {
    dbConnect: (cb) => {
        MongoClient.connect(process.env.MONGO_DB_URI)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(error => {
            return cb(error)
        })
    },
    getDb: () => {
        return dbConnection
    }
}



