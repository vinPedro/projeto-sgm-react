import { useEffect, useState } from "react";
import ProfessorCard from "../../professor/ProfessorCard";
import * as ProfessorService from "../../services/ProfessorService";
import { useNavigate } from "react-router-dom";
import Button from "../../form/Button"

export default function Professores() {
  const navigate = useNavigate();
  const [professores, setProfessores] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    ProfessorService.getProfessores()
      .then((response) => {
        setProfessores(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar professores:", error);
        setErro("Erro ao buscar os dados dos professores");
      });
  }, []);

  if (erro) return <div>{erro}</div>;

  if (!professores)
    return (
      <div className="flex justify-center items-center min-h-[80vh] ">
        <h1 className="text-[1.2em] font-semibold">Carregando professores...</h1>
      </div>
    );

  return (
    <div className="w-full flex flex-col justify-start items-center max-w-[600px] mx-auto p-6">
      <div className="flex justify-between items-center mb-6 min-w-full">
        <h1 className="text-3xl font-bold">Professores</h1>
        <Button onClick={() => navigate("/cadastrarProfessor")}>
          Criar Professor
        </Button>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col pb-[10px]">
          {professores.map((professor) => (
            <ProfessorCard key={professor.id} professor={professor} />
          ))}
        </div>
      </div>
    </div>
  );
}
