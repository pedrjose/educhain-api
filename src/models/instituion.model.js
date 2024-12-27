import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  courseName: { type: String, required: true },
  issuedAt: { type: Date, default: Date.now },
  blockchainHash: { type: String, required: true },
});

const InstitutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  headquarters: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  certificates: [CertificateSchema], 
});

export default mongoose.model("Institution", InstitutionSchema);