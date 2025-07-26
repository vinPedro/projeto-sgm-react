import { useAuth } from "../AuthContext";
import NavItem from "../navbar/NavItem.jsx";
import ScrollContainer from "../navbar/ScrollContainer.jsx";

function NavBar() {
  const { profile } = useAuth();

  return (
    <nav>
      {/* Exibir item apenas para certos perfis */}
      {profile && (
        <ScrollContainer>
          <NavItem to="/editais" label="Editais" />
          <NavItem to="/monitorias" label="Agenda" />

          {Array.isArray(profile) && profile.some(p => p === "admin") && (
            <>
              <NavItem to="/admin" label="Painel Admin" />
              <NavItem to="/instituicoes" label="Instituições" />
              <NavItem to="/coordenadores" label="Coordenadores" />
              <NavItem to="/alunos" label="Alunos" />
              <NavItem to="/disciplinas" label="Disciplinas" />
            </>
          )}
          {Array.isArray(profile) && profile.some(p => p === "monitor") && (
            <>
              
            </>
          )}
          {Array.isArray(profile) && profile.some(p => p === "professor") && (
            <>
              <NavItem to="/monitor" label="Monitoria" />
            </>
          )}
          {Array.isArray(profile) && profile.some(p => p === "coordenador") && (
            <>
              <NavItem to="/coordenador" label="Coordenação" />
              <NavItem to="/alunos" label="Alunos" />
              <NavItem to="/disciplinas" label="Disciplinas" />
              <NavItem to="/monitorias" label="Monitoria" />
              <NavItem to="/professor" label="Painel Professor" />
            </>
          )}
        </ScrollContainer>
      )}
    </nav>
  );
}

export default NavBar;
