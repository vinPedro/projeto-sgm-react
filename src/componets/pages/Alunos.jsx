// pages/EditalListPage.jsx
import { useEffect, useState } from "react";
import AlunoCard from "../aluno/AlunoCard";
import axios from "axios";

export default function Monitorias() {

  const [alunos, setAlunos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/alunos`)
      .then(response => {
        setAlunos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar alunos:', error);
        setErro('Erro ao buscar os dados dos alunos');
      });
  }, []);

  if (erro) return <div>{erro}</div>;

  if (!alunos) return <div className="flex justify-center items-center min-h-[80vh] ">
    <h1 className="text-[1.2em] font-semibold">Carregando alunos...</h1>
  </div>

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <h1 className="text-2xl font-bold mb-4 text-center pt-[10px]">Lista de Alunos</h1>


      <div className="flex justify-center">
        <div className="flex flex-col pb-[10px]">
          {alunos.map((aluno) => (
            <AlunoCard key={aluno.id} aluno={aluno} />
          ))}
        </div>
      </div>

    </div>
  );
}
