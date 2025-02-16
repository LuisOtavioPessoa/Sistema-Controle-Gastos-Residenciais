import { DataTypes } from "sequelize";
import db from "../db/db.js";

// Definindo o modelo Pessoa
const Pessoa = db.define("pessoas", {
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
}, { timestamps: true });

// Definir a associação após ambos os modelos estarem definidos
Pessoa.associate = (models) => {
    Pessoa.hasMany(models.Transacao, {
        foreignKey: 'pessoaId',
        onDelete: 'CASCADE'
    });
};

export default Pessoa;
