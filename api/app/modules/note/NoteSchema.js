import orm from '../connectors/orm'

export default () => {
    return new Promise((resolve, reject) => {
        return orm().then((db) => {

            const Note = db.define('note', {
                text: String,
            })

            return db.sync((err) => {
                if (err) reject(err)
                else resolve(Note)
            })
        })
    })
}
