import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import Header from "./components/Header";
import Search from "./components/Search";

function App() {
  const [term, setTerm] = useState(" ");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(term);
  };

  return (
    <div>
      <Header />
      <Search term={term} setTerm={setTerm} handleSubmit={handleSearchSubmit} />
    </div>
  );
}

export default App;
