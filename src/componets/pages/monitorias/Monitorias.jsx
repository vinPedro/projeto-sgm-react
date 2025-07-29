import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../form/Button";
import * as MonitoriaService from "../../services/MonitoriaService";

export default function Monitorias() {
  const navigate = useNavigate();
  const [monitorias, setMonitorias] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarMonitorias();
  }, []);

  function carregarMonitorias() {
    setCarregando(true);
    MonitoriaService.getMonitorias()
      .then((response) => {
        setMonitorias(response.data);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar monitorias:", error);
        setErro("Erro ao carregar monitorias.");
        setCarregando(false);
      });
  }

  function deletarMonitoria(id) {
    if (window.confirm("Tem certeza que deseja excluir esta monitoria?")) {
      MonitoriaService.deleteMonitoria(id)
        .then(() => {
          setMonitorias(monitorias.filter((d) => d.id !== id));
        })
        .catch((error) => {
          console.error("Erro ao deletar monitoria:", error);
          alert("Erro ao deletar monitoria.");
        });
    }
  }

  if (carregando)
    return <p className="text-center mt-4">Carregando monitorias...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Monitorias</h1>
        <Button onClick={() => navigate("/monitorias/novo")}>
          Criar Monitoria
        </Button>
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
                  <Button
                    onClick={() => navigate(`/monitoria/editar/${monitoria.id}`)}
                    color="color"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => deletarMonitoria(monitoria.id)}
                    color="red"
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
