import mongoose from "mongoose";

const Educational_Institution = new mongoose.Schema({

    name:{
        type: String, 
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
      },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true, match: /^[0-9]{5}-?[0-9]{3}$/ },
        country: { type: String, required: true },
      },
      contact: {
        email: { type: String, required: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
        phone: { type: String, required: true, match: /^\+?[1-9]\d{1,14}$/ },
      },
      establishedYear: {
        type: Number,
        required: true,
      },
      studentCount: {
        type: Number,
        default: 0,
      },
      facultyCount: {
        type: Number,
        default: 0,
      },
      diplomas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diploma", // Referência ao modelo de diploma
      }],
      isActive: {
        type: Boolean,
        default: true,
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
    
    const EducationalInstitution = mongoose.model("EducationalInstitution", Educational_Institution);
    
    export default EducationalInstitution;