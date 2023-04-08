const mongoose = require("mongoose");

const selfEmploymentSchema = new mongoose.Schema({
  formId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  selfEmployment: [
    {
      se: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      income: {
        type: Number,
        required: true,
      },
      grants: {
        type: Number,
        required: true,
      },
      fuel: {
        type: Number,
        required: true,
      },
      repair: {
        type: Number,
        required: true,
      },
      mot: {
        type: Number,
        required: true,
      },
      roadtax: {
        type: Number,
        required: true,
      },
      cleaning: {
        type: Number,
        required: true,
      },
      agencyCommission: {
        type: Number,
        required: true,
      },
      licensingCost: {
        type: Number,
        required: true,
      },
      telephone: {
        type: Number,
        required: true,
      },
      insurance: {
        type: Number,
        required: true,
      },
      breakdownAssistance: {
        type: Number,
        required: true,
      },
      iobl: {
        type: Number,
        required: true,
      },
      other: {
        type: Number,
        required: true,
      },
      accountacy: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports =
  mongoose.models.SelfEmployment ||
  mongoose.model("SelfEmployment", selfEmploymentSchema);
