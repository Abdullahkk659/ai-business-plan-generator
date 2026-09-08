import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlan } from "../firebase/plans";
import { isDemoMode, DEMO_PLANS } from "../demo";

export default function Dashboard() {
  const [plans, setPlans] = useState([]);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  useEffect(() => {
    if (isDemoMode) {
      setPlans(DEMO_PLANS);
      return;
    }
    if (!currentUser) return;
    async function load() {
      const data = await getPlan(currentUser.uid);
      setPlans(data);
    }
    load();
  }, [currentUser]);

  // ---- DEMO MODE: polished landing ----
  if (isDemoMode) {
    return (
      <div className="page-bg p-8">
        <div className="max-w-5xl mx-auto">
          {/* hero */}
          <div className="text-center mb-12 pt-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-purple-200 text-sm mb-6">
              ✨ Live Demo
            </span>
            <h1 className="headline text-5xl mb-4">AI Business Plan Generator</h1>
            <p className="label-dark text-lg max-w-xl mx-auto">
              Turn a simple idea into a complete, investor-ready business plan in
              minutes. Click any example below to see a full AI-generated plan.
            </p>
          </div>

          {/* cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {DEMO_PLANS.map((plan) => (
              <Link
                key={plan.id}
                to={`/plan/${plan.id}`}
                className="group relative bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 hover:border-purple-400/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="text-3xl mb-4">
                  {plan.id === "gym" ? "🏋️" : plan.id === "cafe" ? "☕" : "💻"}
                </div>
                <h3 className="text-white font-bold text-xl mb-1">
                  {plan.inputs?.businessName}
                </h3>
                <p className="text-purple-200/70 text-sm mb-4">
                  {plan.inputs?.industry}
                </p>
                <p className="label-dark text-sm line-clamp-2">
                  {plan.inputs?.idea}
                </p>
                <span className="inline-block mt-4 text-purple-300 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  View plan →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ---- REAL APP: your existing dashboard ----
  return (
    <div className="page-bg p-8">
      <div className="flex justify-between items-center mb-10 max-w-4xl mx-auto">
        <h1 className="headline text-4xl">My Business Plans</h1>
        <div className="flex items-center gap-4">
          <span className="label-dark text-sm">{currentUser?.email}</span>
          <button onClick={handleLogout} className="btn-ghost">
            Log out
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <Link to="/new-plan" className="btn-primary inline-block mb-8">
          + New Plan
        </Link>

        {plans.length === 0 ? (
          <p className="label-dark">No plans yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {plans.map((plan) => (
              <Link
                key={plan.id}
                to={`/plan/${plan.id}`}
                className="card p-6 block hover:scale-[1.02] transition"
              >
                <h3 className="text-white font-bold text-lg">
                  {plan.inputs?.businessName || "Untitled Plan"}
                </h3>
                <p className="label-dark text-sm mt-1">
                  {plan.inputs?.industry || "No industry specified"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}