import Field from "../Field";

export default function Step4Financials({ data, updateField }) {
  return (
    <div>
      <Field
        label="Startup Capital"
        name="startupCapital"
        value={data.startupCapital || ""}
        onChange={updateField}
        placeholder="e.g. 2000000"
        type="number"
      />
      <Field
        label="Monthly Costs"
        name="monthlyCosts"
        value={data.monthlyCosts || ""}
        onChange={updateField}
        placeholder="e.g. 250000"
        type="number"
      />
      <Field
        label="Price Per Unit"
        name="pricePerUnit"
        value={data.pricePerUnit || ""}
        onChange={updateField}
        placeholder="e.g. 4000"
        type="number"
      />
      <Field
        label="Expected Monthly Sales"
        name="expectedMonthlySales"
        value={data.expectedMonthlySales || ""}
        onChange={updateField}
        placeholder="e.g. 120"
        type="number"
      />
      <Field
        label="Funding Needed"
        name="fundingNeeded"
        value={data.fundingNeeded || ""}
        onChange={updateField}
        placeholder="e.g. 1000000"
        type="number"
      />
    </div>
  );
}