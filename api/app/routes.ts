import log4js, {Logger} from "log4js";
import dotenv from "dotenv";
import {Sequelize} from "sequelize";
import {Express} from "express";
import Note from "./modules/note";

const log: Logger = log4js.getLogger("routes");

dotenv.config();

const DB_URI = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}/${process.env.MYSQL_DATABASE}`;
const sequelize = new Sequelize(DB_URI);

export default {
    configure: async (app: Express): Promise<void> => {

        sequelize.authenticate().catch((err) => {
            log.fatal(`Failed to connect to DB_URI - ${DB_URI}`, err);
        });

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
