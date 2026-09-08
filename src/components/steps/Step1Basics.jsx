import Field from "../Field";

// Step 1 receives the shared data and the updater from the wizard
export default function Step1Basics({ data, updateField }) {
  return (
    <div>
      <Field
        label="Business Name"
        name="businessName"
        value={data.businessName || ""}
        onChange={updateField}
        placeholder="e.g. FitZone Studio"
      />
      <Field
        label="Industry"
        name="industry"
        value={data.industry || ""}
        onChange={updateField}
        placeholder="e.g. Fitness, Retail, Food"
      />
      <Field
        label="Location"
        name="location"
        value={data.location || ""}
        onChange={updateField}
        placeholder="e.g. Gujranwala, Pakistan"
      />

      {/* a dropdown instead of free text, for a fixed set of choices */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Business Type
        </label>
        <select
          value={data.businessType || ""}
          onChange={(e) => updateField("businessType", e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select type…</option>
          <option value="product">Product / Physical Goods</option>
          <option value="service">Service</option>
          <option value="retail">Retail / Store</option>
          <option value="saas">SaaS / Software</option>
          <option value="ecommerce">E-commerce</option>
          <option value="restaurant">Restaurant / Food & Beverage</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="consulting">Consulting / Agency</option>
          <option value="marketplace">Marketplace / Platform</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* textarea for the longer free-text idea */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          One-line Idea
        </label>
        <textarea
          value={data.idea || ""}
          onChange={(e) => updateField("idea", e.target.value)}
          placeholder="Describe your business in one sentence"
          rows={3}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
