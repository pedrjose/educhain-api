import { emitCertificateService } from "../services/certificate.service.js";

export async function emitCertificateController(req, res) {
  const { institutionId, studentName, studentEmail, courseName } = req.body;

  try {
    const result = await emitCertificateService(
      institutionId,
      studentName,
      studentEmail,
      courseName
    );
    res.status(201).json(result); 
  } catch (error) {
    res.status(500).send(error.message); 
  }
}
