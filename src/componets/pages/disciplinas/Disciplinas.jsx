import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../form/Button";
import * as DisciplinaService from "../../services/DisciplinaService";

export default function Disciplinas() {
  const navigate = useNavigate();
  const [disciplinas, setDisciplinas] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDisciplinas();
  }, []);

  function carregarDisciplinas() {
    setCarregando(true);
    DisciplinaService.getDisciplinas()
      .then((response) => {
        setDisciplinas(response.data);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar disciplinas:", error);
        setErro("Erro ao carregar disciplinas.");
        setCarregando(false);
      });
  }

  function deletarDisciplina(id) {
    if (window.confirm("Tem certeza que deseja excluir esta disciplina?")) {
      DisciplinaService.deleteDisciplina(id)
        .then(() => {
          setDisciplinas(disciplinas.filter((d) => d.id !== id));
        })
        .catch((error) => {
          console.error("Erro ao deletar disciplina:", error);
          alert("Erro ao deletar disciplina.");
        });
    }
  }

  if (carregando)
    return <p className="text-center mt-4">Carregando disciplinas...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Disciplinas</h1>
        <Button onClick={() => navigate("/disciplinas/novo")}>
          Criar Disciplina
        </Button>
      </div>

      {disciplinas.length === 0 ? (
        <p>Nenhuma disciplina cadastrada.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left">Nome</th>
              <th className="p-3 border-b border-gray-300 text-left">
                Carga Horária
              </th>
              <th className="p-3 border-b border-gray-300 text-left">
                Professor
              </th>
              <th className="p-3 border-b border-gray-300 text-left">Curso</th>
              <th className="p-3 border-b border-gray-300 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {disciplinas.map((disc) => (
              <tr key={disc.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{disc.nome}</td>
                <td className="p-3 border-b border-gray-300">
                  {disc.cargaHoraria}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {disc.professorResponseDTO?.nome ?? "N/A"}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {disc.cursoResponseDTO?.nome ?? "N/A"}
                </td>

                <td className="p-3 border-b border-gray-300 text-center space-x-2">
                  <Button
                    onClick={() => navigate(`/disciplinas/${disc.id}`)}
                    color="color"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => deletarDisciplina(disc.id)}
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
