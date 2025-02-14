import PessoaModel from '../model/Pessoa.js'
import TransacaoModel from "../model/Transacao.js";

//ENCONTRAR TODAS AS TRANSAÇÕES
export default class TransacaoController{
    static async findAll (request,response){
        try{
            const transacoes = await TransacaoModel.findAll({
                include: [
                    {
                        model: PessoaModel,
                        attributes: ["id", "nome", "idade"],
                    },
                ],
                order: [["createdAt", "DESC"]],
            });

            if (transacoes.length === 0) {
                return response.status(404).json({ message: "Nenhuma transação encontrada." });
            }

            response.status(200).json({transacoes});
        }catch(error){
            response.status(500).json({message: "Erro ao buscar transações", error: error.message});
        }
    }

    //MÉTODO CRIAR TRANSAÇÃO
    static async criar(request, response){
        const {descricao, valor, tipo, pessoaId} = request.body;

        if(!descricao || !valor || !tipo || !pessoaID){
            response.status(400).json({message: "Todos os campos devem ser preenchidos."});
            return;
        }

        if(isNaN(valor) || valor <= 0 ){
            response.status(400).json({message: "O valor deve ser um número decimal positivo."});
            return;
        }

        if(tipo !== "despesa" && tipo !== "receita"){
            response.status(400).json({ message: "O tipo deve ser 'despesa' ou 'receita'." });
            return;
        }

        const transacao = {
            descricao, valor, tipo, pessoaId
        };

        console.log("Recebendo os dados do formulário:", transacao);

        try{
            const pessoa = await PessoaModel.findByPk(pessoaId);
            if(!pessoa){
                response.status(404).json({ message: "Pessoa não encontrada." });
                return;
            }

            if(pessoa.idade < 18 && tipo === "receita"){
                response.status(403).json({ message: "Menores de 18 anos só podem registrar despesas." });
                return;
            }

            const TransacaoCriada = await TransacaoModel.create({descricao, valor, tipo, pessoaId });
            response.status(201).json({ transacao: TransacaoCriada });

        }catch(error){
            response.status(500).json({ message: "Erro ao criar a transação", error: error.message });
        }
    }
}


    
