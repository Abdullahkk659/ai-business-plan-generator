import Field from "../Field";

export default function Step3Operations({ data, updateField }) {
  return (
    <div>
      <Field
        label="Team Size"
        name="teamSize"
        value={data.teamSize || ""}
        onChange={updateField}
        placeholder="e.g. 5-10 members"
      />
      <Field
        label="Key Roles"
        name="keyRoles"
        value={data.keyRoles || ""}
        onChange={updateField}
        placeholder="e.g. Manager, Trainer, Front Desk"
      />

      {/* stage as a dropdown — fixed set of choices */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Stage
        </label>
        <select
          value={data.stage || ""}
          onChange={(e) => updateField("stage", e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select stage…</option>
          <option value="concept">Concept / Idea</option>
          <option value="launch">Launching</option>
          <option value="growth">Growing / Running</option>
        </select>
      </div>
    </div>
  );
}
