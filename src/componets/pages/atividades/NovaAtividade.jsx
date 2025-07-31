import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as AtividadeService from "../../services/AtividadeService";
import Button from "../../form/Button";
import Campo from "../../form/Campo";

export default function NovaDisciplina() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    /* ... */
  });
  const [monitorias, setMonitorias] = useState([]);
  const [erros, setErros] = useState({});

  useEffect(() => {
   AtividadeService.getMonitorias()
      .then((res) => setMonitorias(res.data))
      .catch(() =>
        setErros((prev) => ({ ...prev, geral: "Erro ao carregar monitorias." }))
      );
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (erros[e.target.name]) {
      setErros((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const validarFormulario = () => {
    const novosErros = {};
    if (!form.dataHora.trim()) {
      novosErros.dataHora = "O campo Data e Hora é obrigatório.";
    }
    if (!form.descricao) {
      novosErros.descricao = "O campo Descrição é obrigatório.";
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

    AtividadeService.createAtividade(form)
      .then(() => navigate(-1, { replace: true }))
      .catch((error) => {
        console.error("Erro ao criar atividade:", error);
        setErros({ geral: "Erro ao salvar. Verifique os dados." });
      });
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Nova Atividade</h2>

        {erros.geral && (
          <p className="text-red-500 mb-4 text-center">{erros.geral}</p>
        )}

        <Campo
          label="Data e Hora"
          name="dataHora"
          type="datetime-local"
          value={form.dataHora ?? ''}
          onChange={handleChange}
          required
        />
        {erros.dataHora && (
          <p className="text-red-500 text-sm -mt-2 mb-2">{erros.dataHora}</p>
        )}

        <Campo
          label="Descricao"
          name="descricao"
          value={form.descricao ?? ''}
          onChange={handleChange}
          required
        />
        {erros.descricao && (
          <p className="text-red-500 text-sm -mt-2 mb-2">
            {erros.descricao}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Monitoria</label>
          <select
            name="monitoriaId"
            value={form.monitoriaId}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"
            required
          >
            <option value="">Selecione uma Monitoria</option>
            {monitorias.map((monitoria) => (
              <option key={monitoria.id} value={monitoria.id}>
                {monitoria.disciplinaResponseDTO.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center gap-2">
          <Button
            type="button"
            color="color"
            onClick={() => navigate("/disciplinas")}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </div>
  );
}
