import connectDB from "../../db";
import AnyOtherEmployment from "@/models/AnyOtherEmployment";
import UserTaxApplication from "@/models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    if (req.body === null) {
      return res.status(400).json({ error: "Payload should not be empty" });
    }

    try {
      const { formId } = req.body;

      const getEmploymentData = await UserTaxApplication.findOne({
        formId: req.body.formId,
      });

      const totalIncomeSe = getEmploymentData.selfEmployment
        .map((se) => {
          return se.income;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const totalGrantSe = getEmploymentData.selfEmployment
        .map((se) => {
          return se.grants;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const totalExpensesSe = getEmploymentData.selfEmployment
        .map((se) => {
          return (
            se.fuel +
            se.repair +
            se.mot +
            se.roadtax +
            se.cleaning +
            se.agencyCommission +
            se.licensingCost +
            se.telephone +
            se.insurance +
            se.breakdownAssistance +
            se.iobl +
            se.other +
            se.accountacy
          );
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const totalIncomePe = getEmploymentData.personalEmployment
        .map((pe) => {
          return pe.totalIncome;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const totalTaxDeductedPe = getEmploymentData.personalEmployment
        .map((pe) => {
          return pe.totalTaxDeducted;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const totalIncomeAoe = getEmploymentData.anyOtherEmployment
        .map((aoe) => {
          return aoe.income;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const totalTaxDeductedAoe = getEmploymentData.anyOtherEmployment
        .map((aoe) => {
          return aoe.taxDeducted;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const accountancyFee = getEmploymentData.selfEmployment
        .map((se) => {
          return se.accountacy;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const CLASS_2_FIXED_VALUE = 158;
      const CLASS_4_TAX_PERCENTAGE = 0.9;
      const INCOME_TAX_PERCENTAGE = 0.2;
      let totalIncome = 0;
      let totalExpenses = 0;
      let totalTaxPaid = 0;
      let profit = 0;
      let totalTax = 0;
      let class2 = 0;
      let class4 = 0;
      let incomeTax = 0;

      if (totalGrantSe) {
        profit = profit + totalGrantSe;
      }

      if (totalIncomeSe) {
        totalIncome = totalIncome + totalIncomeSe;
      }

      if (totalIncomePe) {
        totalIncome = totalIncome + totalIncomePe;
      }

      if (totalIncomeAoe) {
        totalIncome = totalIncome + totalIncomeAoe;
      }

      if (totalTaxDeductedPe) {
        totalTaxPaid = totalTaxPaid + totalTaxDeductedPe;
      }

      if (totalTaxDeductedAoe) {
        totalTaxPaid = totalTaxPaid + totalTaxDeductedAoe;
      }

      if (totalExpensesSe) {
        totalExpenses = totalExpenses + totalExpensesSe;
      }

      profit = totalIncome - totalExpenses - totalTaxPaid;

      if (profit < 6000) {
        totalTax = 0;
      } else if (profit >= 6000 && profit <= 8999) {
        totalTax += CLASS_2_FIXED_VALUE;
        class2 = totalTax;
      } else if (profit >= 9000 && profit <= 45000) {
        let taxableProfit = profit - 9000;
        let class4Tax = taxableProfit * CLASS_4_TAX_PERCENTAGE;
        totalTax += class4Tax + CLASS_2_FIXED_VALUE;
        class2 = CLASS_2_FIXED_VALUE;
        class4 = class4Tax;

        if (profit > 12500) {
          let incomeTaxableProfit = profit - 12500;
          let incomeTaxAmount = incomeTaxableProfit * INCOME_TAX_PERCENTAGE;
          totalTax += incomeTaxAmount;
          incomeTax = incomeTaxAmount;
        }
      }

      const userEmail = req.user.email;

      const savedAnyOtherEmployment = await UserTaxApplication.findOneAndUpdate(
        { formId },
        {
          formId,
          totalIncome,
          totalExpenses,
          profit,
          class2,
          class4,
          incomeTax,
          totalTax,
          accountancyFee,
          totalTaxPaid,
          userEmail: userEmail,
          paymentStatus: "pending",
          applicationStatus: "under process",
          dateSubmitted: Date.now(),
          ...req.body,
        },
        { new: true, upsert: true }
      );

      res.status(200).json(savedAnyOtherEmployment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false });
  }
});
