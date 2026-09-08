import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlanById, updateSection } from "../firebase/plans";
import { generateSection } from "../utils/api";
import * as prompts from "../utils/prompts";
import { calculateFinancials } from "../utils/calculateFinancials";
import { generatePlanPDF } from "../utils/pdf";
import { isDemoMode, getDemoPlan } from "../demo";

const SECTIONS = [
  { key: "execSummary",        title: "Executive Summary",         build: prompts.buildExecutiveSummaryPrompt },
  { key: "companyDescription", title: "Company Description",        build: prompts.buildCompanyDescriptionPrompt },
  { key: "marketAnalysis",     title: "Market Analysis",           build: prompts.buildMarketAnalysisPrompt },
  { key: "organization",       title: "Organization & Management", build: prompts.buildOrganizationPrompt },
  { key: "productService",     title: "Product / Service",         build: prompts.buildProductServicePrompt },
  { key: "marketingSales",     title: "Marketing & Sales",         build: prompts.buildMarketingSalesPrompt },
  { key: "financialPlan",      title: "Financial Plan",            build: prompts.buildFinancialPlanPrompt },
  { key: "fundingRequest",     title: "Funding Request",           build: prompts.buildFundingRequestPrompt },
  { key: "riskAnalysis",       title: "Risk Analysis",             build: prompts.buildRiskAnalysisPrompt },
];

export default function PlanView() {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [sections, setSections] = useState({});
  const [generatingKey, setGeneratingKey] = useState(null);
  const [generatingAll, setGeneratingAll] = useState(false);

  // load the plan — from demo data in demo mode, from Firestore otherwise
  useEffect(() => {
    if (isDemoMode) {
      const demo = getDemoPlan(id);
      setPlan(demo);
      if (demo?.sections) setSections(demo.sections);
      return;
    }
    async function loadPlan() {
      const data = await getPlanById(id);
      setPlan(data);
      if (data.sections) setSections(data.sections);
    }
    loadPlan();
  }, [id]);

  async function handleGenerate(section) {
    setGeneratingKey(section.key);
    try {
      const text = await generateSection(section.build(plan.inputs));
      setSections((prev) => ({ ...prev, [section.key]: text }));
      await updateSection(id, section.key, text);
    } catch (err) {
      alert("Generation failed: " + err.message);
    } finally {
      setGeneratingKey(null);
    }
  }

  async function handleGenerateAll() {
    setGeneratingAll(true);
    try {
      for (const section of SECTIONS) {
        setGeneratingKey(section.key);
        const text = await generateSection(section.build(plan.inputs));
        setSections((prev) => ({ ...prev, [section.key]: text }));
        await updateSection(id, section.key, text);
      }
    } catch (err) {
      alert("Generation failed: " + err.message);
    } finally {
      setGeneratingKey(null);
      setGeneratingAll(false);
    }
  }

  if (!plan) return <p className="p-8 text-slate-400">Loading...</p>;
  const fin = calculateFinancials(plan.inputs);

  return (
    <div className="page-bg p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="headline text-4xl">
          {plan.inputs?.businessName || "Untitled Plan"}
        </h1>
        <p className="label-dark mb-6">
          {plan.inputs?.industry} · {plan.inputs?.location}
        </p>

        {/* action buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-6 mb-2">
          {/* generation buttons only in the real app, not the demo */}
          {!isDemoMode && (
            <button
              onClick={handleGenerateAll}
              disabled={generatingAll}
              className="btn-primary disabled:opacity-40"
            >
              {generatingAll ? "Generating all sections…" : "✨ Generate Full Plan"}
            </button>
          )}

          <button
            onClick={() => generatePlanPDF({ ...plan, sections })}
            className="btn-ghost"
          >
            ⬇ Export PDF
          </button>

          {generatingAll && (
            <span className="label-dark text-sm">This may take a minute…</span>
          )}
        </div>

        {/* financial snapshot */}
        <div className="card-solid p-6 mt-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Financial Snapshot</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 text-slate-600">Monthly Revenue</td>
                <td className="py-2.5 text-right font-semibold text-slate-800">
                  ${fin.monthlyRevenue.toLocaleString()}
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 text-slate-600">Monthly Profit</td>
                <td className={`py-2.5 text-right font-semibold ${fin.monthlyProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${fin.monthlyProfit.toLocaleString()}
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2.5 text-slate-600">Runway</td>
                <td className="py-2.5 text-right font-semibold text-slate-800">
                  {fin.runway !== null ? `${fin.runway} months` : "N/A"}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-slate-600">Break-even</td>
                <td className="py-2.5 text-right font-semibold text-slate-800">
                  {fin.breakEvenUnit !== null ? `${fin.breakEvenUnit} units/mo` : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* sections */}
        {SECTIONS.map((section) => (
          <div key={section.key} className="card-solid p-6 mt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-slate-800">{section.title}</h2>
              {/* generate button only in the real app */}
              {!isDemoMode && (
                <button
                  onClick={() => handleGenerate(section)}
                  disabled={generatingKey === section.key || generatingAll}
                  className="btn-primary text-sm disabled:opacity-40"
                >
                  {generatingKey === section.key
                    ? "Generating…"
                    : sections[section.key] ? "Regenerate" : "Generate"}
                </button>
              )}
            </div>
            {sections[section.key] && (
              <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                {sections[section.key]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}