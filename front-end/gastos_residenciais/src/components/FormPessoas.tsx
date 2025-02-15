import { useState } from "react";
import { saveDataPessoas } from "../Service/api.ts"; // Correção do import
import "./FormPessoas.css";

interface FormPessoasProps {
  recarregarPessoas: () => void; // Função para recarregar a lista
}

export function FormPessoas({ recarregarPessoas }: FormPessoasProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [mensagem, setMensagem] = useState(""); // Estado para mostrar mensagens de sucesso/erro

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nome || !idade) {
      alert("Preencha todos os campos!");
      return;
    }

    const pessoa = { nome, idade: Number(idade) };

    try {
      // Chama a função saveDataPessoas para salvar a pessoa no BD
      await saveDataPessoas(pessoa);

      // Após salvar, recarrega a lista de pessoas
      recarregarPessoas();
      setNome("");
      setIdade("");
      setMensagem("Pessoa cadastrada com sucesso!");
    } catch (error) {
      setMensagem("Erro ao cadastrar pessoa. Tente novamente.");
    }
  }

  return (
    <div>
      <h2 className="titulo-form-pessoas">Cadastro de Pessoas</h2>

      <form onSubmit={handleSubmit} className="form-pessoas">
        <label>Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label>Idade:
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
        </label>

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p>{mensagem}</p>} {/* Mensagem de sucesso ou erro */}
    </div>
  );
}

export default FormPessoas;
