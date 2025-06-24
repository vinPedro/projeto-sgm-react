import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componets/pages/Login';
import Aluno from './componets/pages/Aluno';
import Professor from './componets/pages/Professor';
import Coordenador from './componets/pages/Coordenador';
import Monitor from './componets/pages/Monitor';
import SenhaEsquecida from './componets/pages/SenhaEsquecida';
import RotaProtegida from './componets/RotaProtegida';

function App() {


  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/senhaEsquecida" element={<SenhaEsquecida />} />
        

        <Route path="/aluno" element={
          <RotaProtegida perfilPermitido="aluno">
            <Aluno />
          </RotaProtegida>
        } />

        <Route path="/professor" element={
          <RotaProtegida perfilPermitido="professor">
            <Professor />
          </RotaProtegida>
        } />

        <Route path="/coordenador" element={
          <RotaProtegida perfilPermitido="coordenador">
            <Coordenador />
          </RotaProtegida>
        } />

        <Route path="/monitor" element={
          <RotaProtegida perfilPermitido="monitor">
            <Monitor />
          </RotaProtegida>
        } />
      </Routes>
    </Router>
  )
}

export default App
