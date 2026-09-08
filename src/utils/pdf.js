import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { calculateFinancials } from "./calculateFinancials";

const SECTION_ORDER = [
  { key: "execSummary",        title: "Executive Summary" },
  { key: "companyDescription", title: "Company Description" },
  { key: "marketAnalysis",     title: "Market Analysis" },
  { key: "organization",       title: "Organization & Management" },
  { key: "productService",     title: "Product / Service" },
  { key: "marketingSales",     title: "Marketing & Sales Strategy" },
  { key: "financialPlan",      title: "Financial Plan" },
  { key: "fundingRequest",     title: "Funding Request" },
  { key: "riskAnalysis",       title: "Risk Analysis" },
];

export function generatePlanPDF(plan) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // ---- Cover / title ----
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(plan.inputs.businessName || "Business Plan", margin, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(`${plan.inputs.industry || ""} · ${plan.inputs.location || ""}`, margin, y);
  doc.setTextColor(0);
  y += 15;

  // ---- Financial snapshot table ----
  const fin = calculateFinancials(plan.inputs);
  autoTable(doc, {
    startY: y,
    head: [["Financial Snapshot", ""]],
    body: [
      ["Monthly Revenue", `$${fin.monthlyRevenue.toLocaleString()}`],
      ["Monthly Profit", `$${fin.monthlyProfit.toLocaleString()}`],
      ["Runway", fin.runway !== null ? `${fin.runway} months` : "N/A"],
      ["Break-even", fin.breakEvenUnit !== null ? `${fin.breakEvenUnit} units/mo` : "N/A"],
    ],
    theme: "striped",
    headStyles: { fillColor: [99, 102, 241] },
    margin: { left: margin, right: margin },
  });
  y = doc.lastAutoTable.finalY + 15;

  // ---- Sections ----
  const sections = plan.sections || {};
  SECTION_ORDER.forEach(({ key, title }) => {
    const text = sections[key];
    if (!text) return;  // skip sections not yet generated

    // page-break check: start a new page if near the bottom
    if (y > 250) { doc.addPage(); y = margin; }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, y);
    y += 8;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    // wrap long text to the page width
    const lines = doc.splitTextToSize(text, contentWidth);
    lines.forEach((line) => {
      if (y > 280) { doc.addPage(); y = margin; }  // break mid-section if needed
      doc.text(line, margin, y);
      y += 6;
    });
    y += 8;  // gap after section
  });

  // ---- Save ----
  const filename = (plan.inputs.businessName || "business-plan").replace(/\s+/g, "-").toLowerCase();
  doc.save(`${filename}.pdf`);
}