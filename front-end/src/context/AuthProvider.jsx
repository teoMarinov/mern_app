/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { persistentLogin, setJwtToken } from "../config/axios-helper"

const AuthContext = createContext({
  user: null,
  signIn: () => { },
  signOut: () => { },
});


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const signIn = (user, jwt) => {
    setUser(user);
    setJwtToken(jwt);
    navigate("/");
  };

  const signOut = () => {
    setUser(null);
    setJwtToken("");
    navigate("/login");
  };

  useEffect(() => {
    try {
      persistentLogin()
        .then(({ data }) => { 
          console.log("🚀 ~ .then ~ data:", data)
          
          signIn(data.userInfo, data.token) })
        .finally(() => navigate("/"));
    } catch (error) {
      // console.log(error.message);
    }
  }, []);


  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
