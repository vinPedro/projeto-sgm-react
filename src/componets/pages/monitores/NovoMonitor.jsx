import Button from "../../form/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as MonitorService from "../../services/MonitorService";
import Select from "react-select";

export default function NovoCoordenador() {
  const navigate = useNavigate();
  const [monitor, setMonitor] = useState({});
  const [erro, setErro] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);
  const [erros, setErros] = useState({});
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    MonitorService.getDisciplinas()
      .then((res) => {
        const opcoes = res.data.map((d) => ({
          value: d.id,
          label: d.nome,
        }));
        setDisciplinas(opcoes);
      })
      .catch(() =>
        setErros((prev) => ({
          ...prev,
          geral: "Erro ao carregar disciplinas.",
        }))
      );
  }, []);

  useEffect(() => {
     MonitorService.getAlunos()
        .then((res) => setAlunos(res.data))
        .catch(() =>
          setErros((prev) => ({ ...prev, geral: "Erro ao carregar alunos." }))
        );
    }, []);

  const handleChange = (e) => {
    setMonitor({ ...monitor, [e.target.name]: e.target.value });
    if (erros[e.target.name]) {
      setErros((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSelectChange = (name, selectedOptions) => {
    setMonitor((prev) => ({ ...prev, [name]: selectedOptions }));

    if (erros[name]) {
      setErros((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idsSelecionados = (monitor.disciplinasMonitoriaId ?? []).map((d) => d.value);

    const payload = {
      ...monitor,
      disciplinasMonitoriaId: idsSelecionados, // substitui o array de objetos por apenas os IDs
    };

    try {
      MonitorService.createMonitor(payload);
      navigate(-1, { replace: true });
    } catch (error) {
      console.error("Erro ao cadastrar monitor:", error);
      setErro("Erro ao cadastrar disciplinas no monitor");
    }
  };

  if (erro) return <div>{erro}</div>;

  return (
    <div className="flex justify-center items-center bg-gradient-custom min-h-screen">
      <div className="bg-white w-[74vw] max-w-[500px] min-w-[330px] max-h-fit border-2 border-primaria mx-auto mt-10 mb-10 p-6 rounded-[10px] shadow-2xl">
        <h1 className="text-2xl font-semibold mb-4">Cadastro</h1>
        <form onSubmit={handleSubmit} className="">
          
         <div >
          <label className="block mb-1 text-gray-600">Aluno</label>
          <select
            name="id"
            value={monitor.id}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"
            required
          >
            <option value="">Selecione um aluno</option>
            {alunos.map((professor) => (
              <option key={professor.id} value={professor.id}>
                {professor.matricula}
              </option>
            ))}
          </select>
        </div>

          <Select className="mb-2 mt-2"
            isMulti
            name="disciplinasMonitoriaId"
            options={disciplinas}
            value={monitor.disciplinasMonitoriaId ?? []}
            onChange={(value) => handleSelectChange("disciplinasMonitoriaId", value)}
          />

          <div className="flex justify-center">
            <Button color="color" type="button" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button>Cadastrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
