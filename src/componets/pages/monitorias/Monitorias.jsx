// pages/EditalListPage.jsx
import {useEffect, useState} from "react";
import MonitorCard from "../../monitoria/MonitorCard";
import {fetchMonitorias} from "../../monitoria/fetchMonitores";

export default function Monitorias() {

  const [monitores, setMonitores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMonitorias() {
      const data = await fetchMonitorias();
      setMonitores(data);
      setLoading(false);
    }

    loadMonitorias();
  }, []);

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <h1 className="text-2xl font-bold mb-4 text-center pt-[10px]">Lista de Agendas</h1>

      {loading ? (
        <p>Carregando agendas...</p>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col pb-[10px]">
            {monitores.map((monitor) => (
              <MonitorCard key={monitor.id} monitor={monitor} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
