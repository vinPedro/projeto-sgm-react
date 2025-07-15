import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../form/Button";

export default function Instituicoes() {
  const navigate = useNavigate();
  const [instituicoes, setInstituicoes] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarInstituicoes();
  }, []);

  function carregarInstituicoes() {
    setCarregando(true);
    axios.get("http://localhost:8080/api/instituicoes")
      .then(response => {
        setInstituicoes(response.data);
        setCarregando(false);
      })
      .catch(error => {
        console.error("Erro ao buscar instituições:", error);
        setErro("Erro ao carregar instituições.");
        setCarregando(false);
      });
  }

  function deletarInstituicao(id) {
    if (window.confirm("Tem certeza que deseja excluir essa instituição?")) {
      axios.delete(`http://localhost:8080/api/instituicoes/${id}`)
        .then(() => {
          // Atualiza lista removendo a instituição deletada
          setInstituicoes(instituicoes.filter(inst => inst.id !== id));
        })
        .catch(error => {
          console.error("Erro ao deletar instituição:", error);
          alert("Erro ao deletar instituição.");
        });
    }
  }

  if (carregando) return <p>Carregando instituições...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Instituições</h1>
        <Button onClick={() => navigate("/instituicoes/novo")}>Criar Instituição</Button>
      </div>

      {instituicoes.length === 0 ? (
        <p>Nenhuma instituição cadastrada.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left">Nome</th>
              <th className="p-3 border-b border-gray-300 text-left">CNPJ</th>
              <th className="p-3 border-b border-gray-300 text-left">Email</th>
              <th className="p-3 border-b border-gray-300 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {instituicoes.map(inst => (
              <tr key={inst.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{inst.nome}</td>
                <td className="p-3 border-b border-gray-300">{inst.cnpj}</td>
                <td className="p-3 border-b border-gray-300">{inst.email}</td>
                <td className="p-3 border-b border-gray-300 text-center space-x-2">
                  <Button
                    onClick={() => navigate(`/instituicoes/${inst.id}`)}
                    color="color"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => deletarInstituicao(inst.id)}
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
