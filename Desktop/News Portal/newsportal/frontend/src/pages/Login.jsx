import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { setAuth } from "../auth/token";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@newsportal.com");
  const [password, setPassword] = useState("Admin@123");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const r = await api.post("/auth/login", { email, password });
      setAuth(r.data.data.token, r.data.data.user);
      nav("/");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="container small">
      <h1>Login</h1>
      {err && <div className="alert">{err}</div>}
      <form onSubmit={submit} className="form">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn">Login</button>
      </form>
      <p className="muted">
        Seeded users: admin@newsportal.com / Admin@123, user@newsportal.com / User@123
      </p>
    </div>
  );
}
