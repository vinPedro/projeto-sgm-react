// src/routes/routeConfig.js
import Login from "../pages/Login";
import SenhaEsquecida from "../pages/SenhaEsquecida";
import Pessoa from "../pages/Pessoa";

import CadastrarAluno from "../pages/alunos/CadastroAluno";
import Aluno from "../pages/alunos/Aluno";
import EditarAluno from "../pages/alunos/EditarAluno";
import Alunos from "../pages/alunos/Alunos";
import AlunosConcluintes from "../pages/alunos/AlunosConcluintes";
import CadastrarAlunoConcluinte from "../pages/alunos/CadastroAlunoConcluinte";

import Admin from "../pages/admins/Admin";

import Instituicoes from "../pages/instituicoes/Instituicoes";
import NovaInstituicao from "../pages/instituicoes/NovaInstituicao";
import EditarInstituicao from "../pages/instituicoes/EditarInstituicao";

import Disciplinas from "../pages/disciplinas/Disciplinas";
import NovaDisciplina from "../pages/disciplinas/NovaDisciplina";
import EditarDisciplina from "../pages/disciplinas/EditarDisciplina";
import DisciplinasProfessor from "../pages/disciplinas/DisciplinasProfessor";

import Coordenadores from "../pages/coordenadores/Coordenadores";
import NovoCoordenador from "../pages/coordenadores/NovoCoordenador";
import EditarCoordenador from "../pages/coordenadores/EditarCoordenador";

import Professor from "../pages/professores/Professor";
import NovoProfessor from "../pages/professores/NovoProfessor";
import Professores from "../pages/professores/Professores";
import EditarProfessor from "../pages/professores/EditarProfessor";

import Atividades from "../pages/atividades/Atividades";
import NovaAtividade from "../pages/atividades/NovaAtividade";
import EditarAtividade from "../pages/atividades/EditarAtividade";

import Cursos from "../pages/cursos/Cursos";
import NovoCurso from "../pages/cursos/NovoCurso";
import EditarCurso from "../pages/cursos/EditarCurso";

import Monitorias from "../pages/monitorias/Monitorias";
import NovaMonitoria from "../pages/monitorias/NovaMonitoria";
import EditarMonitoria from "../pages/monitorias/EditarMonitoria";
import MonitoriasProcessoSeletivo from "../pages/monitorias/MonitoriasProcessoSeletivo";
import MonitoriaInscritos from "../pages/monitorias/MonitoriaInscritos";

import Processos from "../pages/processosSeletivos/ProcessosSeletivos";
import NovoProcesso from "../pages/processosSeletivos/NovoProcessoSeletivo";
import EditarProcesso from "../pages/processosSeletivos/EditarProcessoSeletivo";

import Monitores from "../pages/monitores/Monitores";
import NovoMonitor from "../pages/monitores/NovoMonitor";
import EditarMonitor from "../pages/monitores/EditarMonitor";


export const routeConfig = [
  // Públicas
  { path: "/", element: <Login />, isPrivate: false },
  { path: "/senhaEsquecida", element: <SenhaEsquecida />, isPrivate: false },
  { path: "/cadastrarAluno", element: <CadastrarAluno />, isPrivate: false },

  // Privadas

  //Alunos
  {
    path: "/aluno/:id",
    element: <Aluno />,
    isPrivate: true,
    roles: ["coordenador", "admin"],
  },
  {
    path: "/editarAluno/:id",
    element: <EditarAluno />,
    isPrivate: true,
    roles: ["coordenador", "admin"],
  },
  {
    path: "/alunos",
    element: <Alunos />,
    isPrivate: true,
    roles: ["coordenador", "admin"],
  },
  {
    path: "/alunos/concluintes/:id",
    element: <AlunosConcluintes />,
    isPrivate: true,
    roles: ["admin","professor", "coordenador"],
  },
  {
    path: "/alunos/novo/concluinte/:id",
    element: <CadastrarAlunoConcluinte />,
    isPrivate: true,
    roles: ["admin","professor", "coordenador"],
  },


  //Professores
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



  //Admin
  {
    path: "/admin",
    element: <Admin />,
    isPrivate: true,
    roles: ["admin"],
  },


  //Instituições
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


  //Disciplinas
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
    path: "/disciplinas/professor",
    element: <DisciplinasProfessor />,
    isPrivate: true,
    roles: ["admin","professor", "coordenador"],
  },




  //Coordenadores
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



  //Atividades
  {
    path: "/atividades",
    element: <Atividades />,
    isPrivate: true,
    roles: ["admin","professor", "coordenador", "monitor"],
  },
  {
    path: "/atividades/novo",
    element: <NovaAtividade />,
    isPrivate: true,
    roles: ["admin","professor", "coordenador", "monitor"],
  },
  {
    path: "/atividades/editar/:id",
    element: <EditarAtividade />,
    isPrivate: true,
    roles: ["admin","professor", "coordenador", "monitor"],
  },


  //Cursos
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



  //Monitorias
  {
    path: "/monitorias",
    element: <Monitorias />,
    isPrivate: true,
    roles: ["admin", "coordenador", "professor" ],
  },
  {
    path: "/monitoria/inscritos/:id",
    element: <MonitoriaInscritos />,
    isPrivate: true,
    roles: ["admin", "coordenador", "professor" ],
  },
  {
    path: "/monitoriasProcesso/:id",
    element: <MonitoriasProcessoSeletivo />,
    isPrivate: true,
    roles: ["admin", "coordenador", "professor", "monitor", "aluno"],
  },
  {
    path: "/monitorias/novo",
    element: <NovaMonitoria />,
    isPrivate: true,
    roles: ["admin", "coordenador", "professor"],
  },
  {
    path: "/monitoria/editar/:id",
    element: <EditarMonitoria />,
    isPrivate: true,
    roles: ["admin", "coordenador", "professor"],
  },



  //Processos
  {
    path: "/processos",
    element: <Processos />,
    isPrivate: true,
    roles: ["admin", "aluno", "coordenador", "professor", "monitor"],
  },
  {
    path: "/processos/novo",
    element: <NovoProcesso />,
    isPrivate: true,
    roles: ["admin", "coordenador"],
  },
  {
    path: "/processos/editar/:id",
    element: <EditarProcesso />,
    isPrivate: true,
    roles: ["admin", "coordenador"],
  },




  //Monitores
  {
    path: "/monitores",
    element: <Monitores />,
    isPrivate: true,
    roles: ["admin", "coordenador", "professor"],
  },
  {
    path: "/monitores/novo",
    element: <NovoMonitor />,
    isPrivate: true,
    roles: ["admin", "coordenador", "professor"],
  },
  {
    path: "/monitores/editar/:id",
    element: <EditarMonitor />,
    isPrivate: true,
    roles: ["admin", "coordenador", "professor"],
  },



  //Pessoas
  {
    path: "/pessoa",
    element: <Pessoa />,
    isPrivate: true,
    roles: ["admin","aluno", "monitor", "professor", "coordenador" ],
  },


];
