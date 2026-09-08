export function calculateFinancials(inputs) {
  const capital = Number(inputs.startupCapital) || 0;
  const monthlyCost = Number(inputs.monthlyCosts) || 0;
  const price = Number(inputs.pricePerUnit) || 0;              // ← pricePerUnit
  const monthlySales = Number(inputs.expectedMonthlySales) || 0; // ←monthlySales

  const monthlyRevenue = price * monthlySales;
  const monthlyProfit = monthlyRevenue - monthlyCost;
  const runway = monthlyCost > 0 ? Math.round(capital / monthlyCost) : null;
  const breakEvenUnit = price > 0 ? Math.ceil(monthlyCost / price) : null;  // ← guard added

  return { monthlyRevenue, monthlyProfit, runway, breakEvenUnit };
}

