// Get the auth token from localStorage (or cookies for more security)
export const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken");  // Modify if using cookies
    }
    return null;
  };
  
  export const clearAuthToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");  // Modify if using cookies
    }
  };