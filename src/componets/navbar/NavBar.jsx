import { jwtDecode } from "jwt-decode";
import NavItem from "../navbar/NavItem.jsx";
import ScrollContainer from "../navbar/ScrollContainer.jsx";

function NavBar() {
  const token = localStorage.getItem("token");
  let perfil = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      perfil = decoded.perfil;
    } catch (e) {
      console.error(e);
      perfil = "";
    }
  }

  return (
    <nav>
      {/* Exibir item apenas para certos perfis */}
      {perfil && perfil.trim() === "monitor" && (
        <ScrollContainer>
          <NavItem to="/monitor" label="Monitoria" />
        </ScrollContainer>
      )}

      {perfil && perfil.trim() === "professor" && (
        <ScrollContainer>
          <NavItem to="/professor" label="Painel Professor" />
        </ScrollContainer>
      )}

      {perfil && perfil.trim() === "aluno" && (
        <ScrollContainer>
          {/*<NavItem to='/perfil' label="Perfil" />*/}
          <NavItem to="/editais" label="Editais" />
          <NavItem to="/monitorias" label="Agenda" />
        </ScrollContainer>
      )}

      {perfil && perfil.trim() === "admin" && (
        <ScrollContainer>
          <NavItem to="/admin" label="Painel admin" />
          <NavItem to="/instituicoes" label="Instituições" />
          {/* LINHA ADICIONADA */}
          <NavItem to="/coordenadores" label="Coordenadores" />
          <NavItem to="/alunos" label="Alunos" />
          <NavItem to="/disciplinas" label="Disciplinas" />
        </ScrollContainer>
      )}

      {perfil && perfil.trim() === "coordenador" && (
        <ScrollContainer>
          <NavItem to="/coordenador" label="Coordenação" />
          <NavItem to="/alunos" label="Alunos" />
          <NavItem to="/disciplinas" label="Disciplinas" />
          <NavItem to="/monitorias" label="Monitoria" />
          <NavItem to="/professor" label="Painel Professor" />
        </ScrollContainer>
      )}
    </nav>
  );
}

export default NavBar;
