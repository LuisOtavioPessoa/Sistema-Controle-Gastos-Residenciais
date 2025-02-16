import { useState, useEffect } from "react";
import { saveDataTransacoes } from "../Service/api";
import ListaTransacao from "./ListaTransacao";
import { findTransacaoId } from "../Service/api";
import "./FormTransacao.css";

interface FormTransacaoProps {
  pessoaId: number;
  pessoaNome: string;
  onVoltar: () => void;  // Função para voltar à lista
}

export function FormTransacao({ pessoaId, pessoaNome, onVoltar }: FormTransacaoProps) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("despesa");
  const [mensagem, setMensagem] = useState("");
  const [transacoes, setTransacoes] = useState<any[]>([]);

  async function fetchTransacoes() {
    try {
      const response = await findTransacaoId(pessoaId);
      setTransacoes(response);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  }

  useEffect(() => {
    if (pessoaId) {
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
      fetchTransacoes();
    } catch (error) {
      setMensagem("Erro ao cadastrar transação. Tente novamente.");
    }
  }

  function handleVoltar() {
    onVoltar(); // Chama a função passada como prop para voltar à lista
  }

  return (
    <div className="form-transacao">
      <h2 className="titulo-form-transacao">Cadastro das Transações do(a) {pessoaNome}</h2>

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
          <button type="button" onClick={handleVoltar} className="botao-voltar">
            Voltar
          </button>
        </div>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      <ListaTransacao pessoaNome={pessoaNome}pessoaId={pessoaId} />
    </div>
  );
}

export default FormTransacao;
