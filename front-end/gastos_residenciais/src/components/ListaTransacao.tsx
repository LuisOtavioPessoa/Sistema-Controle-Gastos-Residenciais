import { useEffect, useState } from "react";
import { Transacao } from "../Types/Transacao";
import { findTransacaoId } from "../Service/api.ts";
import "./ListaTransacao.css"

type ListaTransacaoProps = {
  pessoaId: number;
};

export function ListaTransacao({ pessoaId }: ListaTransacaoProps) {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    console.log("pessoaId recebido:", pessoaId); // Debug: verifique se está vindo corretamente
  
    async function carregarTransacoes() {
      if (!pessoaId) {
        console.warn("pessoaId está indefinido ou nulo, abortando requisição.");
        return <p>Carregando...</p>;
      }
  
      try {
        const dados = await findTransacaoId(pessoaId);
        setTransacoes(dados);
      } catch (erro) {
        setError("Erro ao carregar transações.");
      } finally {
        setLoading(false);
      }
    }
  
    carregarTransacoes();
  }, [pessoaId]);
  
  

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (transacoes.length === 0) return <p>Nenhuma transação encontrada.</p>;

  return (
<div>
  <h2 className="titulo-lista-transacoes">Lista de Transações</h2>
  <div className="lista-transacoes">
    {transacoes && transacoes.length > 0 ? ( // Verifica se há transações antes de renderizar
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
