import mongoose from "mongoose";

const courseschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  duration: {
    type: Number,
    required: true, 
  },
  creditHours: {
    type: Number,
    required: true, 
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EducationalInstitution", 
    required: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", 
  }],
  diplomasIssued: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Diploma", 
  }],
  courseType: {
    type: String,
    enum: ['Presencial', 'EAD', 'Híbrido'], 
    required: true,
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

const Course = mongoose.model("Course", courseschema);

export default Course;
