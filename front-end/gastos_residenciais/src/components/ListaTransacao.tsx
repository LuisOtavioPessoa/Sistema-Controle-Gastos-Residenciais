import { useEffect, useState } from "react";
import { Transacao } from "../Types/Transacao";
import { findTransacaoId } from "../Service/api.ts";
import "./ListaTransacao.css";

type ListaTransacaoProps = {
  pessoaNome: string;
  pessoaId: number;
  transacoes: Transacao[]; // Agora recebendo transações como prop
  setTransacoes: React.Dispatch<React.SetStateAction<Transacao[]>>; // Função para atualizar as transações
};

export function ListaTransacao({ pessoaNome, pessoaId, transacoes, setTransacoes }: ListaTransacaoProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pessoaId) {
      setError("Erro: pessoa não selecionada.");
      setLoading(false);
      return;
    }

    async function carregarTransacoes() {
      try {
        const dados = await findTransacaoId(pessoaId);
        setTransacoes(dados); // Atualiza as transações diretamente
      } catch (erro) {
        setError("Erro ao carregar transações.");
      } finally {
        setLoading(false);
      }
    }

    carregarTransacoes();
  }, [pessoaId, setTransacoes]); // Adiciona setTransacoes como dependência

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (transacoes.length === 0) return <p>Nenhuma transação encontrada.</p>;

  return (
    <div>
      <h2 className="titulo-lista-transacoes">Lista de Transações do(a) {pessoaNome}</h2>
      <div className="lista-transacoes">
        {transacoes && transacoes.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Transação ID</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((transacao) => (
                <tr key={transacao.id} className="transacao-item">
                  <td>{transacao.id}</td>
                  <td>{transacao.descricao}</td>
                  <td>R$ {typeof transacao.valor === "number" ? transacao.valor.toFixed(2) : transacao.valor}</td>
                  <td>{transacao.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mensagem-vazia">Nenhuma transação encontrada.</p>
        )}
      </div>
    </div>
  );
}

export default ListaTransacao;
