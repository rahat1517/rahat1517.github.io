import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/client";

export default function ArticleDetails() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api.get(`/articles/${slug}`).then((r) => setArticle(r.data.data));
  }, [slug]);

  if (!article) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1>{article.title}</h1>
      <div className="meta">
        <span>By {article.author?.name}</span>
        <span>•</span>
        <span>{article.category?.name}</span>
      </div>
      <p className="muted">{article.summary}</p>
      <hr />
      <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
        {article.content}
      </div>
    </div>
  );
}
