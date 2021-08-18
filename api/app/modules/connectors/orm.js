import log4js from 'log4js'
import orm from 'orm'
import config from './../../../config'

const log = log4js.getLogger('connectors/orm')

export default () => {
    return new Promise((resolve, reject) => {
        return orm.connect(config.orm, function (err, db) {
            if (err) {
                reject(err)
            } else {
                resolve(db)
            }
        })
    })
}
