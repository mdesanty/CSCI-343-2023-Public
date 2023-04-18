import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useAuth() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('user') !== null) {
      setCurrentUser(JSON.parse(localStorage.getItem('user')));
      setIsAuthenticated(true);
    }
  }, [location]);

  return { currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated };
}

export default useAuth;