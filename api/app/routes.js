import log4js from 'log4js'
import NoteDAO from './modules/note/note-dao'

export default {
    configure: function (app) {

        const log = log4js.getLogger('routes')

        app.post('/note', (req, res) => {
            NoteDAO().then((Note) => {
                Note.create(req.body).then((note) => {
                    res.status(200).json({
                        ok: true,
                        result: note
                    })

                }).catch((err) => {
                    res.status(500).json(err)
                })
            })
        })

        app.get('/notes', (req, res) => {
            NoteDAO().then((Note) => {
                Note.list().then((list) => {
                    res.json(list)
                }).catch((err) => {
                    res.status(500).json(err)
                })
            })
        })
    }
}
