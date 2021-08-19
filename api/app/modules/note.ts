import sequelize from './sequelize'
import {DataTypes, Model} from "sequelize";

class Note extends Model {
    public id!: number;
    public text!: string;
}

Note.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: "notes",
        sequelize,
    }
);

export default Note;
