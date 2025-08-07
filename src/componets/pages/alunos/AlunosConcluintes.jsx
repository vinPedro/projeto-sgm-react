import { useEffect, useState } from "react";
import AlunoCardConcluinte from "../../aluno/AlunoCardConcluinte";
import * as AlunoService from "../../services/AlunoService";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../form/Button";

export default function AlunosConcluintes() {

  const [alunos, setAlunos] = useState([]);
  const [erro, setErro] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    AlunoService.getAlunosConcluintes(id)
      .then((response) => {
        setAlunos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar alunos:", error);
        setErro("Erro ao buscar os dados dos alunos");
      });
  }, [id]);

  if (erro) return <div>{erro}</div>;

  if (!alunos)
    return (
      <div className="flex justify-center items-center min-h-[80vh] ">
        <h1 className="text-[1.2em] font-semibold">Carregando alunos...</h1>
      </div>
    );

  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <div className="flex flex-row justify-between items-center mb-6 w-[50%] max-w-[500px]">
        <h1 className="text-3xl font-bold">Alunos</h1>
        <Button onClick={() => navigate(`/alunos/novo/concluinte/${id}`)}>
          Adiconar Aluno
        </Button>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col pb-[10px]">
          {alunos.map((aluno) => (
            <AlunoCardConcluinte key={aluno.id} aluno={aluno} disciplinaId={id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
