import { useEffect, useState } from "react";
import { Pessoa } from "../Types/Pessoa";
import { fetchPessoasData, deletePessoa, deleteTransacoesByPessoaId } from "../Service/api.ts";
import FormPessoas from "./FormPessoas.tsx";
import FormTransacao from "./FormTransacao.tsx";
import ListaTransacao from "./ListaTransacao.tsx"; // Certifique-se de importar ListaTransacao corretamente
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

  const handleDeletarPessoa = async (id: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta pessoa e todas as suas transações?");
    if (confirmDelete) {
      try {
        await deletePessoa(id);  // Deleta a pessoa
        await deleteTransacoesByPessoaId(id);  // Deleta as transações da pessoa
        recarregarPessoas();  // Recarrega a lista de pessoas após a exclusão
      } catch (error) {
        console.error("Erro ao deletar a pessoa ou as transações", error);
      }
    }
  };
  

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {isFormVisible && pessoaSelecionada ? (
        <FormTransacao pessoaId={pessoaSelecionada.id} pessoaNome={pessoaSelecionada.nome} onVoltar={handleVoltarParaLista} />
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
                  <button className="deletar-btn" onClick={() => handleDeletarPessoa(pessoa.id)}>
                  Deletar
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
