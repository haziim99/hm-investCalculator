import { Injectable, signal } from "@angular/core";
import type { InvestmentInput } from "./investment-input.model";

@Injectable({ providedIn: 'root' })

export class InvestmentService {

  resultData = signal< {
        year: number;
        interest: number;
        valueEndOfYear: number;
        annualInvestment: number;
        totalInterest: number;
        totalAmountInvested: number;
      }[] | undefined>(undefined);


  calculateInvestmentResults( data: InvestmentInput)
  { const { initialInvestment, annualInvestment, expectedReturn, duartion} = data;
    const annualData = [];
    let investmentValue = initialInvestment;

    for(let i = 0; i < duartion; i++) {
      const year = i + 1 ;
      const interestEarnInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnInYear + annualInvestment;

      const totalInterest =
      investmentValue - annualInvestment * year - initialInvestment;

      annualData.push({
        year: year,
        interest: interestEarnInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    this.resultData.set (annualData);
  }
}
