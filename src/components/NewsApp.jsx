import React, { useEffect, useState, useRef } from "react";
import News from "./News";
import "./NewsApp.css";

const NewsApp = () => {
  const apiUrl = import.meta.env.VITE_NEWS_API_URL;
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const [newsList, setNewsList] = useState([]);
  const [query, setQuery] = useState("tesla");
  const queryInputRef = useRef(null);

  useEffect(() => {
    const fetchUrl = `${apiUrl}?q=${query}&from=2024-05-13&sortBy=publishedAt&apiKey=${apiKey}`;
    fetchData(fetchUrl);
  }, [query]);

  async function fetchData(fetchUrl) {
    try {
      const response = await fetch(fetchUrl);
      const jsonData = await response.json();
      setNewsList(jsonData.articles || []);
    } catch (e) {
      console.error(e, "error occurred");
      setNewsList([]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const queryValue = queryInputRef.current.value;
    setQuery(queryValue);
  }

  return (
    <div className="news-app">
      <h1
        style={{
          fontFamily: "monospace",
          fontSize: "3rem",
          textAlign: "left",
          marginBottom: "20px",
        }}
      >
        News Daily
      </h1>
      <form onSubmit={handleSubmit}>
        <input className="query-input" ref={queryInputRef} type="text" />
        <input
          className="btn-submit"
          type="submit"
          onClick={handleSubmit}
          value="Submit"
        />
      </form>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: newsList.length > 0 ? "repeat(2, 48%)" : "1fr",
          justifyContent: "space-between",
          rowGap: "20px",
        }}
      >
        {Array.isArray(newsList) && newsList.length > 0 ? (
          newsList.map((news, index) => {
            return <News key={index} news={news} />;
          })
        ) : (
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "2rem",
            }}
          >
            No news articles found
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsApp;
