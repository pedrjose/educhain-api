import mongoose from "mongoose";

const diplomaschema = new mongoose.Schema({
    
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", 
  },
  course: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", 
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EducationalInstitution", 
  },
  issuedDate: {
    type: Date,
    default: Date.now,
  },
  diplomaNumber: {
    type: String,
    unique: true, 
    required: true,
  },
  diplomaType: {
    type: String,
    enum: ['Bacharelado', 'Mestrado', 'Doutorado', 'Certificado'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Emitido', 'Revogado'],
    default: 'Emitido',
  },
  validUntil: {
    type: Date,
  },
});

const Diploma = mongoose.model("Diploma", diplomaschema);

export default Diploma;
