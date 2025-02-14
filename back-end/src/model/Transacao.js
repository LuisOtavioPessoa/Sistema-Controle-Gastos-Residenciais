import { DataTypes } from "sequelize";
import db from "../db/db.js";
import Pessoa from "./Pessoa.js"; 

const Transacao = db.define("transacoes", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false,
        validate: {
            min: 0 // Garante que o valor seja positivo
        }
    },
    tipo: {
        type: DataTypes.ENUM("despesa", "receita"), // Garante apenas esses dois valores
        allowNull: false
    },
    pessoaId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Pessoa, // Referencia a tabela de pessoas
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
    }
}, { timestamps: false });

export default Transacao;
