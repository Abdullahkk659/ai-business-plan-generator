import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await signup(email, password);
      navigate("/dashboard"); // success → go to dashboard
    } catch (err) {
      setError(err.message); // show Firebase's error (e.g. weak password)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
    <div className="page-bg flex items-center justify-center p-4">
  <div className="card p-8 w-full max-w-md">
    <h1 className="headline text-3xl mb-6">Create account</h1>
    {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
    <div className="space-y-4">
      <input className="input-premium" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className="input-premium" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={handleSubmit} className="btn-primary w-full">Sign up</button>
    </div>
    <p className="label-dark text-sm mt-4 text-center">
      Already have an account? <Link to="/login" className="text-purple-300 hover:underline">Log in</Link>
    </p>
  </div>
</div>
    </div>
  );
}