import FormWizard from "../components/FormWizard";
import { Link } from "react-router-dom";

export default function NewPlan() {
  return (
    <div className="page-bg p-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/dashboard" className="text-purple-300 hover:underline text-sm">← Back to dashboard</Link>
        <h1 className="headline text-4xl my-6">New Business Plan</h1>
        <FormWizard />
      </div>
    </div>
  );
}