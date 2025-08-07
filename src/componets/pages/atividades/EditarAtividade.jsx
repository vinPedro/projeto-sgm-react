import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../form/Button";
import Campo from "../../form/Campo";
import * as AtividadeService from "../../services/AtividadeService";
import { useAuth } from "../../AuthContext";

export default function EditarAtividade() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {  user } = useAuth();
  
  const [form, setForm] = useState({
    /* ... */
  });

  const [monitorias, setMonitorias] = useState([]);
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [respAtiv, respMonitorias] = await Promise.all([
          AtividadeService.getAtividadeById(id),
          AtividadeService.getMonitorias(),
        ]);
        const inst = respAtiv.data;
        setForm({
          dataHora: inst.dataHora || "",
          descricao: inst.descricao || "",
        });
        setMonitorias(respMonitorias.data)
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setErros({ geral: "Erro ao carregar dados da atividade." });
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
    if (!form.dataHora.trim()) {
      novosErros.dataHora = "O campo Data-Hora é obrigatório.";
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

    const payload = {
            ...form,
            matricula: user.matricula, // substitui o array de objetos por apenas os IDs
        };

    setErros({});

    AtividadeService.updateAtividade(id, payload)
      .then(() => navigate(-1, { replace: true }))
      .catch((err) => {
        console.error("Erro ao atualizar atividade:", err);
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
        <h2 className="text-2xl font-bold mb-4">Editar Atividade</h2>

        <Campo
          label="Data e Hora"
          name="dataHora"
          type="datetime-local"
          value={form.dataHora}
          onChange={handleChange}
          required
        />
        {erros.dataHora && (
          <p className="text-red-500 text-sm -mt-2 mb-2">{erros.dataHora}</p>
        )}

        <Campo
          label="Descricao"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          required
        />
        {erros.descricao && (
          <p className="text-red-500 text-sm -mt-2 mb-2">
            {erros.descricao}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Monitorias</label>
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
