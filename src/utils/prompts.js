export function buildExecutiveSummaryPrompt(inputs) {
  return `You are a professional business plan writer. Write a concise, compelling Executive Summary (2-3 paragraphs) for the following business. Write in a professional tone suitable for a bank loan or investor. Do not use headers or bullet points — just flowing prose.

Business details:
- Name: ${inputs.businessName}
- Industry: ${inputs.industry}
- Location: ${inputs.location}
- Type: ${inputs.businessType}
- Description: ${inputs.idea}
- Target customers: ${inputs.targetCustomers}
- Competitors: ${inputs.competitors}
- What makes it different: ${inputs.differentiator}
- Team size: ${inputs.teamSize}
- Stage: ${inputs.stage}
- Startup capital: ${inputs.startupCapital}
- Funding needed: ${inputs.fundingNeeded}

Write only the Executive Summary text, nothing else.`;
}
export function buildCompanyDescriptionPrompt(inputs) {
  return `You are a professional business plan writer. Write a Company Description section (2-3 paragraphs, professional prose, no headers or bullets) for the following business.

Business details:
- Name: ${inputs.businessName}
- Industry: ${inputs.industry}
- Location: ${inputs.location}
- Type: ${inputs.businessType}
- Description: ${inputs.idea}
- Stage: ${inputs.stage}

Focus on what the business is, its mission, the problem it solves, and its current stage. Write only the section text, nothing else.`;
}

export function buildMarketAnalysisPrompt(inputs) {
  return `You are a professional business plan writer. Write a Market Analysis section (2-3 paragraphs, professional prose, no headers or bullets) for the following business.

Business details:
- Industry: ${inputs.industry}
- Location: ${inputs.location}
- Target customers: ${inputs.targetCustomers}
- Competitors: ${inputs.competitors}
- Differentiator: ${inputs.differentiator}

Focus on the target market and its needs, the competitive landscape, and how this business is positioned against competitors. Write only the section text, nothing else.`;
}

export function buildOrganizationPrompt(inputs) {
  return `You are a professional business plan writer. Write an Organization & Management section (2-3 paragraphs, professional prose, no headers or bullets) for the following business.

Business details:
- Name: ${inputs.businessName}
- Team size: ${inputs.teamSize}
- Key roles: ${inputs.keyRoles}
- Stage: ${inputs.stage}

Focus on the team structure, key roles and responsibilities, and how the organization will operate. Write only the section text, nothing else.`;
}

export function buildProductServicePrompt(inputs) {
  return `You are a professional business plan writer. Write a Product / Service section (2-3 paragraphs, professional prose, no headers or bullets) for the following business.

Business details:
- Name: ${inputs.businessName}
- Type: ${inputs.businessType}
- Description: ${inputs.idea}
- Target customers: ${inputs.targetCustomers}
- Differentiator: ${inputs.differentiator}

Focus on what the business offers, how it benefits customers, and what sets the offering apart. Write only the section text, nothing else.`;
}

export function buildMarketingSalesPrompt(inputs) {
  return `You are a professional business plan writer. Write a Marketing & Sales Strategy section (2-3 paragraphs, professional prose, no headers or bullets) for the following business.

Business details:
- Industry: ${inputs.industry}
- Location: ${inputs.location}
- Target customers: ${inputs.targetCustomers}
- Competitors: ${inputs.competitors}
- Differentiator: ${inputs.differentiator}
- Price per unit: ${inputs.pricePerUnit}

Focus on how the business will reach its target customers, its positioning and pricing approach, and how it will convert and retain customers. Write only the section text, nothing else.`;
}

export function buildFinancialPlanPrompt(inputs) {
  return `You are a professional business plan writer. Write a Financial Plan narrative section (2-3 paragraphs, professional prose, no headers or bullets) for the following business. Do not invent specific numbers beyond those provided — write the narrative around the figures given.

Business details:
- Startup capital: ${inputs.startupCapital}
- Monthly costs: ${inputs.monthlyCosts}
- Price per unit: ${inputs.pricePerUnit}
- Expected monthly sales: ${inputs.expectedMonthlySales}
- Funding needed: ${inputs.fundingNeeded}

Focus on the revenue model, cost structure, and path to profitability based on these figures. Write only the section text, nothing else.`;
}

export function buildFundingRequestPrompt(inputs) {
  return `You are a professional business plan writer. Write a Funding Request section (2-3 paragraphs, professional prose, no headers or bullets) for the following business.

Business details:
- Name: ${inputs.businessName}
- Startup capital: ${inputs.startupCapital}
- Funding needed: ${inputs.fundingNeeded}
- Stage: ${inputs.stage}

Focus on how much funding is needed, what it will be used for, and what it will help the business achieve. Write only the section text, nothing else.`;
}

export function buildRiskAnalysisPrompt(inputs) {
  return `You are a professional business plan writer. Write a Risk Analysis section (2-3 paragraphs, professional prose, no headers or bullets) for the following business.

Business details:
- Industry: ${inputs.industry}
- Location: ${inputs.location}
- Competitors: ${inputs.competitors}
- Stage: ${inputs.stage}

Focus on the key risks the business faces (market, competitive, operational, financial) and how it plans to mitigate them. Write only the section text, nothing else.`;
}