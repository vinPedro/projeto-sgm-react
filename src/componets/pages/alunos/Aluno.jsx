import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../form/Button";
import * as AlunoService from "../../services/AlunoService";


export default function Aluno() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aluno, setAluno] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    
      AlunoService.getAlunoById(id)
      .then((response) => {
        setAluno(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar aluno:", error);
        setErro("Erro ao buscar os dados do aluno");
      });
  }, [id]);

  const deletar = () => {
    AlunoService.deleteAluno(id)
      .then(() => {
        navigate(-1, { replace: true });
      })
      .catch((err) => {
        console.error("Erro ao deletar aluno:", err);
      });
  };

  if (erro) return <div>{erro}</div>;

  if (!aluno)
    return (
      <div className="flex justify-center items-center min-h-[80vh] ">
        <h1 className="text-[1.2em] font-semibold">Carregando aluno...</h1>
      </div>
    );

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col border-2 border-primaria rounded-[10px] min-h-[500px] min-w-[310px] w-[50vw] max-w-[600px] pt-[20px] p-[10px] mb-10 mt-10">
          <h1 className="text-center  font-semibold mb-10 text-[1.2em]">
            {aluno.nome}
          </h1>
          <div>
            <p>
              <strong>ID: </strong> {aluno.id}
            </p>
            <p>
              <strong>CPF: </strong> {aluno.cpf}
            </p>
            <p>
              <strong>Matrícula: </strong> {aluno.matricula}
            </p>
            <p>
              <strong>CRE: </strong> {aluno.cre}
            </p>
            <p>
              <strong>E-mail: </strong> {aluno.email}
            </p>
            <p>
              <strong>E-mail Acadêmico: </strong> {aluno.emailAcademico}
            </p>
          </div>
          <div className="mt-auto flex justify-center">
            <Button color="red" type="button" onClick={deletar}>
              Deletar
            </Button>
            <Button type="button" onClick={() => navigate(`/editarAluno/${id}`)}>
              Editar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
