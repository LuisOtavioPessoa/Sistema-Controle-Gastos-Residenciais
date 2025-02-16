import { useState, useEffect } from "react";
import { saveDataTransacoes } from "../Service/api";
import ListaTransacao from "./ListaTransacao";
import { findTransacaoId, findPessoaId } from "../Service/api";
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
  const [transacoes, setTransacoes] = useState([]);  // Definindo o estado para transações
  const [idade, setIdade] = useState<number | null>(null); // Estado para armazenar a idade da pessoa

  // Função para recarregar as transações após cadastrar uma nova
  const recarregarTransacoes = async () => {
    try {
      const response = await findTransacaoId(pessoaId);
      setTransacoes(response);  // Atualiza a lista de transações
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  // Função para buscar a idade da pessoa
  useEffect(() => {
    async function carregarPessoa() {
      try {
        const pessoa = await findPessoaId(pessoaId);
        if (pessoa) {
          setIdade(pessoa.idade); // Armazenar a idade da pessoa
        }
      } catch (error) {
        console.error("Erro ao buscar dados da pessoa:", error);
      }
    }

    carregarPessoa();
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
      recarregarTransacoes();  // Recarrega as transações após cadastro
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
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} disabled={idade !== null && idade < 18}>
            <option value="despesa">Despesa</option>
            {idade !== null && idade >= 18 && <option value="receita">Receita</option>}
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

      {/* Passando transacoes e setTransacoes para ListaTransacao */}
      <ListaTransacao 
        pessoaNome={pessoaNome} 
        pessoaId={pessoaId} 
        transacoes={transacoes} 
        setTransacoes={setTransacoes}  // Agora ListaTransacao tem acesso ao estado transacoes
      />
    </div>
  );
}

export default FormTransacao;
