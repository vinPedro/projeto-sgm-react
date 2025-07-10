import { jwtDecode } from 'jwt-decode';
import NavItem from './NavItem';
import ScrollContainer from './ScrollContainer';

function NavBar() {

    const token = localStorage.getItem('token');
    let perfil = '';

    if (token) {
        try {
            const decoded = jwtDecode(token);
            perfil = decoded.perfil;
        } catch (e) {
            console.error(e);
            perfil = '';
        }
    }

    return (
        <nav>
            {/* Exibir item apenas para certos perfis */}
            {perfil === 'monitor' && (
                <ScrollContainer>
                    <NavItem to='/monitor' label="Monitoria" />
                </ScrollContainer>
            )}

            {perfil === 'professor' && (
                <ScrollContainer>
                    <NavItem to='/professor' label="Painel Professor" />
                </ScrollContainer>
            )}

            {perfil === 'aluno' && (
                <ScrollContainer>
                    <NavItem to='/perfil' label="Perfil" />
                    <NavItem to='/editais' label="Editais" />
                    <NavItem to='/monitorias' label="Agenda" />
                </ScrollContainer>
            )}

            {perfil === 'admin' && (
                <ScrollContainer>
                    <NavItem to='/admin' label="Painel admin" />
                    <NavItem to='/alunos' label="Alunos" />
                </ScrollContainer>
            )}

            {perfil === 'coordenador' && (
                <ScrollContainer>
                    <NavItem to='/coordenador' label="Coordenação" />
                    <NavItem to='/alunos' label="Alunos" />
                    <NavItem to='/professor' label="Painel Professor" />
                    <NavItem to='/professor' label="Painel Professor" />
                    <NavItem to='/monitor' label="Monitoria" />
                    <NavItem to='/coordenador' label="Coordenação" />
                    <NavItem to='/professor' label="Painel Professor" />
                    <NavItem to='/professor' label="Painel Professor" />
                    <NavItem to='/professor' label="Painel Professor" />
                    <NavItem to='/monitor' label="Monitoria" />
                    <NavItem to='/coordenador' label="Coordenação" />
                    <NavItem to='/professor' label="Painel Professor" />
                    <NavItem to='/professor' label="Painel Professor" />
                    <NavItem to='/professor' label="Painel Professor" />
                    <NavItem to='/monitor' label="Monitoria" />
                    <NavItem to='/professor' label="Painel Professor" />
                    <NavItem to='/monitor' label="Monitoria" />
                </ScrollContainer>
            )}
        </nav>
    )
}

export default NavBar;