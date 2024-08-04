import React, { useState, useRef } from 'react';
import './cards.css'
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const containerRef = useRef(null);

  const handleSearch = (event) => {
    const term = event.target.value.trim().toLowerCase();
    setSearchTerm(term);

    if (term) {
      const results = findMatches(term);
      setSearchResults(results);
    } else {
      clearHighlights();
      setSearchResults([]);
    }
  };

  const findMatches = (term) => {
    const elements = document.body.getElementsByTagName('*');
    const matches = [];

    Array.from(elements).forEach((element) => {
      if (element.children.length === 0) {
        const textContent = element.textContent.toLowerCase();
        if (textContent.includes(term)) {
          matches.push(element);
        }
      }
    });

    return matches;
  };

  const highlightMatches = () => {
    clearHighlights(); // Clear previous highlights before applying new ones
    searchResults.forEach((element, index) => {
      const innerHTML = element.innerHTML;
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      element.innerHTML = innerHTML.replace(regex, `<span class="highlight-${index % 3}">$1</span>`);
    });
    scrollToResults();
  };

  const clearHighlights = () => {
    const highlightedElements = document.querySelectorAll('[class^="highlight-"]');
    highlightedElements.forEach((element) => {
      const parent = element.parentNode;
      parent.replaceChild(document.createTextNode(element.textContent), element);
      parent.normalize(); // Combine adjacent text nodes
    });
  };

  const scrollToResults = () => {
    if (searchResults.length > 0 && containerRef.current) {
      const topPosition = containerRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearch} 
        placeholder="Search..." 
      />
      <button onClick={highlightMatches}>Find</button>
      <div ref={containerRef}>
        {/* Your content where highlights will be applied */}
      </div>
    </div>
  );
}

export default SearchBar;
