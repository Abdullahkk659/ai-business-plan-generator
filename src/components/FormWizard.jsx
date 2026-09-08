import { useState } from "react";
import Step1Basics from "./steps/Step1Basics";
import Step2Market from "./steps/Step2Market";
import Step3Operations from "./steps/Step3Operations";
import Step4Financials from "./steps/Step4Finacials";  // ← match your actual filename (the typo one)
import { savePlan } from "../firebase/plans";
import { useAuth } from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
const STEPS = ["Business Basics", "Market", "Operations", "Financials"];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [save, setsave] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  async function handleSave() {
    setsave(true);
    try {
      await savePlan(currentUser.uid, formData);
      navigate("/dashboard");
    } catch (error) {
      alert("Error saving plan:", error);
      setsave(false);
    }
  }
  function updateField(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function renderStep() {
    switch (step) {
      case 0:
        return <Step1Basics data={formData} updateField={updateField} />;
      case 1:
        return <Step2Market data={formData} updateField={updateField} />;
      case 2:
        return <Step3Operations data={formData} updateField={updateField} />;
      case 3:
        return <Step4Financials data={formData} updateField={updateField} />;
      default:
        return <p className="text-slate-400">Step coming soon..</p>;
    }
  }

    return (
    <div className="card-solid p-8">
      {/* progress bar */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-indigo-500" : "bg-slate-200"}`} />
            <p className={`text-xs mt-1 ${i === step ? "text-indigo-600 font-medium" : "text-slate-400"}`}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* current step — no white box, we're already on card-solid */}
      <div className="min-h-[300px]">
        <h2 className="text-xl font-bold text-slate-800 mb-6">{STEPS[step]}</h2>
        {renderStep()}
      </div>

      {/* nav */}
      <div className="flex justify-between mt-6">
        <button onClick={back} disabled={step === 0}
          className="px-5 py-2 rounded-lg bg-slate-200 disabled:opacity-40 hover:bg-slate-300">
          Back
        </button>
        {step === STEPS.length - 1 ? (
          <button onClick={handleSave} disabled={save} className="btn-primary disabled:opacity-40">
            {save ? "Saving…" : "Finish & Save"}
          </button>
        ) : (
          <button onClick={next} className="btn-primary">Next</button>
        )}
      </div>

      
    </div>
  );
}
