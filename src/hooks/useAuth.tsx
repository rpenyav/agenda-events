import { useContext } from "react";

import { AuthContext, AuthContextType } from "../context/AuthContext";

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export default useAuth;
