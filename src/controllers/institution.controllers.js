import {
  registerInstitutionService,
  authInstitutionService,
  emitCertificateService,
} from "../services/institution.services.js";

export async function registerInstitutionController(req, res) {
  const { institutionName, cnpj, headquarters, phone, password } = req.body;

  try {
    const create = await registerInstitutionService(
      institutionName,
      cnpj,
      headquarters,
      phone,
      password
    );

    res.status(201).send(create);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function authInstitutionController(req, res) {
  const { cnpj, password } = req.body;

  try {
    const auth = await authInstitutionService(cnpj, password);

    res.status(201).send(auth);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function emitCertificateController(req, res) {
  const {
    courseProvider,
    courseName,
    courseDuration,
    teachingModality,
    name,
    cpf,
    startDate,
    graduationDate,
  } = req.body;

  try {
    const result = await emitCertificateService(
      courseProvider,
      courseName,
      courseDuration,
      teachingModality,
      name,
      cpf,
      startDate,
      graduationDate
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
