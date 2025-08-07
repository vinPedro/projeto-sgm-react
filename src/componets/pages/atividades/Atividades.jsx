import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../form/Button";
import * as AtividadeService from "../../services/AtividadeService";

export default function Atividades() {
  const navigate = useNavigate();
  const [atividades, setAtividades] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarAtividades();
  }, []);

  function carregarAtividades() {
    setCarregando(true);
    AtividadeService.getAtividades()
      .then((response) => {
        setAtividades(response.data);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar atividades:", error);
        setErro("Erro ao carregar atividades.");
        setCarregando(false);
      });
  }

  function deletarAtividade(id) {
    if (window.confirm("Tem certeza que deseja excluir esta atividade?")) {
      AtividadeService.deleteAtividade(id)
        .then(() => {
          setAtividades(atividades.filter((d) => d.id !== id));
        })
        .catch((error) => {
          console.error("Erro ao deletar atividade:", error);
          alert("Erro ao deletar atividade.");
        });
    }
  }

  if (carregando)
    return <p className="text-center mt-4">Carregando atividades...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Atividades</h1>
        <Button onClick={() => navigate("/atividades/novo")}>
          Criar Atividade
        </Button>
      </div>

      {atividades.length === 0 ? (
        <p>Nenhuma atividade cadastrada.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left">Disciplina Monitoria</th>
              <th className="p-3 border-b border-gray-300 text-left">
                Data-Hora
              </th>
              <th className="p-3 border-b border-gray-300 text-center">
                Responsável
              </th>
              <th className="p-3 border-b border-gray-300 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {atividades.map((ativ) => (
              <tr key={ativ.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{ativ.monitoriaResponseDTO.disciplinaResponseDTO.nome}</td>
                <td className="p-3 border-b border-gray-300">
                  {ativ.dataHora}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {ativ.matricula}
                </td>


                <td className="p-3 border-b border-gray-300 text-center space-x-2">
                  <Button
                    onClick={() => navigate(`/atividades/editar/${ativ.id}`)}
                    color="color"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => deletarAtividade(ativ.id)}
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
