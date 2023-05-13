const mongoose = require("mongoose");

const userTaxApplicationSchema = new mongoose.Schema({
  formId: { type: String, required: true },
  totalIncome: { type: Number, required: true },
  totalExpenses: { type: Number, required: true },
  profit: { type: Number, required: true },
  class2: { type: Number, required: true },
  class4: { type: Number, required: true },
  incomeTax: { type: Number, required: true },
  totalTax: { type: Number, required: true },
  accountancyFee: { type: Number, required: true },
  totalTaxPaid: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  applicationStatus: { type: String, required: true },
  paymentIntent: { type: String, required: true },
  amendmementRequest: {
    requested: { type: Boolean, required: true, default: false },
    reason: { type: String, required: true },
  },
  dateSubmitted: { type: Date, required: true },
  firstName: { type: String },
  lastName: { type: String },
  userEmail: { type: String },
  dueForThisYear: { type: Number },
  paymentOnAccount: { type: Number },
  totalTaxDue: { type: Number },
  deliveryFiles: [
    {
      name: { type: String, required: true },
      key: { type: String, required: true },
    },
  ],
  userAttachedFiles: [
    {
      name: { type: String, required: true },
      key: { type: String, required: true },
    },
  ],
  finalDeliveryFiles: [
    {
      name: { type: String, required: true },
      key: { type: String, required: true },
    },
  ],
  ApprovedByUser: { type: Boolean, required: true, default: false },
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
  personalEmployment: [
    {
      pe: { type: Number, required: true },
      totalIncome: { type: Number, required: true },
      totalTaxDeducted: { type: Number, required: true },
    },
  ],
  anyOtherEmployment: [
    {
      aoi: { type: Number, required: true },
      name: { type: String, required: true },
      typeOfWork: { type: String, required: true },
      income: { type: Number, required: true },
      taxDeducted: { type: Number, required: true },
    },
  ],
  personalInformation: [
    {
      pi: { type: Number, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      surName: { type: String, required: true },
      dateOfBirth: { type: String, required: true },
      uTrNumber: { type: Number, required: true },
      nInumber: { type: String, required: true },
      currentAddress: {
        addressLine1: { type: String },
        addressLine2: { type: String },
        town: { type: String },
        postCode: { type: String },
        county: { type: String },
      },
      previousAddress: {
        addressLine1: { type: String },
        addressLine2: { type: String },
        town: { type: String },
        postCode: { type: String },
        county: { type: String },
      },
      postCode: { type: String, required: true },
      longCurrentResidency: { type: Boolean, required: true },
    },
  ],
});

module.exports =
  mongoose.models.UserTaxApplication ||
  mongoose.model("UserTaxApplication", userTaxApplicationSchema);
