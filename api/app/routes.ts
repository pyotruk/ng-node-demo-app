import Note from './modules/note'
import {Express} from "express";
import sequelize from "./modules/sequelize";

export default {
    configure: async (app: Express) => {

        // synchronizes current DB with all the models
        await sequelize.sync({ force: true });

        app.post('/note', async (req, res) => {
            try {
                return res.json(await Note.create(req.body))
            } catch (err) {
                return res.status(500).json(err)
            }
        })

        app.get('/notes', async (req, res) => {
            try {
                return res.json(await Note.findAll())
            } catch (err) {
                return res.status(500).json(err)
            }
        })
    }
}
