import dotenv from "dotenv"
import {Sequelize} from "sequelize";
import log4js, {Logger} from "log4js";

dotenv.config()
const log: Logger = log4js.getLogger("server")

const DB_URI = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}/${process.env.MYSQL_DATABASE}`
const sequelize = new Sequelize(DB_URI)

sequelize.authenticate().catch((err) => {
    log.fatal(`Failed to connect to DB_URI - ${DB_URI}`, err);
});

export default sequelize;
