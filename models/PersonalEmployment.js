const mongoose = require("mongoose");

const personalEmploymentSchema = new mongoose.Schema({
  formId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  personalEmployment: [
    {
      pe: { type: Number, required: true },
      totalIncome: { type: Number, required: true },
      totalTaxDeducted: { type: Number, required: true },
    },
  ],
});

module.exports =
  mongoose.models.PersonalEmployment ||
  mongoose.model("PersonalEmployment", personalEmploymentSchema);
