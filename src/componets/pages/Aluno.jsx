import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
//import axios from "axios";
import { fetchAlunos } from "../aluno/fetchAlunos";
import Button from "../form/Button"

export default function Aluno() {
  const { id } = useParams();
  const [aluno, setAluno] = useState(null);

  //const [erro, setErro] = useState(null);

  useEffect(() => {
    async function loadAlunos() {
      const data = await fetchAlunos();
      const encontrado = data.find((a) => a.id === parseInt(id));
      setAluno(encontrado);
    }

    loadAlunos();
  }, [id]);

  if (!aluno) return <div className="flex justify-center items-center min-h-[80vh] ">
    <h1 className="text-[1.2em] font-semibold">Carregando aluno...</h1>
  </div>


  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col border-2 border-primaria rounded-[10px] min-h-[500px] min-w-[310px] w-[50vw] max-w-[600px] pt-[20px] p-[10px] mb-10 mt-10">
          <h1 className="text-center  font-semibold mb-10 text-[1.2em]">{aluno.nome}</h1>
          <div>
            <p><strong>ID: </strong> {aluno.id}</p>
            <p><strong>CPF: </strong> {aluno.cpf}</p>
            <p><strong>Matrícula: </strong> {aluno.matricula}</p>
            <p><strong>E-mail: </strong> {aluno.email}</p>
            <p><strong>E-mail Acadêmico: </strong> {aluno.emailAcademico}</p>
            <p><strong>Curso: </strong> {aluno.curso}</p>
          </div>
          <div className="mt-auto flex justify-center">
            <Button color="color">
              Deletar
            </Button>
            <Button>
              Editar
            </Button>
          </div>
            
          
          
          
        </div>
      </div>
    </>
  )
}