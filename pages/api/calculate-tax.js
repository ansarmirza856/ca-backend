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
      let totalIncome = 0;
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

      // profit = Number((totalIncome - totalExpenses - totalTaxPaid).toFixed(2));
      profit = totalIncome - totalExpenses;
      profit = profit + totalGrantSe;

      profitWithPE = profit + totalIncomePe;

      // profit = profit - PERSONAL_ALLOWANCE_AMOUNT;

      //profitSE  (turnover - expenses) + grant
      //employment income + profiltSE = total income received
      //total income received - personal allowance = taxable income

      //then calculate tax on taxable income
      // class 2
      // class 4
      // income tax

      // total tax - tax deducted = total tax

      // then add balancing charge if total tax is more than 1000

      if (profit < 6515) {
        totalTax = 0;
      } else if (profit >= 6515 && profit <= 11908) {
        totalTax = 0;
      } else if (profit >= 11909) {
        totalTax += CLASS_2_FIXED_VALUE;
        class2 = CLASS_2_FIXED_VALUE;
        let taxableProfit = profit - 11908;

        if (taxableProfit <= 50270) {
          let class4Tax = taxableProfit * CLASS_4_TAX_PERCENTAGE;
          totalTax += class4Tax;
          class4 = class4Tax;
        }

        if (taxableProfit > 50270) {
          let class4Tax = taxableProfit * CLASS_4_TAX_PERCENTAGE;
          totalTax += class4Tax;
          class4 = class4Tax;

          let taxableProfitHigher = profit - 50270;
          let class4TaxHigher =
            taxableProfitHigher * CLASS_4_TAX_PERCENTAGE_HIGHER;
          totalTax += class4TaxHigher;
          class4Higher = class4TaxHigher;
        }
      }

      if (profitWithPE > 12570 && profitWithPE <= 37700) {
        let incomeTaxableProfit = profitWithPE - PERSONAL_ALLOWANCE_AMOUNT;
        let incomeTaxAmount = incomeTaxableProfit * INCOME_TAX_PERCENTAGE;
        totalTax += incomeTaxAmount;
        incomeTax = incomeTaxAmount;
      }

      if (profitWithPE >= 37701 && profitWithPE <= 150000) {
        let incomeTaxableProfit = profitWithPE - 37700;
        let incomeTaxAmount = incomeTaxableProfit * 0.4;
        totalTax += incomeTaxAmount;
        incomeTax += incomeTaxAmount;
        incomeTaxHigher = incomeTaxAmount;
      }

      if (profitWithPE > 150000) {
        let incomeTaxableProfit = profitWithPE - 150000;
        let incomeTaxAmount = incomeTaxableProfit * 0.45;
        totalTax += incomeTaxAmount;
        incomeTax += incomeTaxAmount;
        incomeTaxAdditional = incomeTaxAmount;
      }

      totalTax = totalTax - totalTaxPaid;

      if (totalTax - CLASS_2_FIXED_VALUE > 1000) {
        let taxableAmount = totalTax - CLASS_2_FIXED_VALUE;
        let balancingCharge = taxableAmount / 2;
        totalTax += balancingCharge;
        balancingAmount = balancingCharge;
      }

      // if (profit < 6515) {
      //   totalTax = 0;
      // } else if (profit >= 6515 && profit <= 11908) {
      //   totalTax = 0;
      // } else if (profit >= 11909) {
      //   totalTax += CLASS_2_FIXED_VALUE;
      //   class2 = CLASS_2_FIXED_VALUE;
      //   let taxableProfit = profit - 11908;
      //   if (profit <= 50270) {
      //     let class4Tax = taxableProfit * CLASS_4_TAX_PERCENTAGE;
      //     totalTax += class4Tax;
      //     class4 = class4Tax;
      //   }

      //   if (profit > 50270) {
      //     let class4Tax = taxableProfit * CLASS_4_TAX_PERCENTAGE;
      //     totalTax += class4Tax;
      //     class4 = class4Tax;

      //     let class4TaxHigher =
      //       (profit - 50270) * CLASS_4_TAX_PERCENTAGE_HIGHER;
      //     totalTax += class4TaxHigher;
      //     class4Higher = class4TaxHigher;
      //   }
      // }

      // if (profit > 12570 && profit <= 37700) {
      //   let incomeTaxableProfit = profit - PERSONAL_ALLOWANCE_AMOUNT;
      //   let incomeTaxAmount = incomeTaxableProfit * INCOME_TAX_PERCENTAGE;
      //   totalTax += incomeTaxAmount;
      //   incomeTax = incomeTaxAmount;
      // }

      // if (profit >= 37701 && profit <= 150000) {
      //   let incomeTaxableProfit = profit - 37700;
      //   let incomeTaxAmount = incomeTaxableProfit * 0.4;
      //   totalTax += incomeTaxAmount;
      //   incomeTax += incomeTaxAmount;
      //   incomeTaxHigher = incomeTaxAmount;
      // }

      // if (profit > 150000) {
      //   let incomeTaxableProfit = profit - 150000;
      //   let incomeTaxAmount = incomeTaxableProfit * 0.45;
      //   totalTax += incomeTaxAmount;
      //   incomeTax += incomeTaxAmount;
      //   incomeTaxAdditional = incomeTaxAmount;
      // }

      // if (totalTax > 1000) {
      //   console.log("totalTax", totalTax);
      //   let taxableAmount = totalTax - CLASS_2_FIXED_VALUE;
      //   let balancingCharge = taxableAmount / 2;
      //   totalTax += balancingCharge;
      //   balancingAmount = balancingCharge;
      // }

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

//profitSE  (turnover - expenses) + grant
//employment income + profiltSE = total income received
//total income received - personal allowance = taxable income

//then calculate tax on taxable income
// class 2
// class 4
// income tax

// total tax - tax deducted = total tax

// then add balancing charge if total tax is more than 1000
