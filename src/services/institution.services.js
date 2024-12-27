import bcrypt from "bcrypt";

import Institutional from "../database/models/institutional.model.js";

export async function registerInstitutionService(
  institutionName,
  cnpj,
  headquarters,
  phone,
  password
) {
  if (!institutionName || !password)
    throw new Error(
      "Submeta os campos nome da instituição e senha para cadastro!"
    );

  if (!cnpj || !headquarters || !phone)
    throw new Error(
      "Sobmeta o CNPJ, localização da sede e telefone para cadastro!"
    );

  const institutional = new Institutional(cnpj, headquarters, phone);

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    const instituion = {
      institutionName,
      institutional,
      password: hash,
    };

    await registerInstitutionRepository(instituion);
  });

  return {
    message: "Bem-vindo à EduChain. Seu cadastro foi realizado com sucesso!",
  };
}
