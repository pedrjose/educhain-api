import { Router } from "express";
import { emitCertificateController } from "../controllers/certificate.controller.js";

const router = Router();

router.post("/emit-certificate", emitCertificateController);

export default router;
