import { DataTypes } from "sequelize";
import db from "../db/db.js";

// Definindo o modelo Transacao
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
        type: DataTypes.ENUM("despesa", "receita"),
        allowNull: false
    },
    pessoaId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'pessoas', // Especifica diretamente a tabela associada
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
    }
}, { timestamps: true });

// Definir a associação após ambos os modelos estarem definidos
Transacao.associate = (models) => {
    Transacao.belongsTo(models.Pessoa, {
        foreignKey: 'pessoaId',
        onDelete: 'RESTRICT'
    });
};

export default Transacao;
