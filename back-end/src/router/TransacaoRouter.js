import { Router } from "express";
import TransacaoController from "../controller/TransacaoController.js";

const router = Router();

router.get("/transacoes", TransacaoController.findAll);
router.post("/transacoes", TransacaoController.criar);
router.get("/transacoes/pessoa/:pessoaId", TransacaoController.findByPessoa);

export default router;
