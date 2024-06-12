import React, { useEffect, useState, useRef } from "react";
import News from "./News";
import "./NewsApp.css";

const NewsApp = () => {
  const apiKey = `c3a0989bfc554641baff9b10901a0f52`;
  const [newsList, setNewsList] = useState([]);
  const [query, setQuery] = useState("tesla");
  const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2024-05-12&sortBy=publishedAt&apiKey=${apiKey}`;
  const queryInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [query]);

  async function fetchData() {
    try {
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      setNewsList(jsonData.articles);
    } catch (e) {
      console.error(e, "error occurred");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const queryValue = queryInputRef.current.value;
    setQuery(queryValue);
  }

  return (
    <div className="news-app">
        <h1 style={{fontFamily:"monospace", fontSize:"3rem",textAlign:"left", marginBottom:"20px"}}>News Daily</h1>
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
          gridTemplateColumns: "repeat(2, 48%)",
          justifyContent: "space-between",
          rowGap: "20px",
        }}
      >
        {newsList.map((news, index) => {
          return <News key={index} news={news} />;
        })}
      </div>
    </div>
  );
};

export default NewsApp;
