// src/routes/routeConfig.js
import Login from "../pages/Login";
import SenhaEsquecida from "../pages/SenhaEsquecida";
import CadastrarAluno from "../pages/alunos/CadastroAluno";
import Aluno from "../pages/alunos/Aluno";
import EditarAluno from "../pages/alunos/EditarAluno";
import Monitorias from "../pages/monitorias/Monitorias";
import Alunos from "../pages/alunos/Alunos";
import Professor from "../pages/professores/Professor";
import Admin from "../pages/admins/Admin";
import Instituicoes from "../pages/instituicoes/Instituicoes";
import NovaInstituicao from "../pages/instituicoes/NovaInstituicao";
import EditarInstituicao from "../pages/instituicoes/EditarInstituicao";
import Disciplinas from "../pages/disciplinas/Disciplinas";
import NovaDisciplina from "../pages/disciplinas/NovaDisciplina";
import EditarDisciplina from "../pages/disciplinas/EditarDisciplina";
import Coordenadores from "../pages/coordenadores/Coordenadores";
import NovoCoordenador from "../pages/coordenadores/NovoCoordenador";
import EditarCoordenador from "../pages/coordenadores/EditarCoordenador";
import NovoProfessor from "../pages/professores/NovoProfessor";
import Professores from "../pages/professores/Professores";
import EditarProfessor from "../pages/professores/EditarProfessor";
import Atividades from "../pages/atividades/Atividades";
import NovaAtividade from "../pages/atividades/NovaAtividade";
import EditarAtividade from "../pages/atividades/EditarAtividade";
import Cursos from "../pages/cursos/Cursos";
import NovoCurso from "../pages/cursos/NovoCurso";
import EditarCurso from "../pages/cursos/EditarCurso";
import NovaMonitoria from "../pages/monitorias/NovaMonitoria";
import EditarMonitoria from "../pages/monitorias/EditarMonitoria";
import Processos from "../pages/processosSeletivos/ProcessosSeletivos";
import NovoProcesso from "../pages/processosSeletivos/NovoProcessoSeletivo";
import EditarProcesso from "../pages/processosSeletivos/EditarProcessoSeletivo";
import Monitores from "../pages/monitores/Monitores";
import NovoMonitor from "../pages/monitores/NovoMonitor";
import EditarMonitor from "../pages/monitores/EditarMonitor";
import MonitoriasProcessoSeletivo from "../pages/monitorias/MonitoriasProcessoSeletivo";
import MonitoriaInscritos from "../pages/monitorias/MonitoriaInscritos";
import DisciplinasProfessor from "../pages/disciplinas/DisciplinasProfessor";
import AlunosConcluintes from "../pages/alunos/AlunosConcluintes";
import CadastrarAlunoConcluinte from "../pages/alunos/CadastroAlunoConcluinte";


export const routeConfig = [
  // Públicas
  { path: "/", element: <Login />, isPrivate: false },
  { path: "/senhaEsquecida", element: <SenhaEsquecida />, isPrivate: false },
  { path: "/cadastrarAluno", element: <CadastrarAluno />, isPrivate: false },

  // Privadas
  {
    path: "/aluno/:id",
    element: <Aluno />,
    isPrivate: true,
    roles: ["aluno", "monitor", "professor", "coordenador", "admin"],
  },
  {
    path: "/editarAluno/:id",
    element: <EditarAluno />,
    isPrivate: true,
    roles: ["aluno", "monitor", "professor", "coordenador", "admin"],
  },
  {
    path: "/alunos",
    element: <Alunos />,
    isPrivate: true,
    roles: ["coordenador", "admin"],
  },
  {
    path: "/professor",
    element: <Professor />,
    isPrivate: true,
    roles: ["professor", "coordenador", "admin"],
  },
  {
    path: "/admin",
    element: <Admin />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/instituicoes",
    element: <Instituicoes />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/instituicoes/novo",
    element: <NovaInstituicao />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/instituicoes/:id",
    element: <EditarInstituicao />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/disciplinas",
    element: <Disciplinas />,
    isPrivate: true,
    roles: ["coordenador", "admin"],
  },
  {
    path: "/disciplinas/novo",
    element: <NovaDisciplina />,
    isPrivate: true,
    roles: ["coordenador", "admin"],
  },
  {
    path: "/disciplinas/:id",
    element: <EditarDisciplina />,
    isPrivate: true,
    roles: ["coordenador", "admin"],
  },
  {
    path: "/cadastrarProfessor",
    element: <NovoProfessor />,
    isPrivate: true,
    roles: ["coordenador", "admin"],
  },
  {
    path: "/professores",
    element: <Professores />,
    isPrivate: true,
    roles: ["coordenador", "admin"],
  },
  {
    path: "/professor/:id",
    element: <Professor />,
    isPrivate: true,
    roles: ["coordenador", "admin"],
  },
  {
    path: "/editarProfessor/:id",
    element: <EditarProfessor />,
    isPrivate: true,
    roles: ["coordenador", "admin"],
  },
  {
    path: "/coordenadores",
    element: <Coordenadores />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/coordenadores/novo",
    element: <NovoCoordenador />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/coordenadores/editar/:id",
    element: <EditarCoordenador />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/atividades",
    element: <Atividades />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/atividades/novo",
    element: <NovaAtividade />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/atividades/editar/:id",
    element: <EditarAtividade />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/cursos",
    element: <Cursos />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/cursos/novo",
    element: <NovoCurso />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/cursos/editar/:id",
    element: <EditarCurso />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/monitorias",
    element: <Monitorias />,
    isPrivate: true,
    roles: ["admin" ],
  },
  {
    path: "/monitoria/inscritos/:id",
    element: <MonitoriaInscritos />,
    isPrivate: true,
    roles: ["admin" ],
  },
  {
    path: "/monitoriasProcesso/:id",
    element: <MonitoriasProcessoSeletivo />,
    isPrivate: true,
    roles: ["admin","aluno", "monitor", "professor", "coordenador" ],
  },
  {
    path: "/monitorias/novo",
    element: <NovaMonitoria />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/monitoria/editar/:id",
    element: <EditarMonitoria />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/processos",
    element: <Processos />,
    isPrivate: true,
    roles: ["admin","aluno", "monitor", "professor", "coordenador" ],
  },
  {
    path: "/processos/novo",
    element: <NovoProcesso />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/processos/editar/:id",
    element: <EditarProcesso />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/monitores",
    element: <Monitores />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/monitores/novo",
    element: <NovoMonitor />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/monitores/editar/:id",
    element: <EditarMonitor />,
    isPrivate: true,
    roles: ["admin"],
  },
  {
    path: "/disciplinas/professor",
    element: <DisciplinasProfessor />,
    isPrivate: true,
    roles: ["admin","professor"],
  },

  {
    path: "/alunos/concluintes/:id",
    element: <AlunosConcluintes />,
    isPrivate: true,
    roles: ["admin","professor"],
  },
  {
    path: "/alunos/novo/concluinte/:id",
    element: <CadastrarAlunoConcluinte />,
    isPrivate: true,
    roles: ["admin","professor"],
  },
];
