import PessoaModel from '../model/Pessoa.js';
import TransacaoModel from '../model/Transacao.js';

//ENCONTRAR TODAS AS PESSOAS
export default class PessoaController{
    static async findAll(request, response){
    try{
        const pessoas = await PessoaModel.findAll();
        response.status(200).json({ pessoas }); 
    }catch(error){
        response.status(500).json({ message: "Erro ao buscar pessoas", error: error.message });
        }   
    }

    //MÉTODO CRIAR PESSOA
    static async criar(request, response){
        
        const {nome,idade} = request.body;

        if (!nome || !idade) {
            return response.status(400).json({ message: "Nome e idade são obrigatórios." });
        }

        if (isNaN(idade) || idade <= 0) {
            return response.status(400).json({ message: "Idade deve ser um número válido e maior que zero." });
        }
    
        const pessoa = {
            nome, idade
        };

        console.log("Recebendo os dados do formulário:", pessoa);

        try{
            const PessoaCriado = await PessoaModel.create(pessoa);
            response.status(201).json({pessoa: PessoaCriado});
        }catch(error){
            response.status(400).json({message: "Erro ao criar a pessoa", error: error.message});
        }
    }

    //MÉTODO DELETAR PESSOA
    static async deletar (request,response){
        
        const {id} = request.params;

        if(!id || isNaN(id)){
            return response.status(400).json({ message: "ID inválido."});
        }

        try{
            const PessoaEncontrada = await PessoaModel. findByPk(id);

            if(!PessoaEncontrada){
                response.status(404).json({message: "Pessoa não encontrada"});
                    return;
            }

            //DELETAR TODAS AS TRANSAÇÕES ASSOCIADAS À PESSOA
            await TransacaoModel.destroy({where: {pessoaId: id}});

            //DELETA A PESSOA DO BANCO DE DADOS
            await PessoaModel.destroy({where: {id: id}});

            response.status(200).json({message: "Pessoa deletada com sucesso."});
        }catch (error){
            response.status(500).json({message: "Erro ao deletar a pessoa."});
        }
    }

    //MÉTODO ENCONTRAR PESSOA POR ID
    static async findById(request, response){
        const {id} = request.params;

        if (!id || isNaN(id)) {
            return response.status(400).json({ message: "ID inválido." });
        }

        try{
            const pessoa = await PessoaModel.findByPk(id);

            if(!pessoa){
                response.status(404).json({message: "Pessoa não encontrada."});
                return;
            }

            response.status(200).json(pessoa);
        }catch (error){
            response.status(500).json({message: "Erro ao buscar a pessoa.", error});
        }
    }

}