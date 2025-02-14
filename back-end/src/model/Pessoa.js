import { DataTypes } from "sequelize";
import db from "../db/db.js";

export default db.define("pessoas",{
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {timestamps: false});