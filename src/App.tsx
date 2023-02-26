import React from 'react';
import './App.css';
import { api } from './api';
import Article from './types/article';

export default function App() {

  function getArticles() {
    api.get("/article")
      .then(response => {
        let article: Article = response.data;
        console.log(article);
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <div className="App">
      <button onClick={getArticles}>
        Get articles
      </button>
    </div>
  );
}
