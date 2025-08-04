import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../form/Button";
import * as MonitoriaService from "../../services/MonitoriaService";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export default function MonitoriasProcessoSeletivo() {
  const navigate = useNavigate();
  const [monitorias, setMonitorias] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [inscricoesAluno, setInscricoesAluno] = useState([]);
  const { profile, user } = useAuth();
  const { id } = useParams();


  const carregarMonitorias = useCallback(() => {
    setCarregando(true);
    MonitoriaService.getMonitoriasPorProcessoSeletivo(id)
      .then((response) => {
        setMonitorias(response.data);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar monitorias:", error);
        setErro("Erro ao carregar monitorias.");
        setCarregando(false);
      });
  }, [id]);

  const carregarInscricoesAluno = useCallback(() => {
    if (!user?.id) return;

    MonitoriaService.getInscricoesPorAluno(user.id)
      .then((response) => {
        setInscricoesAluno(response.data); // Deve conter monitoriaId ou monitoria.id
      })
      .catch((error) => {
        console.error("Erro ao buscar inscrições do aluno:", error);
      });
  }, [user]);


  useEffect(() => {
    carregarMonitorias();
    carregarInscricoesAluno();
  }, [carregarMonitorias, carregarInscricoesAluno]);

  function deletarMonitoria(id) {
    if (window.confirm("Tem certeza que deseja excluir esta monitoria?")) {

      MonitoriaService.deleteMonitoria(id)
        .then(() => {
          setMonitorias(monitorias.filter((d) => d.id !== id));
          navigate(0);
        })
        .catch((error) => {
          console.error("Erro ao deletar monitoria:", error);
          alert("Erro ao deletar monitoria.");
        });
    }
  }

  function inscrever_seEmMonitoria(id) {
    if (window.confirm("Tem certeza que deseja inscrever-se nesta monitoria?")) {
      const inscricao = {
        monitoriaId: id,
        alunoId: user.id,
      }

      MonitoriaService.inscrever_seEmMonitoria(inscricao)
        .then(() => {
          alert("Inscrição realizada com sucesso!");
          navigate(0);
        })
        .catch((error) => {
          console.error("Erro ao increver-se na monitoria:", error);
          alert("Erro ao increver-se na monitoria.");
        });
    }
  }

  function cancelarInscricao(monitoriaId) {
    if (window.confirm("Tem certeza que deseja cancelar sua inscrição nesta monitoria?")) {
      
      const inscricao = {
        monitoriaId: monitoriaId,
        alunoId: user.id,
      };

      MonitoriaService.cancelarInscricao(inscricao)
        .then(() => {
          alert("Inscrição cancelada com sucesso!");
          setInscricoesAluno(inscricoesAluno.filter(i => i.id !== monitoriaId));
          navigate(0);
        })
        .catch((error) => {
          console.error("Erro ao cancelar inscrição:", error);
          alert("Erro ao cancelar inscrição.");
        });
    }
  }

  function jaInscrito(monitoriaId) {
    return inscricoesAluno.some((i) => i.id === monitoriaId);
  }

  if (carregando)
    return <p className="text-center mt-4">Carregando monitorias...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Monitorias</h1>
      </div>

      {monitorias.length === 0 ? (
        <p>Nenhuma monitoria cadastrada.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left">Monitorias</th>
              <th className="p-3 border-b border-gray-300 text-left">
                Vagas
              </th>
              <th className="p-3 border-b border-gray-300 text-left">
                Carga Horária
              </th>
              <th className="p-3 border-b border-gray-300 text-left">
                Processo
              </th>
              <th className="p-3 border-b border-gray-300 text-left">Curso</th>
              <th className="p-3 border-b border-gray-300 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {monitorias.map((monitoria) => (
              <tr key={monitoria.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{monitoria.disciplinaResponseDTO.nome}</td>
                <td className="p-3 border-b border-gray-300">
                  {monitoria.numeroVaga}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {monitoria.cargaHoraria}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {monitoria.professorResponseDTO?.nome ?? "N/A"}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {monitoria.processoSeletivoResponseDTO?.numero ?? "N/A"}
                </td>

                <td className="p-3 border-b border-gray-300 text-center space-x-2">
                  {Array.isArray(profile) && profile.some(p => p === "coordenador") && (
                    <Button
                      onClick={() => navigate(`/monitoria/editar/${monitoria.id}`)}
                      color="color"
                    >
                      Editar
                    </Button>)}
                  {Array.isArray(profile) && profile.some(p => p === "coordenador") && (
                    <Button
                      onClick={() => deletarMonitoria(monitoria.id)}
                      color="red"
                    >
                      Excluir
                    </Button>)}
                  {Array.isArray(profile) && profile.some(p => p === "aluno") && (
                    jaInscrito(monitoria.id) ? (
                      <Button
                        onClick={() => cancelarInscricao(monitoria.id)}
                        color="color"
                      >
                        Cancelar inscrição
                      </Button>
                    ) : (
                      <Button
                        onClick={() => inscrever_seEmMonitoria(monitoria.id)}
                      >
                        Inscrever-se
                      </Button>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
