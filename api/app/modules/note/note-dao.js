import log4js from 'log4js'
import NoteSchema from './NoteSchema'

const log = log4js.getLogger('note-dao')

export default () => {
    return new Promise((resolve, reject) => {
        NoteSchema().then((Note) => resolve({

                create: (body) => {
                    return new Promise((resolve, reject) => {
                        return Note.create(body, (err, note) => {
                            if (err) reject(err)
                            else resolve(note)
                        })
                    })
                },

                list: () => {
                    return new Promise((resolve, reject) => {
                        return Note.find({}, {}, (err, res) => {
                            if(err) reject(err)
                            else resolve(res)
                        })
                    })
                }
            })
        )
    })
}
