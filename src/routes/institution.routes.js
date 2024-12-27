import { Router } from "express";
const router = Router();

router.post("/register-institution", registerInstitutionController);

export default router;
