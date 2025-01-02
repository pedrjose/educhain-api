import bcrypt from "bcrypt";

import Institutional from "../database/models/institutional.model.js";
import { comparePasswords } from "../helpers/institution.helpers.js";
import {
  registerCertificate,
  getTransactionParams,
} from "../contracts/certificate.contract.js";

import {
  registerInstitutionRepository,
  findInstitutionByCnpjRepository,
} from "../repositories/institution.repository.js";

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

  const hashPassword = await bcrypt.hash(password, 10);

  const instituion = {
    name: institutionName,
    institutional,
    password: hashPassword,
  };

  await registerInstitutionRepository(instituion);

  return {
    message: "Bem-vindo à EduChain. Seu cadastro foi realizado com sucesso!",
  };
}

export async function authInstitutionService(cnpj, password) {
  if (!cnpj || !password)
    throw new Error("Informe CNPJ e senha da instituição para autenticação!");

  const find = await findInstitutionByCnpjRepository(cnpj);

  if (!find) throw new Error("O CNPJ informado não está cadastrado!");

  const verifyPassword = await comparePasswords(password, find.password);

  if (!verifyPassword)
    throw new Error("O CNPJ ou senha estão incorretos. Tente novamente!");

  return {
    authenticationStatus: true,
    message: "Autenticação realizada com sucesso!",
  };
}

export async function emitCertificateService(
  courseProvider,
  courseName,
  courseDuration,
  teachingModality,
  name,
  cpf,
  startDate,
  graduationDate
) {
  // Verifica se a instituição está cadastrada
  if (!courseProvider)
    throw new Error("Informe qual instituição está emitindo este certificado!");

  const institution = await findInstitutionByCnpjRepository(courseProvider);

  if (!institution) {
    throw new Error(
      "Instituição não encontrada: não é possível emitir certificado!"
    );
  }

  // Verificação e criação da model de curso
  if (!courseProvider || !courseName || !courseDuration || !teachingModality) {
    throw new Error("Informe os dados do curso para emitir o certificado!");
  }

  const course = {
    courseProvider,
    courseName,
    courseDuration,
    teachingModality,
  };

  // Verificação e criação da model do estudante
  if (!name || !cpf || !startDate || !graduationDate)
    throw new Error(
      "Informe os dados referentes ao estudante para emissão de certificado!"
    );

  const student = { name, cpf, startDate, graduationDate };

  // Emissão do certificado
  const certificate = { course, student };

  // Integração com contrato inteligente
  const hashSign = await registerCertificate(certificate);

  console.log(hashSign);

  return {
    message: "Certificado emitido com sucesso!",
    certificateHash: hashSign,
  };
}

export async function validateCertificateService(transactionHash) {
  if (!transactionHash)
    throw new Error("Não é possível validar seu certificado. Informe a hash!");

  const validate = await getTransactionParams(transactionHash);

  return { message: "Certificado é válido!", validate, promise: true };
}
