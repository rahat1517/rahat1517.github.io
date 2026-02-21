import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { setAuth } from "../auth/token";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const r = await api.post("/auth/register", { name, email, password });
      setAuth(r.data.data.token, r.data.data.user);
      nav("/");
    } catch (e2) {
      const msg = e2?.response?.data?.message || "Register failed";
      const errs = e2?.response?.data?.errors;
      setErr(errs ? `${msg}: ${errs.join(", ")}` : msg);
    }
  }

  return (
    <div className="container small">
      <h1>Register</h1>
      {err && <div className="alert">{err}</div>}
      <form onSubmit={submit} className="form">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn">Create account</button>
      </form>
    </div>
  );
}
