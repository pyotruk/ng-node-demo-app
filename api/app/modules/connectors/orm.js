import dotenv from 'dotenv'
import log4js from 'log4js'
import orm from 'orm'

dotenv.config()
const log = log4js.getLogger('connectors/orm')

const DB_URI = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}/${process.env.MYSQL_DATABASE}`

export default () => {
    return new Promise((resolve, reject) => {
        return orm.connect(DB_URI, function (err, db) {
            if (err) {
                log.fatal(`Failed to connect to DB: ${DB_URI}`, err);
                reject(err)
            } else {
                log.info(`Successfully connected to DB: ${DB_URI}`);
                resolve(db)
            }
        })
    })
}
