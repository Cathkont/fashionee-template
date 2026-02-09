import { useEffect, useState } from "react";

const Search = ({ onSearch }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 400);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <input
      data-testid="search-input"
      type="text"
      placeholder="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Search;