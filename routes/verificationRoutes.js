import express from "express";
import {mandarMensaje, verificarToken} from "../controllers/verificationController.js";
const router = express.Router();

 
router.post("/", mandarMensaje);
router.get("/", verificarToken)


export default router;