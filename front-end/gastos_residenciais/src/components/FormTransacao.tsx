import { useState, useEffect } from "react";
import { saveDataTransacoes } from "../Service/api";
import ListaTransacao from "./ListaTransacao";
import { findTransacaoId } from "../Service/api"; // Criar essa função se ainda não existir
import "./FormTransacao.css";

interface FormTransacaoProps {
  pessoaId: number;
  pessoaNome: string;
}

export function FormTransacao({ pessoaId, pessoaNome }: FormTransacaoProps) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("despesa");
  const [mensagem, setMensagem] = useState("");
  const [transacoes, setTransacoes] = useState<any[]>([]); // Estado para armazenar as transações

  // Função para buscar as transações da pessoa específica
  async function fetchTransacoes() {
    try {
      const response = await findTransacaoId(pessoaId);
      setTransacoes(response); // Atualiza a lista de transações
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  }

  useEffect(() => {
    if(pessoaId) {
      fetchTransacoes();
    }
  }, [pessoaId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!descricao || !valor) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    const transacao = { descricao, valor: Number(valor), tipo, pessoaId };

    try {
      await saveDataTransacoes(transacao);
      setDescricao("");
      setValor("");
      setMensagem("Transação cadastrada com sucesso!");
      fetchTransacoes(); // Atualiza a lista após inserir nova transação
    } catch (error) {
      setMensagem("Erro ao cadastrar transação. Tente novamente.");
    }
  }

  function handleLimparCampos() {
    setDescricao("");
    setValor("");
    setTipo("despesa");
    setMensagem("");
  }

  return (
    <div className="form-transacao">
      <h2 className="titulo-form-transacao">
        Cadastro das Transações do(a) {pessoaNome}
      </h2>

      <form onSubmit={handleSubmit}>
        <label>
          Descrição:
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>

        <label>
          Valor:
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </label>

        <label>
          Tipo:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
          </select>
        </label>

        <div className="botoes-container">
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={handleLimparCampos} className="botao-limpar">
            Limpar
          </button>
        </div>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      {/* Exibindo a lista de transações junto com o formulário */}
      <ListaTransacao pessoaId={pessoaId} />
    </div>
  );
}

export default FormTransacao;
