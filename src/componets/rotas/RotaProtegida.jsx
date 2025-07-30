import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function RotaProtegida({ children, perfilPermitido }) {
  const { isAuthenticated, profile, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/?erro=nao-autenticado" replace />;
  }

  const possuiPermissao =
    Array.isArray(profile) &&
    profile.some((p) => perfilPermitido.includes(p));

  if (possuiPermissao) {
    return children;
  } else {
    return <Navigate to="/?erro=acesso-negado" replace />;
  }
}

export default RotaProtegida;
