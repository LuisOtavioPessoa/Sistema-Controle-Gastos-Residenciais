import { useEffect, useState } from "react";
import { Pessoa } from "../Types/Pessoa";
import { fetchPessoasData } from "../Service/api.ts";
import FormPessoas from "./FormPessoas.tsx";
import FormTransacao from "./FormTransacao.tsx";
import "./ListaPessoas.css";

export function ListaPessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [pessoaSelecionada, setPessoaSelecionada] = useState<Pessoa | null>(null);

  useEffect(() => {
    async function carregarPessoas() {
      try {
        const dados = await fetchPessoasData();
        setPessoas(dados);
      } catch (erro) {
        setError("Erro ao carregar pessoas.");
      } finally {
        setLoading(false);
      }
    }

    carregarPessoas();
  }, []);

  const recarregarPessoas = async () => {
    const dados = await fetchPessoasData();
    setPessoas(dados);
  };

  const handleAbrirTransacoes = (pessoa: Pessoa) => {
    setPessoaSelecionada(pessoa);
    setIsFormVisible(true);
  };

  const handleVoltarParaLista = () => {
    setPessoaSelecionada(null);
    setIsFormVisible(false);
    recarregarPessoas();
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {isFormVisible && pessoaSelecionada ? (
        <FormTransacao pessoaId={pessoaSelecionada.id} 
        pessoaNome={pessoaSelecionada.nome} />
      ) : (
        <>
          <FormPessoas recarregarPessoas={recarregarPessoas} />
          <h2 className="titulo-lista-pessoas">Lista de Pessoas</h2>
          <div className="lista-pessoas">
            <ul>
              {pessoas.map((pessoa) => (
                <li key={pessoa.id} className="pessoa-item">
                  <span>{pessoa.nome} - {pessoa.idade} anos</span>
                  <button className="transacoes-btn" onClick={() => handleAbrirTransacoes(pessoa)}>
                    Transações
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default ListaPessoas;
