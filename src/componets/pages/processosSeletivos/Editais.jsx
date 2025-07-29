// pages/EditalListPage.jsx
import React, {useEffect, useState} from "react";
import EditalCard from "../../edital/EditalCard";
import {fetchEditais} from "../../edital/fetchEditais";


export default function Editais() {

  const [editais, setEditais] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEditais() {
      const data = await fetchEditais();
      setEditais(data);
      setLoading(false);
    }

    loadEditais();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <h1 className="text-2xl font-bold mb-4 text-center pt-[10px]">Lista de Editais</h1>

      {loading ? (
        <p>Carregando editais...</p>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col pb-[10px]">
            {editais.map((edital) => (
              <EditalCard key={edital.id} edital={edital} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
