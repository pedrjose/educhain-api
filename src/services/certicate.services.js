import Institution from "../database/models/institutional.model.js";

export async function emitCertificateService(
    institutionId,
    studentName,
    studentEmail,
    courseName
  ) {

    if (!institutionId || !studentName || !courseName) {
      throw new Error(
        "Informe o ID da instituição, nome do estudante, e-mail e nome do curso."
      );
    }

    const institution = await Institution.findById(institutionId);
    if (!institution) {
      throw new Error("Instituição não encontrada.");
    }

    const issuedAt = new Date();
    const blockchainHash = generateBlockchainHash(
      studentName,
      studentEmail,
      courseName,
      issuedAt
    );
  
    const newCertificate = {
      studentName,
      studentEmail,
      courseName,
      issuedAt,
      blockchainHash,
    };

    institution.certificates.push(newCertificate);
    await institution.save(); 
    
    return {
      message: "Certificado emitido com sucesso!",
      certificate: newCertificate,
    };
  }