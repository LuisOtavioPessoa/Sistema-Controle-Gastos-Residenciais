import express from 'express';
import db from "./db/db.js";
import PessoaRouter from "./router/PessoaRouter.js";
import TransacaoRouter from "./router/TransacaoRouter.js";
import cors from 'cors';
import Pessoa from './model/Pessoa.js';
import Transacao from './model/Transacao.js';

const server = express();
const port = 5000;
server.use(cors());
server.use(express.json());
server.use(PessoaRouter);
server.use(TransacaoRouter);

// Definir as associações
Pessoa.associate({ Transacao });
Transacao.associate({ Pessoa });

db.sync().then(() => {
    server.listen(port, () => {
        console.log(`Server listen on port: ${port}`);
    });
});
