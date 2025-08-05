import Button from "../../form/Button";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as AlunoService from "../../services/AlunoService";
import * as DisciplinaService from "../../services/DisciplinaService";
import Campo from "../../form/Campo";

export default function CadastroAlunoConcluinte() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [erro, setErro] = useState(null);
  const [disciplina, setDisciplina] = useState(null);
  const [erros, setErros] = useState({});
  const [alunos, setAlunos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    DisciplinaService.getDisciplinaById(id)
      .then((res) => setDisciplina(res.data))
      .catch(() =>
        setErros((prev) => ({ ...prev, geral: "Erro ao carregar alunos." }))
      );
  }, [id]);

  useEffect(() => {
    AlunoService.getAlunosNaoConcluintes(id)
      .then((res) => setAlunos(res.data))
      .catch(() =>
        setErros((prev) => ({ ...prev, geral: "Erro ao carregar alunos." }))
      );
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
            ...form,
            disciplinaId: disciplina.id, 
        };

    try {
      AlunoService.adicionarConcluinte(payload);
      navigate(-1, { replace: true });
    } catch (error) {
      console.error("Erro ao cadastrar conclusão:", error);
      setErro("Erro ao cadastrar conclusão");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (erros[e.target.name]) {
      setErros((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  if (erro) return <div>{erro}</div>;

  return (
    <div className="flex justify-center items-center bg-gradient-custom min-h-screen">
      <div className="bg-white w-[74vw] max-w-[500px] min-w-[330px] max-h-fit border-2 border-primaria mx-auto mt-10 mb-10 p-6 rounded-[10px] shadow-2xl">
        <h1 className="text-2xl font-semibold mb-4">Cadastro</h1>
        <p className="block mb-1 text-gray-600">Disciplina: {disciplina?.nome} </p>

        <form onSubmit={handleSubmit} className="">

          <div >
            <select
              name="alunoId"
              value={form.alunoId ?? ""}
              onChange={handleChange}
              className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"
              required
            >
              <option value="">Selecione um Aluno</option>
              {alunos.map((aluno) => (
                <option key={aluno.id} value={aluno.id}>
                  {aluno.matricula}
                </option>
              ))}
            </select>

            <Campo
            label="Nota"
            name="nota"
            type="number"
            value={form.nota ?? ""}
            onChange={handleChange}
          />
          </div>

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
