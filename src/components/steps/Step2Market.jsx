import Field from "../Field";
export default function Step2Market({ data, updateField }) {
  return (
    <div>
      <Field
        label="Target Customers"
        name="targetCustomers"
        value={data.targetCustomers || ""}
        onChange={updateField}
        placeholder="e.g. Fitness enthusiasts, small business owners"
      />
      <Field
        label="Competitors"
        name="competitors"
        value={data.competitors || ""}
        onChange={updateField}
        placeholder="e.g. GymPro, local studios"
      />
      <Field
        label="What Makes You Different"
        name="differentiator"
        value={data.differentiator || ""}
        onChange={updateField}
        placeholder="e.g. Automated renewal reminders, lower price"
      />
    </div>
  );
}