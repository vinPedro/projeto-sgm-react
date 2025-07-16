import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../form/Button";
import Campo from "../form/Campo";

export default function NovaDisciplina() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    cargaHoraria: "",
    professorId: "",
    cursoId: "",
  });

  const [professores, setProfessores] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [erros, setErros] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/professores")
      .then((res) => setProfessores(res.data))
      .catch(() =>
        setErros((prev) => ({
          ...prev,
          geral: "Erro ao carregar professores.",
        }))
      );

    axios
      .get("http://localhost:8080/api/cursos")
      .then((res) => setCursos(res.data))
      .catch(() =>
        setErros((prev) => ({ ...prev, geral: "Erro ao carregar cursos." }))
      );
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Limpa o erro do campo ao ser modificado
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

    axios
      .post("http://localhost:8080/api/disciplinas", form)
      .then(() => navigate("/disciplinas"))
      .catch((error) => {
        console.error("Erro ao criar disciplina:", error);
        setErros({ geral: "Erro ao salvar. Verifique os dados." });
      });
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Nova Disciplina</h2>

        {erros.geral && (
          <p className="text-red-500 mb-4 text-center">{erros.geral}</p>
        )}

        <Campo
          label="Nome da Disciplina"
          name="nome"
          value={form.nome}
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
          value={form.cargaHoraria}
          onChange={handleChange}
          required
        />
        {erros.cargaHoraria && (
          <p className="text-red-500 text-sm -mt-2 mb-2">
            {erros.cargaHoraria}
          </p>
        )}

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
                {prof.nome}
              </option>
            ))}
          </select>
        </div>

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
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </div>
  );
}
