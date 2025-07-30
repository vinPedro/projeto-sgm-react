import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const mapRolesToProfiles = (roles =  []) => {
  return roles.map(({ role }) => {
  if (!role) return null;

  switch (role) {
    case "ROLE_ADMIN":
      return "admin";
    case "ROLE_DOCENTE":
      return "professor";
    case "ROLE_DISCENTE":
      return "aluno";
    case "ROLE_COORDENADOR":
      return "coordenador";
    case "ROLE_MONITOR":
      return "monitor";
    default:
      return role.toLowerCase();
  }
   }).filter(Boolean); // remove nulls
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const decoded = jwtDecode(storedToken);

        if (decoded.exp * 1000 < Date.now()) {
          localStorage.clear();
          setLoading(false);
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setProfile(mapRolesToProfiles(parsedUser.roles));
      } catch (error) {
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  const login = async (matricula, password) => {
    setAuthError(null);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          matricula,
          password,
        }
      );

      const { token: new_token, user: userData } = response.data;

      localStorage.setItem("token", new_token);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(new_token);
      setUser(userData);
      const userProfiles = mapRolesToProfiles(userData.roles);
      setProfile(userProfiles);

      navigate("/monitorias");
    } catch (error) {
      console.error("Falha no login:", error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        setAuthError("Matrícula ou senha inválida.");
      } else {
        setAuthError("Ocorreu um erro ao tentar fazer login.");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setProfile([]);
    navigate("/");
  };

  const authContextValue = {
    token,
    user,
    profile,
    isAuthenticated: !!token,
    loading,
    authError,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
