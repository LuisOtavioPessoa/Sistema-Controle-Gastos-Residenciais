export type Transacao = {
    id: number,
    descricao: string,
    valor: number,
    tipo: "despesa" | "receita",
    pessoaId: number,
};