import axios from "axios";
import { Pessoa } from "../Types/Pessoa.ts";
import { Transacao } from "../Types/Transacao.ts";

// Base URL
const BASE_URL = "http://localhost:5000";

// FUNÇÃO PARA BUSCAR TODAS AS PESSOAS
export async function fetchPessoasData(): Promise<Pessoa[]> {
    try {
        const response = await axios.get(`${BASE_URL}/pessoas`);
        console.log(response.data);
        return response.data.pessoas; // Supondo que a API retorna um array diretamente
    } catch (error: any) {
        console.error(`Erro ao buscar dados das pessoas: ${error.message}`);
        return [];
    }
}

// FUNÇÃO PARA BUSCAR UMA PESSOA PELO ID ESPECÍFICO
export async function findPessoaId(id: number): Promise<Pessoa | null> {
    try {
        const response = await axios.get(`${BASE_URL}/pessoas/${id}`);
        console.log(`Pessoa com o Id ${id} encontrada:`, response.data);
        return response.data;
    } catch (error: any) {
        console.error(`Erro ao buscar a pessoa com Id ${id}: ${error.message}`);
        return null;
    }
}

// FUNÇÃO PARA CRIAR UMA NOVA PESSOA
export async function saveDataPessoas(data: Pessoa): Promise<void> {
    try {
        const payload = {
            nome: data.nome,
            idade: data.idade,
        };
        const response = await axios.post(`${BASE_URL}/pessoas`, payload);
        console.log("Pessoa salva com sucesso", response.data);
    } catch (error: any) {
        console.error(`Erro ao enviar os dados da pessoa: ${error.message}`);
    }
}

// FUNÇÃO PARA DELETAR UMA PESSOA
export async function deletePessoa(id: number): Promise<void> {
    try {
        const response = await axios.delete(`${BASE_URL}/pessoas/${id}`);
        console.log(`Pessoa deletada com sucesso:`, response.data);
    } catch (error: any) {
        console.error(`Erro ao deletar a pessoa com Id ${id}: ${error.message}`);
    }
}

// FUNÇÃO PARA BUSCAR TODAS AS TRANSAÇÕES
export async function fetchTransacaoData(): Promise<Transacao[]> {
    try {
        const response = await axios.get(`${BASE_URL}/transacoes`);
        console.log(response.data);
        return response.data.transacoes;
    } catch (error: any) {
        console.error(`Erro ao buscar dados das transações: ${error.message}`);
        return [];
    }
}

// FUNÇÃO PARA BUSCAR TRANSAÇÕES DE UMA PESSOA ESPECÍFICA
export async function findTransacaoId(pessoaId: number): Promise<Transacao[] | null> {
    try {
        const response = await axios.get(`${BASE_URL}/transacoes/pessoa/${pessoaId}`);
        console.log(`Transações da pessoa ${pessoaId} encontradas:`, response.data);
        return response.data;
    } catch (error: any) {
        console.error(`Erro ao buscar as transações da pessoa com Id ${pessoaId}: ${error.message}`);
        return null;
    }
}

// FUNÇÃO PARA CRIAR UMA NOVA TRANSAÇÃO
export async function saveDataTransacoes(data: Transacao): Promise<void> {
    try {
        const payload = {
            descricao: data.descricao,
            valor: data.valor,
            tipo: data.tipo,
            pessoaId: data.pessoaId,
        };
        const response = await axios.post(`${BASE_URL}/transacoes`, payload);
        console.log("Transação salva com sucesso", response.data);
    } catch (error: any) {
        console.error(`Erro ao enviar os dados da transação: ${error.message}`);
    }
}
