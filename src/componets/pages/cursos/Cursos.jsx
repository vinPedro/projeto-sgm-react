import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../form/Button";
import * as CursoService from "../../services/CursoService";

export default function Disciplinas() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarCursos();
  }, []);

  function carregarCursos() {
    setCarregando(true);
    CursoService.getCursos()
      .then((response) => {
        setCursos(response.data);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar cursos:", error);
        setErro("Erro ao carregar cursos.");
        setCarregando(false);
      });
  }

  function deletarCurso(id) {
    if (window.confirm("Tem certeza que deseja excluir este curso?")) {
      CursoService.deleteCurso(id)
        .then(() => {
          setCursos(cursos.filter((d) => d.id !== id));
        })
        .catch((error) => {
          console.error("Erro ao deletar curso:", error);
          alert("Erro ao deletar curso.");
        });
    }
  }

  if (carregando)
    return <p className="text-center mt-4">Carregando cursos...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cursos</h1>
        <Button onClick={() => navigate("/cursos/novo")}>
          Criar Cursos
        </Button>
      </div>

      {cursos.length === 0 ? (
        <p>Nenhum Curso cadastrado.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left">Nome</th>
              <th className="p-3 border-b border-gray-300 text-left">
                Nível
              </th>
              <th className="p-3 border-b border-gray-300 text-left">
                Duração
              </th>
              <th className="p-3 border-b border-gray-300 text-left">Instituição</th>
              <th className="p-3 border-b border-gray-300 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{curso.nome}</td>
                <td className="p-3 border-b border-gray-300">
                  {curso.nivel}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {curso.duracao ?? "N/A"}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {curso.instituicaoResponseDTO?.nome ?? "N/A"}
                </td>

                <td className="p-3 border-b border-gray-300 text-center space-x-2">
                  <Button
                    onClick={() => navigate(`/cursos/editar/${curso.id}`)}
                    color="color"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => deletarCurso(curso.id)}
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
