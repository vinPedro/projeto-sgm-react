import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../form/Button";
import * as ProfessorService from "../../services/ProfessorService";


export default function Professor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    
      ProfessorService.getProfessorById(id)
      .then((response) => {
        setProfessor(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar Professor:", error);
        setErro("Erro ao buscar os dados do professor");
      });
  }, [id]);

  const deletar = () => {
    ProfessorService.deleteProfessor(id)
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.error("Erro ao deletar professor:", err);
      });
  };

  if (erro) return <div>{erro}</div>;

  if (!professor)
    return (
      <div className="flex justify-center items-center min-h-[80vh] ">
        <h1 className="text-[1.2em] font-semibold">Carregando professor...</h1>
      </div>
    );

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col border-2 border-primaria rounded-[10px] min-h-[500px] min-w-[310px] w-[50vw] max-w-[600px] pt-[20px] p-[10px] mb-10 mt-10">
          <h1 className="text-center  font-semibold mb-10 text-[1.2em]">
            {professor.nome}
          </h1>
          <div>
            <p>
              <strong>ID: </strong> {professor.id}
            </p>
            <p>
              <strong>CPF: </strong> {professor.cpf}
            </p>
            <p>
              <strong>Matrícula: </strong> {professor.matricula}
            </p>
            <p>
              <strong>E-mail: </strong> {professor.email}
            </p>
            <p>
              <strong>E-mail Acadêmico: </strong> {professor.emailAcademico}
            </p>
          </div>
          <div className="mt-auto flex justify-center">
            <Button color="red" type="button" onClick={deletar}>
              Deletar
            </Button>
            <Button type="button" onClick={() => navigate(`/editarProfessor/${id}`)}>
              Editar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
