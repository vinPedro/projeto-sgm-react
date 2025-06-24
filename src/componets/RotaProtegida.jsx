import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function RotaProtegida({ children, perfilPermitido }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/?erro=nao-autenticado" />;
  }

  try {
    const decoded = jwtDecode(token);
    const perfil = decoded.perfil;

    if (perfil === perfilPermitido) {
      return children;
    } else {
      return <Navigate to="/?erro=acesso-negado" />;
    }
  } catch {
    return <Navigate to="/?erro=token-invalido" />;
  }
}

export default RotaProtegida;
