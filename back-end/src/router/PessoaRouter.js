import { Router } from "express";
import PessoaController from "../controller/PessoaController.js";

const router = Router();

router.get("/pessoas", PessoaController.findAll);
router.post("/pessoas", PessoaController.criar);
router.get("/pessoas/:id", PessoaController.findById);
router.delete("/pessoas/:id", PessoaController.deletar);

export default router;