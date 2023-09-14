import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import Header from "./components/Header";
import Search from "./components/Search";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [term, setTerm] = useState(" ");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(
      `https://api.unsplash.com/photos/random/?query=${term}&client_id=${UNSPLASH_KEY}`
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    setTerm("");
  };

  return (
    <div>
      <Header />
      <Search term={term} setTerm={setTerm} handleSubmit={handleSearchSubmit} />
    </div>
  );
}

export default App;
