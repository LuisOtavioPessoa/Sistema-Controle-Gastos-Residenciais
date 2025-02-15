import { useEffect, useState } from "react";
import { Pessoa } from "../Types/Pessoa";
import { fetchPessoasData } from "../Service/api.ts";
import FormPessoas from "./FormPessoas";
import "./ListaPessoas.css";

export function ListaPessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []); // Carrega a lista apenas uma vez quando o componente for montado

  // Função para recarregar a lista de pessoas
  const recarregarPessoas = async () => {
    const dados = await fetchPessoasData(); // Recarrega os dados das pessoas
    setPessoas(dados); // Atualiza o estado com a lista mais recente
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
    <FormPessoas recarregarPessoas={recarregarPessoas} />
    <h2 className="titulo-lista-pessoas">Lista de Pessoas</h2>
    <div className="lista-pessoas">
        <ul>
            {pessoas.map((pessoa) => (
                <li key={pessoa.id} className="pessoa-item">
                    <span>{pessoa.nome} - {pessoa.idade} anos</span>
                    <button className="transacoes-btn">Transações</button>
                </li>
            ))}
        </ul>
    </div>
</div>

  );
}

export default ListaPessoas;
