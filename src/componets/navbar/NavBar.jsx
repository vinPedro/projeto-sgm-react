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
          <NavItem to="/monitorias" label="Agenda" />

          {Array.isArray(profile) && profile.some(p => p === "monitor") && (
            <>
            <NavItem to="/atividades" label="Atividade"/>
            </>
          )}

          {Array.isArray(profile) && profile.some(p => p === "aluno") && (
            <>
            </>
          )}

          {Array.isArray(profile) && profile.some(p => p === "professor") && (
            <>
               <NavItem to="/monitores" label="Monitores"/>
               <NavItem to="/monitorias" label="Monitorias" />
            </>

          )}

          {Array.isArray(profile) && profile.some(p => p === "coordenador") && (
            <>
              <NavItem to="/alunos" label="Alunos" />
              <NavItem to="/disciplinas" label="Disciplinas" />
              <NavItem to="/professores" label="Professores" />
              <NavItem to="/processos" label="Processos"/>
            </>

          )}

          {Array.isArray(profile) && profile.some(p => p === "admin") && (
            <>
              <NavItem to="/admin" label="Painel Admin" />
              <NavItem to="/instituicoes" label="Instituições" />
              <NavItem to="/cursos" label="Cursos" />
              <NavItem to="/coordenadores" label="Coordenadores" />
            </>

          )}

        </ScrollContainer>
      )}
    </nav>
  );
}

export default NavBar;
