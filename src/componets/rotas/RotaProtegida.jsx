import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function RotaProtegida({ children, perfilPermitido }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/?erro=nao-autenticado" />;
  }

  try {
    const decoded = jwtDecode(token);
    const perfil = decoded.perfil;

    const perfisPermitidos = Array.isArray(perfilPermitido)
      ? perfilPermitido
      : [perfilPermitido];

    if (perfisPermitidos.includes(perfil)) {
      return children;
    } else {
      return <Navigate to="/?erro=acesso-negado" />;
    }
  } catch {
    return <Navigate to="/?erro=token-invalido" />;
  }
}

export default RotaProtegida;
