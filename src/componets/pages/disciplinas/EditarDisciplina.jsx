import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../form/Button";
import Campo from "../../form/Campo"
import * as DisciplinaService from "../../services/DisciplinaService";
import { useParams } from "react-router-dom";


export default function EditarDisciplina() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    /* ... */
  });

  const [cursos, setCursos] = useState([]);
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [respDisc, respCursos] = await Promise.all([
          DisciplinaService.getDisciplinaById(id),
          DisciplinaService.getCursos(),
        ]);
        const inst = respDisc.data;
        setForm({
          nome: inst.nome || "",
          cargaHoraria: inst.cargaHoraria || "",
        });
        setCursos(respCursos.data)
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setErros({ geral: "Erro ao carregar dados da disciplina." });
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
    if (!form.nome.trim()) {
      novosErros.nome = "O campo Nome é obrigatório.";
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

    DisciplinaService.updateDisciplina(id, form)
      .then(() => navigate("/disciplinas"))
      .catch((err) => {
        console.error("Erro ao atualizar disciplina:", err);
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
        <h2 className="text-2xl font-bold mb-4">Editar Disciplina</h2>

        <Campo
          label="Nome da Disciplina"
          name="nome"
          value={form.nome ?? ""}
          onChange={handleChange}
          required
        />
        {erros.nome && (
          <p className="text-red-500 text-sm -mt-2 mb-2">{erros.nome}</p>
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
          <label className="block mb-1 text-gray-600">Curso</label>
          <select
            name="cursoId"
            value={form.cursoId}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"
            required
          >
            <option value="">Selecione um curso</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.nome}
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
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </div>
  );
}
