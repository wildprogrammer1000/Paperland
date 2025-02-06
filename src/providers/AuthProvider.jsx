import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { useNakama } from "./NakamaProvider";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const { client, login } = useNakama();

  useEffect(() => {
    const id = localStorage.getItem("userId") || v4();
    localStorage.setItem("userId", id);
    if (client) login(id, setUser);
  }, [client]);
  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
export default AuthProvider;
