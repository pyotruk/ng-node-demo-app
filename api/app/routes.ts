import Note from "./modules/note";
import {Express} from "express";
import sequelize from "./modules/sequelize";
import log4js, {Logger} from "log4js";

const log: Logger = log4js.getLogger("routes");

export default {
    configure: async (app: Express): Promise<void> => {

        // creates tables if don't exist, but doesn't drop any
        await sequelize.sync({force: false});

        app.post("/note", async (req, res) => {
            try {
                return res.json(await Note.create(req.body));
            } catch (err) {
                log.error("Failed to post a note.", err);
                return res.status(500).json(err);
            }
        });

        app.get("/notes", async (req, res) => {
            try {
                return res.json(await Note.findAll());
            } catch (err) {
                return res.status(500).json(err);
            }
        });
    },
};
