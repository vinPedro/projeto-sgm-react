// pages/EditalListPage.jsx
import { useEffect, useState } from "react";
import AlunoCard from "../aluno/AlunoCard";
import { fetchAlunos } from "../aluno/fetchAlunos";

export default function Monitorias() {

  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAlunos() {
      const data = await fetchAlunos();
      setAlunos(data);
      setLoading(false);
    }

    loadAlunos();
  }, []);

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <h1 className="text-2xl font-bold mb-4 text-center pt-[10px]">Lista de Alunos</h1>

      {loading ? (
        <p>Carregando alunos...</p>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col pb-[10px]">
            {alunos.map((aluno) => (
              <AlunoCard key={aluno.id} aluno={aluno} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
