import { Router } from "express";
const router = Router();

import {
  registerInstitutionController,
  authInstitutionController,
  emitCertificateController
} from "../controllers/institution.controllers.js";

router.post("/register-institution", registerInstitutionController);
router.post("/auth-institution", authInstitutionController);
router.post("/emit-certificate", emitCertificateController);

export default router;
