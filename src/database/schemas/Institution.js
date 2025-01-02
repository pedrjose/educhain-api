import mongoose from "mongoose";

const InstitutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  institutional: {
    type: Object,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const Institution = mongoose.model("Institution", InstitutionSchema);

export default Institution;