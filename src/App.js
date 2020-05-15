import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import ListImages from "./components/ListImages";

function App() {
  const [termToSearch, setTermToSearch] = useState("");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (termToSearch === "") return;

    const consultAPI = async () => {
      const imagesPerPage = 30;
      const key = "16565223-7771dbd23ab0da9f9793c0b7b";
      const url = `https://pixabay.com/api/?key=${key}&q=${termToSearch}&per_page=${imagesPerPage}`;

      const response = await fetch(url);
      const result = await response.json();
      setImages(result.hits);

      //calculus of total pages
      const calcTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      setTotalPages(calcTotalPages);

      console.log(result);
    };

    consultAPI();
  }, [termToSearch]);

  // funciton to define previous page
  const previousPage = (currentPage) => {
    if (currentPage === 1) return;

    setCurrentPage(currentPage - 1);
  };

  // funciton to define next page
  const nextPage = (currentPage) => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Images Searcher</p>
        <Form setTermToSearch={setTermToSearch} />
      </div>
      <div className="row justify-content-center">
        <ListImages images={images} />

        <button
          type="button"
          className="btn btn-info mr-1"
          onClick={() => previousPage(currentPage)}
        >
          &laquo; Previous
        </button>
        <button
          type="button"
          className="btn btn-info "
          onClick={() => nextPage(currentPage)}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
}

export default App;
