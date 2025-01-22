import React, { useState } from 'react';
import './StudentDashboard.css';
import PinnedSubheaderList from './PinnedSubheaderList'; 

const StudentDashboard = () => {
  const [isListVisible, setIsListVisible] = useState(false);

  const handleSearchClick = () => {
    setIsListVisible(true);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.search')) {
      setIsListVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="bg">
        <div className="wrap">
          <div className="search" onClick={handleSearchClick}>
            <input 
              type="text" 
              className="searchTerm" 
              placeholder="Caută profesor..." 
            />
            <button type="submit" className="searchButton">
            </button>
          </div>
          {isListVisible && <PinnedSubheaderList />}
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
