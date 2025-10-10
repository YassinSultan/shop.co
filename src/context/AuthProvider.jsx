import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

// 2️⃣ إنشاء Provider
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  // أول ما الابلكيشن يفتح، لو فيه token في localStorage نخزنه في state
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // login → يحفظ التوكن
  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // logout → يمسح التوكن
  const deleteToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, deleteToken }}>
      {children}
    </AuthContext.Provider>
  );
}
