import { useState } from 'react';
import './App.css';
import { api } from './api';
import Article from './types/article';

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);

  function getArticles() {
    api.get("/article/all")
      .then(response => {
        const articles_json: Article[] = response.data;
        setArticles(articles_json);
      })
      .catch(error => {
        if (error.response) {
          console.log("Data :", error.response.data);
          console.log("Status :" + error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
  }

  function logStatus() {
    api.get("/status")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        if (error.response) {
          console.log("Data :", error.response.data);
          console.log("Status :" + error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
  }

  return (
    <div className="App">
      <button onClick={getArticles}>
        Get articles
      </button>
      <button onClick={logStatus}>
        Get status
      </button>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            Author: {article.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
