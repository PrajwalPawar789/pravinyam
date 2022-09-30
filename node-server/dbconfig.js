const fs = require("fs");

//TODO: add const for schema -> pravinyam

const dbconfig = {
    user: 'doadmin',
    host: 'iotsys-postgres-do-user-9198634-0.b.db.ondigitalocean.com',
    database: 'defaultdb',
    password: 'wh8t9lf3szz6y0k1',
    port: 25060,
    _connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
    ssl  : {
        ca : fs.readFileSync( __dirname +'/ca-certificate.crt')
    }
}

module.exports = dbconfig;