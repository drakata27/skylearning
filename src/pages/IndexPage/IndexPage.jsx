// import React, { useState, useEffect } from 'react';
// import HomePage from '../Home/HomePage'
// import LandingPage from '../LandingPage/LandingPage';

// const IndexPage = () => {
//     const [token, setToken] = useState(localStorage.getItem('authTokens'));

//     useEffect(() => {
//       const handleStorageChange = () => {
//         setToken(localStorage.getItem('authTokens'));
//       };

//       window.addEventListener('storage', handleStorageChange);
//       return () => {
//         window.removeEventListener('storage', handleStorageChange);
//       };
//     }, []);

//     return (
//       <>
//         { token ? HomePage : LandingPage}
//       </>
//     );
// }

// export default IndexPage

import React, { useState, useEffect } from "react";
import HomePage from "../Home/HomePage";
import LandingPage from "../LandingPage/LandingPage";

const IndexPage = () => {
  const [token, setToken] = useState(localStorage.getItem("authTokens")); // Ensure consistent key name

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("authTokens")); // Use correct key consistently
    };

    // Add storage event listener
    window.addEventListener("storage", handleStorageChange);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return <>{token ? <HomePage /> : <LandingPage />}</>;
};

export default IndexPage;
