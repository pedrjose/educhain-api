import mongoose from "mongoose";

const student = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  phoneNumber: {
    type: String,
    required: false,
    trim: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    }
  ],

  graduationDate: {
    type: Date,
    required: false, 
  },
  status: {
    type: String,
    enum: ["Matriculado", "Concluído", "Cancelado"],
    default: "Matriculado",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Studentschema = mongoose.model("Student", student);

export default Studentschema;
