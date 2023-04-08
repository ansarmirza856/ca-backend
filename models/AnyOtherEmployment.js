const mongoose = require("mongoose");

const anyOtherEmploymentSchema = new mongoose.Schema({
  formId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  anyOtherEmployment: [
    {
      aoi: { type: Number, required: true },
      name: { type: String, required: true },
      typeOfWork: { type: String, required: true },
      income: { type: Number, required: true },
      taxDeducted: { type: Number, required: true },
    },
  ],
});

module.exports =
  mongoose.models.AnyOtherEmployment ||
  mongoose.model("AnyOtherEmployment", anyOtherEmploymentSchema);
