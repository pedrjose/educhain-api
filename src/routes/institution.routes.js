import { Router } from "express";
const router = Router();

import {
  registerInstitutionController,
  authInstitutionController,
  emitCertificateController,
  validateCertificateController,
} from "../controllers/institution.controllers.js";

router.post("/register-institution", registerInstitutionController);
router.post("/auth-institution", authInstitutionController);
router.post("/emit-certificate", emitCertificateController);
router.post("/validate-certificate", validateCertificateController);

export default router;
