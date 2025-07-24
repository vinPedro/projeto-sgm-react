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

  const perfisPermitidos = Array.isArray(perfilPermitido)
    ? perfilPermitido
    : [perfilPermitido];

  if (profile && perfisPermitidos.includes(profile)) {
    return children;
  } else {
    return <Navigate to="/?erro=acesso-negado" replace />;
  }
}

export default RotaProtegida;
