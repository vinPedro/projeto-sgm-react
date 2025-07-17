import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/Login.jsx";
import Aluno from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/Aluno.jsx";
import Professor from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/Professor.jsx";
import Coordenador from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/Coordenador.jsx";
import Monitor from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/Monitor.jsx";
import Admin from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/Admin.jsx";
import CadastrarAluno from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/CadastroAluno.jsx";
import SenhaEsquecida from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/SenhaEsquecida.jsx";
import RotaProtegida from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/rotas/RotaProtegida.jsx";
import Cabeca from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/layout/Conteiner.jsx";
import Perfil from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/Perfil.jsx";
import Editais from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/Editais.jsx";
import Monitorias from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/Monitorias.jsx";
import Alunos from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/Alunos.jsx";
import Instituicoes from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/Instituicoes.jsx";
import NovaInstituicao from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/NovaInstituicao.jsx";
import EditarInstituicao from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/EditarInstituicao.jsx";
import Disciplinas from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/Disciplinas.jsx";
import NovaDisciplina from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/NovaDisciplina.jsx";
import EditarDisciplina from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/pages/EditarDisciplina.jsx";

// NOVOS IMPORTS PARA O CRUD DE COORDENADORES
import Coordenadores from "../pages/Coordenadores.jsx";
import NovoCoordenador from "../pages/NovoCoordenador.jsx";

function AppRoutes() {
    const location = useLocation();

    // rotas que não devem exibir a NavBar
    const rotasSemNav = ["/", "/senhaEsquecida", "/cadastrarAluno"];
    const mostrarCon = !rotasSemNav.includes(location.pathname);

    return (
        <>
            {mostrarCon && <Cabeca />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/senhaEsquecida" element={<SenhaEsquecida />} />

                <Route
                    path="/aluno/:id"
                    element={
                        <RotaProtegida
                            perfilPermitido={[
                                "professor",
                                "coordenador",
                                "aluno",
                                "monitor",
                                "admin",
                            ]}
                        >
                            <Aluno />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/perfil/:id"
                    element={
                        <RotaProtegida
                            perfilPermitido={[
                                "professor",
                                "coordenador",
                                "aluno",
                                "monitor",
                                "admin",
                            ]}
                        >
                            <Perfil />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/editais"
                    element={
                        <RotaProtegida
                            perfilPermitido={[
                                "professor",
                                "coordenador",
                                "aluno",
                                "monitor",
                                "admin",
                            ]}
                        >
                            <Editais />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/monitorias"
                    element={
                        <RotaProtegida
                            perfilPermitido={[
                                "professor",
                                "coordenador",
                                "aluno",
                                "monitor",
                                "admin",
                            ]}
                        >
                            <Monitorias />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/alunos"
                    element={
                        <RotaProtegida perfilPermitido={["coordenador", "admin"]}>
                            <Alunos />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/professor"
                    element={
                        <RotaProtegida perfilPermitido={["professor", "coordenador"]}>
                            <Professor />
                        </RotaProtegida>
                    }
                />

                <Route path="/cadastrarAluno" element={<CadastrarAluno />} />

                <Route
                    path="/coordenador"
                    element={
                        <RotaProtegida perfilPermitido="coordenador">
                            <Coordenador />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/monitor"
                    element={
                        <RotaProtegida perfilPermitido="monitor">
                            <Monitor />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <RotaProtegida perfilPermitido="admin">
                            <Admin />
                        </RotaProtegida>
                    }
                />

                {/* ROTAS ADICIONADAS PARA GERENCIAR COORDENADORES */}
                <Route
                    path="/coordenadores"
                    element={
                        <RotaProtegida perfilPermitido="admin">
                            <Coordenadores />
                        </RotaProtegida>
                    }
                />
                <Route
                    path="/coordenadores/novo"
                    element={
                        <RotaProtegida perfilPermitido="admin">
                            <NovoCoordenador />
                        </RotaProtegida>
                    }
                />

                {/* BÔNUS: Adicionei proteção às rotas de Instituição que estavam abertas */}
                <Route
                    path="/instituicoes"
                    element={
                        <RotaProtegida perfilPermitido="admin">
                            <Instituicoes />
                        </RotaProtegida>
                    }
                />
                <Route
                    path="/instituicoes/novo"
                    element={
                        <RotaProtegida perfilPermitido="admin">
                            <NovaInstituicao />
                        </RotaProtegida>
                    }
                />
                <Route
                    path="/instituicoes/:id"
                    element={
                        <RotaProtegida perfilPermitido="admin">
                            <EditarInstituicao />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/disciplinas"
                    element={
                        <RotaProtegida perfilPermitido={["coordenador", "admin"]}>
                            <Disciplinas />
                        </RotaProtegida>
                    }
                />
                <Route
                    path="/disciplinas/novo"
                    element={
                        <RotaProtegida perfilPermitido={["coordenador", "admin"]}>
                            <NovaDisciplina />
                        </RotaProtegida>
                    }
                />
                <Route
                    path="/disciplinas/:id"
                    element={
                        <RotaProtegida perfilPermitido={["coordenador", "admin"]}>
                            <EditarDisciplina />
                        </RotaProtegida>
                    }
                />
            </Routes>
        </>
    );
}

export default AppRoutes;