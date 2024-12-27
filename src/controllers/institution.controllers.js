import { registerInstitutionService } from "../services/institution.services";

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

