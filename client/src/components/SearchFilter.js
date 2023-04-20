import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SearchFilter = () => {
    let [searchQuery, setSearchQuery]=useState("")
    const navigate = useNavigate();
    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search?q=${searchQuery}`);
      };
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search Products..."
        className="search-input"
        onChange={(e)=>{setSearchQuery(e.target.value)}}
        value={searchQuery}
      />
      <button className="search-button" onClick={handleSearch}><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
  );
};

export default SearchFilter;
