import connectDB from "../../db";
import UserTaxApplication from "@/models/UserTaxApplication";
import authMiddleware from "../../middleware/auth";

export default authMiddleware(async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    try {
      const { formId } = req.body;

      const CLASS_2_FIXED_VALUE = 163.8;
      const CLASS_4_TAX_PERCENTAGE = 0.0973;
      const CLASS_4_TAX_PERCENTAGE_HIGHER = 0.0273;
      const PERSONAL_ALLOWANCE_AMOUNT = 12570;
      const INCOME_TAX_PERCENTAGE = 0.2;
      const INCOME_TAX_PERCENTAGE_HIGHER = 0.4;
      const LOWER_PROFIT_LIMIT_FOR_NI = 11908;
      let totalIncome = 0;
      let totalIncomePE = 0;
      let totalIncomeReceived = 0;
      let lowerTaxableAmount = 37700;
      let higherTaxableAmount = 0;
      let incomeTaxOnLowerAmount = 0;
      let incomeTaxOnHigherAmount = 0;
      let totalTaxDueThisYear = 0;
      let paymentOnAccount = 0;
      let TaxableIncome = 0;
      let totalExpenses = 0;
      let totalTaxPaid = 0;
      let profit = 0;
      let profitWithPE = 0;
      let totalTax = 0;
      let class2 = 0;
      let class4 = 0;
      let class4Higher = 0;
      let incomeTax = 0;
      let incomeTaxHigher = 0;
      let incomeTaxAdditional = 0;
      let balancingAmount = 0;

      const getEmploymentData = await UserTaxApplication.findOne({
        formId: req.body.formId,
      });

      const totalIncomeSe = getEmploymentData.selfEmployment
        .map((se) => {
          return se.income ?? 0;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const totalGrantSe = getEmploymentData.selfEmployment
        .map((se) => {
          return se.grants ?? 0;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const totalExpensesSe = getEmploymentData.selfEmployment
        .map((se) => {
          return (
            (se.fuel ?? 0) +
            (se.repair ?? 0) +
            (se.mot ?? 0) +
            (se.roadtax ?? 0) +
            (se.cleaning ?? 0) +
            (se.agencyCommission ?? 0) +
            (se.licensingCost ?? 0) +
            (se.telephone ?? 0) +
            (se.insurance ?? 0) +
            (se.breakdownAssistance ?? 0) +
            (se.iobl ?? 0) +
            (se.other ?? 0) +
            (se.accountacy ?? 0)
          );
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const totalIncomePe = getEmploymentData.personalEmployment
        .map((pe) => {
          return pe.totalIncome ?? 0;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const totalTaxDeductedPe = getEmploymentData.personalEmployment
        .map((pe) => {
          return pe.totalTaxDeducted ?? 0;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const totalIncomeAoe = getEmploymentData.anyOtherEmployment
        .map((aoe) => {
          return aoe.income ?? 0;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const totalTaxDeductedAoe = getEmploymentData.anyOtherEmployment
        .map((aoe) => {
          return aoe.taxDeducted ?? 0;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      const accountancyFee = getEmploymentData.selfEmployment
        .map((se) => {
          return se.accountacy ?? 0;
        })
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);

      if (totalIncomeSe) {
        totalIncome = totalIncome + totalIncomeSe;
      }

      // if (totalIncomePe) {
      //   totalIncome = totalIncome + totalIncomePe;
      // }

      // if (totalIncomeAoe) {
      //   totalIncome = totalIncome + totalIncomeAoe;
      // }

      if (totalTaxDeductedPe) {
        totalTaxPaid = totalTaxPaid + totalTaxDeductedPe;
      }

      // if (totalTaxDeductedAoe) {
      //   totalTaxPaid = totalTaxPaid + totalTaxDeductedAoe;
      // }

      if (totalExpensesSe) {
        totalExpenses = totalExpenses + totalExpensesSe;
      }

      // Adjusted Profit Before Tax
      profit = totalIncome - totalExpenses;
      profit = profit + totalGrantSe;

      // Employment Income
      totalIncomePE = totalIncomePe;

      //Total Income Received
      totalIncomeReceived = profit + totalIncomePE;

      //Taxable Income
      if (totalIncomeReceived > PERSONAL_ALLOWANCE_AMOUNT) {
        TaxableIncome = totalIncomeReceived - PERSONAL_ALLOWANCE_AMOUNT;
      }

      //Higher Taxable Amount
      if (TaxableIncome > lowerTaxableAmount) {
        higherTaxableAmount = TaxableIncome - lowerTaxableAmount;
      }

      //Income Tax on Lower Amount
      if (TaxableIncome >= lowerTaxableAmount) {
        incomeTaxOnLowerAmount = lowerTaxableAmount * INCOME_TAX_PERCENTAGE;
      } else {
        incomeTaxOnLowerAmount = TaxableIncome * INCOME_TAX_PERCENTAGE;
      }

      //Income Tax on Higher Amount
      if (TaxableIncome >= lowerTaxableAmount) {
        incomeTaxOnHigherAmount =
          higherTaxableAmount * INCOME_TAX_PERCENTAGE_HIGHER;
      }

      function calculateClass4Tax(profit) {
        if (profit <= 11908) {
          return 0;
        } else {
          if (profit <= 50270) {
            return (profit - 11908) * 0.0973;
          } else {
            return (50270 - 11908) * 0.0973 + (profit - 50270) * 0.0273;
          }
        }
      }

      class4 = calculateClass4Tax(profit);

      if (totalIncomeReceived > LOWER_PROFIT_LIMIT_FOR_NI) {
        class2 = CLASS_2_FIXED_VALUE;
        totalTax = totalTax + CLASS_2_FIXED_VALUE;
      }

      totalTaxDueThisYear =
        class4 +
        incomeTaxOnLowerAmount -
        totalTaxPaid +
        class2 +
        incomeTaxOnHigherAmount;

      if (totalTaxDueThisYear - CLASS_2_FIXED_VALUE > 1000) {
        paymentOnAccount = (totalTaxDueThisYear - CLASS_2_FIXED_VALUE) / 2;
      }

      totalTax = totalTaxDueThisYear + paymentOnAccount;

      const class2Rounded = Number(class2.toFixed(2));
      const class4Rounded = Number(class4.toFixed(2));
      incomeTax = incomeTaxOnLowerAmount + incomeTaxOnHigherAmount;
      incomeTax = Number(incomeTax.toFixed(2));
      totalTax = Number(totalTax.toFixed(2));
      totalTaxDueThisYear = Number(totalTaxDueThisYear.toFixed(2));
      paymentOnAccount = Number(paymentOnAccount.toFixed(2));

      const calculatedTax = await UserTaxApplication.findOneAndUpdate(
        { formId },
        {
          formId,
          totalIncome,
          totalExpenses,
          profit,
          class2: class2Rounded,
          class4: class4Rounded,
          incomeTax: incomeTax,
          dueForThisYear: totalTaxDueThisYear,
          paymentOnAccount: paymentOnAccount,
          totalTaxDue: totalTax,
          totalTax: totalTax,
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
