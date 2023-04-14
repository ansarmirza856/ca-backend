import connectDB from "../../db";
import UserTaxApplication from "@/models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

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

      const CLASS_2_FIXED_VALUE = 168.8;
      const CLASS_4_TAX_PERCENTAGE = 0.0973;
      const CLASS_4_TAX_PERCENTAGE_HIGHER = 0.0273;
      const PERSONAL_ALLOWANCE_AMOUNT = 12500;
      const INCOME_TAX_PERCENTAGE = 0.2;
      let totalIncome = 0;
      let totalExpenses = 0;
      let totalTaxPaid = 0;
      let profit = 0;
      let totalTax = 0;
      let class2 = 0;
      let class4 = 0;
      let class4Higher = 0;
      let incomeTax = 0;
      let incomeTaxHigher = 0;
      let incomeTaxAdditional = 0;
      let balancingAmount = 0;

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

      profit = Number((totalIncome - totalExpenses - totalTaxPaid).toFixed(2));

      if (profit < 6515) {
        totalTax = 0;
      } else if (profit >= 6515 && profit <= 11908) {
        totalTax = 0;
      } else if (profit >= 11909) {
        totalTax += CLASS_2_FIXED_VALUE;
        class2 = CLASS_2_FIXED_VALUE;
        let taxableProfit = profit - PERSONAL_ALLOWANCE_AMOUNT;
        if (profit <= 50270) {
          let class4Tax = taxableProfit * CLASS_4_TAX_PERCENTAGE;
          totalTax += class4Tax;
          class4 = class4Tax;
        }

        if (profit > 50270) {
          let class4Tax = taxableProfit * CLASS_4_TAX_PERCENTAGE;
          totalTax += class4Tax;
          class4 = class4Tax;

          let class4TaxHigher =
            (profit - 50270) * CLASS_4_TAX_PERCENTAGE_HIGHER;
          totalTax += class4TaxHigher;
          class4Higher = class4TaxHigher;
        }

        if (profit > 12570 && profit <= 37700) {
          let incomeTaxableProfit = profit - PERSONAL_ALLOWANCE_AMOUNT;
          let incomeTaxAmount = incomeTaxableProfit * INCOME_TAX_PERCENTAGE;
          totalTax += incomeTaxAmount;
          incomeTax = incomeTaxAmount;
        }

        if (profit >= 37701 && profit <= 150000) {
          let incomeTaxableProfit = profit - 37700;
          let incomeTaxAmount = incomeTaxableProfit * 0.4;
          totalTax += incomeTaxAmount;
          incomeTaxHigher = incomeTaxAmount;
        }

        if (profit > 150000) {
          let incomeTaxableProfit = profit - 150000;
          let incomeTaxAmount = incomeTaxableProfit * 0.45;
          totalTax += incomeTaxAmount;
          incomeTaxAdditional = incomeTaxAmount;
        }

        if (totalTax > 1000) {
          let taxableAmount = totalTax - CLASS_2_FIXED_VALUE;
          let balancingCharge = taxableAmount / 2;
          totalTax += balancingCharge;
          balancingAmount = balancingCharge;
        }
      }
      const class2Rounded = Number(class2.toFixed(2));
      const class4Rounded = Number(class4.toFixed(2));
      incomeTax = Number(incomeTax.toFixed(2));
      totalTax = Number(totalTax.toFixed(2));

      const calculatedTax = await UserTaxApplication.findOneAndUpdate(
        { formId },
        {
          formId,
          totalIncome,
          totalExpenses,
          profit,
          class2: class2Rounded,
          class4: class4Rounded,
          incomeTax,
          totalTax,
          accountancyFee,
          totalTaxPaid,
          paymentStatus: "pending",
          dateSubmitted: Date.now(),
        },
        { new: true, upsert: true }
      );

      res.status(200).json(calculatedTax);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ success: false });
  }
});
