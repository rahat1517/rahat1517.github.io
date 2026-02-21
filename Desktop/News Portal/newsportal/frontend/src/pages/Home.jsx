import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [q, setQ] = useState("");

  const queryParams = useMemo(() => {
    const params = {};
    if (categoryId) params.categoryId = categoryId;
    if (q.trim()) params.q = q.trim();
    return params;
  }, [categoryId, q]);

  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data.data));
  }, []);

  useEffect(() => {
    api.get("/articles", { params: queryParams }).then((r) => setArticles(r.data.data));
  }, [queryParams]);

  return (
    <div className="container">
      <h1>Latest Articles</h1>

      <div className="filters">
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input
          placeholder="Search title/summary..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="grid">
        {articles.map((a) => (
          <Link key={a.id} to={`/articles/${a.slug}`} className="card">
            <div className="card-title">{a.title}</div>
            <div className="muted">{a.summary}</div>
            <div className="meta">
              <span>By {a.author?.name}</span>
              <span>•</span>
              <span>{a.category?.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
