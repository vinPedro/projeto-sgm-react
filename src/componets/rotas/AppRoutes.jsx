import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import Aluno from '../pages/Aluno';
import Professor from '../pages/Professor';
import Coordenador from '../pages/Coordenador';
import Monitor from '../pages/Monitor';
import Admin from '../pages/Admin';
import CadastrarAluno from '../pages/CadastroAluno';
import SenhaEsquecida from '../pages/SenhaEsquecida';
import RotaProtegida from './RotaProtegida';
import Cabeca from '../layout/Conteiner';
import Perfil from '../pages/Perfil';
import Editais from '../pages/Editais';
import Monitorias from '../pages/Monitorias';
import Alunos from '../pages/Alunos';

function AppRoutes() {

  const location = useLocation();

  // rotas que não devem exibir a NavBar
  const rotasSemNav = ['/', '/senhaEsquecida', '/cadastrarAluno'];
  const mostrarCon = !rotasSemNav.includes(location.pathname);

  return (
    <>
      {mostrarCon && <Cabeca />}
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/senhaEsquecida" element={<SenhaEsquecida />} />
        

        <Route path="/aluno/:id" element={
          <RotaProtegida perfilPermitido={["professor", "coordenador", "aluno", "monitor", "admin"]}>
            <Aluno />
          </RotaProtegida>
        } />

        <Route path="/perfil/:id" element={
          <RotaProtegida perfilPermitido={["professor", "coordenador", "aluno", "monitor", "admin"]}>
            <Perfil />
          </RotaProtegida>
        } />

        <Route path="/editais" element={
          <RotaProtegida perfilPermitido={["professor", "coordenador", "aluno", "monitor", "admin"]}>
            <Editais />
          </RotaProtegida>
        } />

        <Route path="/monitorias" element={
          <RotaProtegida perfilPermitido={["professor", "coordenador", "aluno", "monitor", "admin"]}>
            <Monitorias />
          </RotaProtegida>
        } />

        <Route path="/alunos" element={
          <RotaProtegida perfilPermitido={["coordenador", "admin"]}>
            <Alunos />
          </RotaProtegida>
        } />

        <Route path="/professor" element={
          <RotaProtegida perfilPermitido={["professor", "coordenador"]}>
            <Professor />
          </RotaProtegida>
        } />

        <Route path="/cadastrarAluno" element={
          <CadastrarAluno />
        } />

        <Route path="/coordenador" element={
          <RotaProtegida perfilPermitido="coordenador" >
            <Coordenador />
          </RotaProtegida>
        } />

        <Route path="/monitor" element={
          <RotaProtegida perfilPermitido="monitor">
            <Monitor />
          </RotaProtegida>
        } />

        <Route path="/admin" element={
          <RotaProtegida perfilPermitido="admin">
            <Admin />
          </RotaProtegida>
        } />
      </Routes>
    </>
  )
}

export default AppRoutes