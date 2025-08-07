import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../form/Button";
import Campo from "../../form/Campo"
import * as MonitoriaService from "../../services/MonitoriaService";
import { useParams } from "react-router-dom";


export default function EditarMonitoria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    /* ... */
  });

  const [disciplinas, setDisciplina] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [processos, setProcessos] = useState([]);
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [respMonitoria ,respDisc, respProf, respProc] = await Promise.all([
          MonitoriaService.getMonitoriaById(id),
          MonitoriaService.getDisciplinas(),
          MonitoriaService.getProfessores(),
          MonitoriaService.getProcessos(),
        ]);
        const inst = respMonitoria.data;
        setForm({
          numeroVaga: inst.numeroVaga || "",
          numeroVagaBolsa: inst.numeroVagaBolsa || "",
          cargaHoraria: inst.cargaHoraria || "",
        });
        setDisciplina(respDisc.data);
        setProfessores(respProf.data);
        setProcessos(respProc.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setErros({ geral: "Erro ao carregar dados da Monitoria." });
      } finally {
        setCarregando(false);
      }
    };

    fetchDados();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (erros[e.target.name]) {
      setErros((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const validarFormulario = () => {
    const novosErros = {};
    if (!form.numeroVaga.trim()) {
      novosErros.numeroVaga = "O campo Número de Vagas é obrigatório.";
    }
    if (!form.numeroVagaBolsa.trim()) {
      novosErros.numeroVagaBolsa = "O campo Número de Vagas com Bolsa é obrigatório.";
    }
    if (!form.cargaHoraria) {
      novosErros.cargaHoraria = "O campo Carga Horária é obrigatório.";
    }
    return novosErros;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errosDeValidacao = validarFormulario();
    if (Object.keys(errosDeValidacao).length > 0) {
      setErros(errosDeValidacao);
      return;
    }

    setErros({});

    MonitoriaService.updateMonitoria(id, form)
      .then(() => navigate(-1, { replace: true }))
      .catch((err) => {
        console.error("Erro ao atualizar monitoria:", err);
        setErros({ geral: "Erro ao salvar. Verifique os dados." });
      });
  };

  if (carregando)
    return <p className="text-center mt-4">Carregando dados...</p>;
  if (erros.geral && !carregando)
    return <p className="text-red-500 text-center mt-4">{erros.geral}</p>;

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Editar Monitoria</h2>

        <Campo
          label="Número de Vagas"
          name="numeroVaga"
          type="number"
          value={form.numeroVaga ?? ""}
          onChange={handleChange}
          required
        />
        {erros.numeroVaga && (
          <p className="text-red-500 text-sm -mt-2 mb-2">{erros.numeroVaga}</p>
        )}

        <Campo
          label="Número de Bolsas"
          name="numeroVagaBolsa"
          type="number"
          value={form.numeroVagaBolsa ?? ""}
          onChange={handleChange}
          required
        />
        {erros.numeroVagaBolsa && (
          <p className="text-red-500 text-sm -mt-2 mb-2">{erros.numeroVagaBolsa}</p>
        )}

        <Campo
          label="Carga Horária"
          name="cargaHoraria"
          type="number"
          value={form.cargaHoraria ?? ""}
          onChange={handleChange}
          required
        />
        {erros.cargaHoraria && (
          <p className="text-red-500 text-sm -mt-2 mb-2">
            {erros.cargaHoraria}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Disciplina</label>
          <select
            name="disciplinaId"
            value={form.disciplinaId}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"
            required
          >
            <option value="">Selecione uma disciplina</option>
            {disciplinas.map((disc) => (
              <option key={disc.id} value={disc.id}>
                {disc.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Professor</label>
          <select
            name="professorId"
            value={form.professorId}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"
            required
          >
            <option value="">Selecione um professor</option>
            {professores.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.matricula}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Processo Seletivo</label>
          <select
            name="processoSeletivoId"
            value={form.processoSeletivoId}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"
            required
          >
            <option value="">Selecione um processo</option>
            { processos.map((processo) => (
              <option key={processo.id} value={processo.id}>
                {processo.numero}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center gap-2">
          <Button
            type="button"
            color="color"
            onClick={() => navigate(-1, { replace: true })}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </div>
  );
}
