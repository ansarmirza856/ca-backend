const mongoose = require("mongoose");

const personalInformationSchema = new mongoose.Schema({
  formId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  personalInformation: [
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      surName: { type: String, required: true },
      dateOfBirth: { type: String, required: true },
      uTrNumber: { type: Number, required: true },
      nInumber: { type: String, required: true },
      currenctAddress: { type: String, required: true },
      previousAddress: { type: String, required: true },
      postCode: { type: String, required: true },
      longCurrentResidency: { type: Boolean, required: true },
    },
  ],
});

module.exports =
  mongoose.models.PersonalInformation ||
  mongoose.model("PersonalInformation", personalInformationSchema);
