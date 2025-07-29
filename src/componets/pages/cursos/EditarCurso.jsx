import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../form/Button";
import Campo from "../../form/Campo";
import * as CursoService from "../../services/CursoService";

export default function EditarDisciplina() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    /* ... */
  });

  const [instituicoes, setInstituicoes] = useState([]);
  const [niveis, setNiveis] = useState([]);
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [respCurso, respInst] = await Promise.all([
          CursoService.getCursoById(id),
          CursoService.getInstituicoes(),
        ]);
        const inst = respCurso.data;
        setForm({
          nome: inst.nome || "",
          duracao: inst.duracao || "",
        });
        setInstituicoes(respInst.data);
        setNiveis(CursoService.getNiveis())
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setErros({ geral: "Erro ao carregar dados do Curso." });
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
    if (!form.duracao) {
      novosErros.duracao = "O campo Duração é obrigatório.";
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

    CursoService.updateCurso(id, form)
      .then(() => navigate(-1))
      .catch((err) => {
        console.error("Erro ao atualizar Curso:", err);
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
        <h2 className="text-2xl font-bold mb-4">Editar Curso</h2>

        <Campo
          label="Nome do cuso"
          name="nome"
          value={form.nome ?? ''}
          onChange={handleChange}
          required
        />
        {erros.nome && (
          <p className="text-red-500 text-sm -mt-2 mb-2">{erros.nome}</p>
        )}

        <Campo
          label="Duração"
          name="duracao"
          type="number"
          value={form.duracao ?? ''}
          onChange={handleChange}
          required
        />
        {erros.duracao && (
          <p className="text-red-500 text-sm -mt-2 mb-2">
            {erros.duracao}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Nível</label>
          <select
            name="nivelString"
            value={form.nivelString}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"
            required
          >
            <option value="">Selecione um nível</option>
            {niveis.map((nivel) => (
              <option key={nivel.value} value={nivel.value}>
                {nivel.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Instituição</label>
          <select
            name="instituicaoId"
            value={form.instituicaoId}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"
            required
          >
            <option value="">Selecione uma instituição</option>
            {instituicoes.map((instituicao) => (
              <option key={instituicao.id} value={instituicao.id}>
                {instituicao.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center gap-2">
          <Button
            type="button"
            color="color"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </div>
  );
}
