import Institution from "../database/schemas/Institution.js";

export const registerInstitutionRepository = (instituion) =>
  Institution.create(instituion);

export const findInstitutionByCnpjRepository = (cnpj) =>
  Institution.findOne({ "institutional.cnpj": cnpj });
