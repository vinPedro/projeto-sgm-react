// src/routes/AppRoutes.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { routeConfig } from "./routeConfig";
import RotaProtegida from "./RotaProtegida";
import Conteiner from "../layout/Conteiner";

export default function AppRoutes() {
  const location = useLocation();
  const rotasSemNav = ["/", "/senhaEsquecida", "/cadastrarAluno"];
  const mostrarCon = !rotasSemNav.includes(location.pathname);

  return (
    <>
      {mostrarCon && <Conteiner />}
      <Routes>
        {routeConfig.map(({ path, element, isPrivate, roles }) => (
          <Route
            key={path}
            path={path}
            element={
              isPrivate ? (
                <RotaProtegida perfilPermitido={roles}>
                  {element}
                </RotaProtegida>
              ) : (
                element
              )
            }
          />
        ))}
      </Routes>
    </>
  );
}
