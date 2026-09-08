import gym from "./gym.json";
import cafe from "./cafe.json";
import saas from "./saas.json";

export const isDemoMode = import.meta.env.VITE_DEMO_MODE === "true";

// each demo plan needs a stable id for routing
export const DEMO_PLANS = [
  { id: "gym", ...gym },
  { id: "cafe", ...cafe },
  { id: "saas", ...saas },
];

// look one up by id — used by PlanView
export function getDemoPlan(id) {
  return DEMO_PLANS.find((p) => p.id === id) || null;
}