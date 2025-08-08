import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../form/Button";
import * as ProcessoService from "../../services/ProcessoSeletivoService";
import { useAuth } from "../../AuthContext";

export default function ProcessosSeletivos() {
  const navigate = useNavigate();
  const [processos, setProcessos] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    carregarProcessos();
  }, []);

  function carregarProcessos() {
    setCarregando(true);
    ProcessoService.getProcessos()
      .then((response) => {
        setProcessos(response.data);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar processos:", error);
        setErro("Erro ao carregar processos.");
        setCarregando(false);
      });
  }

  function deletarProcesso(id) {
    if (window.confirm("Tem certeza que deseja excluir este processo?")) {
      ProcessoService.deleteProcesso(id)
        .then(() => {
          setProcessos(processos.filter((d) => d.id !== id));
        })
        .catch((error) => {
          console.error("Erro ao deletar processo:", error);
          alert("Erro ao deletar ptocesso.");
        });
    }
  }

  if (carregando)
    return <p className="text-center mt-4">Carregando Processos...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Processos Seletivos</h1>
        {Array.isArray(profile) && profile.some(p => p === "coordenador") && (
        <Button onClick={() => navigate("/processos/novo")}>
          Criar Processo
        </Button>)}
      </div>

      {processos.length === 0 ? (
        <p>Nenhum Processo cadastrado.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left">Número</th>
              <th className="p-3 border-b border-gray-300 text-left">
                Início
              </th>
              <th className="p-3 border-b border-gray-300 text-left">
                Fim
              </th>
              <th className="p-3 border-b border-gray-300 text-left">Instituição</th>
              <th className="p-3 border-b border-gray-300 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {processos.map((processo) => (
              <tr key={processo.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{processo.numero}</td>
                <td className="p-3 border-b border-gray-300">
                  {processo.inicio}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {processo.fim}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {processo.instituicaoResponseDTO?.nome}
                </td>
              
                <td className="p-3 border-b border-gray-300 text-center space-x-2">
                  {Array.isArray(profile) && profile.some(p => p === "coordenador") && (
                  <Button
                    onClick={() => navigate(`/processos/editar/${processo.id}`)}
                    color="color"
                  >
                    Editar
                  </Button>)}

                  {Array.isArray(profile) && profile.some(p => p === "coordenador") && (
                  <Button
                    onClick={() => deletarProcesso(processo.id)}
                    color="red"
                  >
                    Excluir
                  </Button>)}

                  <Button
                    onClick={() => navigate(`/monitoriasProcesso/${processo.id}`)}
                  >
                    Vizualizar
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