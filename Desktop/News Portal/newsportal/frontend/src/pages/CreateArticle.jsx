import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { getUser } from "../auth/token";

export default function CreateArticle() {
  const nav = useNavigate();
  const user = getUser();
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!user) nav("/login");
  }, [user, nav]);

  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data.data));
  }, []);

  function slugify(v) {
    return v
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const payload = { title, slug, summary, content, categoryId: Number(categoryId), published: true };
      const r = await api.post("/articles", payload);
      nav(`/articles/${r.data.data.slug}`);
    } catch (e2) {
      const msg = e2?.response?.data?.message || "Create failed";
      const errs = e2?.response?.data?.errors;
      setErr(errs ? `${msg}: ${errs.join(", ")}` : msg);
    }
  }

  return (
    <div className="container small">
      <h1>Create Article</h1>
      {err && <div className="alert">{err}</div>}
      <form onSubmit={submit} className="form">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slug) setSlug(slugify(e.target.value));
          }}
        />

        <label>Slug</label>
        <input value={slug} onChange={(e) => setSlug(slugify(e.target.value))} />

        <label>Category</label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Select...</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <label>Summary</label>
        <input value={summary} onChange={(e) => setSummary(e.target.value)} />

        <label>Content</label>
        <textarea rows={10} value={content} onChange={(e) => setContent(e.target.value)} />

        <button className="btn">Publish</button>
      </form>
    </div>
  );
}
