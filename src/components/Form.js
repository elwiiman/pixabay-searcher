import React, { useState } from "react";
import Error from "./Error";

const Form = ({ setTermToSearch }) => {
  const [word, setWord] = useState("");
  const [error, setError] = useState(false);

  const searchImages = (e) => {
    e.preventDefault();

    //validate
    if (word.trim() === "") {
      setError(true);
      return;
    }

    setError(false);
    setTermToSearch(word);

    //send the word searched to the main component
  };

  return (
    <form onSubmit={searchImages}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search an image. Example: football"
            onChange={(e) => setWord(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            placeholder="Search an image. Example: football"
            value="Search"
          />
        </div>
      </div>

      {error ? <Error message="Please type a word to search images" /> : null}
    </form>
  );
};

export default Form;
