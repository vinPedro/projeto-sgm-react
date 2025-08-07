import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Campo from "../../form/Campo";
import ButtonSubmit from "../../form/Button";
import * as AlunoService from "../../services/AlunoService";
import { useNavigate } from "react-router-dom";

export default function EditarAluno() {
  const { id } = useParams();
  const [perfil, setPerfil] = useState(null);
  const [form, setForm] = useState({});
  const [instituicoes, setInstituicoes] = useState();
  const [erros, setErros] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      try {
        const [alunoRes, instRes] = await Promise.all([
          AlunoService.getAlunoById(id),
          AlunoService.getInstituicoes(),
        ]);

        setInstituicoes(instRes.data);

        const dadosAluno = alunoRes.data;

        const instituicaoSelecionada = dadosAluno.instituicaoResponseDTO ?? null;

        setPerfil(dadosAluno);
        setForm({
          ...dadosAluno,
          instituicaoId: instituicaoSelecionada?.id ?? "",
        });

      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setErros((prev) => ({
          ...prev,
          geral: "Erro ao carregar dados.",
        }));
      }
    }

    carregarDados();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (erros[e.target.name]) {
      setErros((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const salvar = () => {

    AlunoService.updateAluno(id, form)
      .then((res) => {
        setPerfil(res.data);
        navigate(-1, { replace: true });
      })
      .catch((err) => {
        console.error("Erro ao salvar perfil:", err);
      });
  };

  if (!perfil) return <div className="text-center mt-10">Carregando...</div>;

  return (
    <>
      <div className="max-w-[500px] w-[74vw] min-w-[330px] mx-auto mt-10 mb-10 p-6 rounded-2xl shadow-2xl border-2 border-primaria">
        <h2 className="text-2xl font-semibold mb-4">Perfil do Aluno</h2>

        <div>
          <Campo
            label="Nome"
            name="nome"
            value={form.nome ?? ""}
            onChange={handleChange}
          />
          <Campo
            label="CRE"
            name="cre"
            type="number"
            value={form.cre ?? ""}
            onChange={handleChange}
          />
          <Campo
            label="CPF"
            name="cpf"
            value={form.cpf ?? ""}
            onChange={handleChange}
            disabled={true}
          />

          <Campo
            label="Matrícula"
            name="matricula"
            value={form.matricula ?? ""}
            onChange={handleChange}
            disabled={true}
          />
          <Campo
            label="Email"
            name="email"
            value={form.email ?? ""}
            onChange={handleChange}
          />
          <Campo
            label="Email-Academico"
            name="emailAcademico"
            value={form?.emailAcademico ?? ""}
            onChange={handleChange}
          />
          <div >
            <label className="block mb-1 text-gray-600">Instituição</label>
            <select
              name="instituicaoId"
              value={form.instituicaoId ?? ""}
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

        </div>

        <div className="mt-6 flex justify-end gap-4">
          <>
            <ButtonSubmit
              type="button"
              color="color"
              onClick={() => {
                navigate(-1)
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg"
            >
              Cancelar
            </ButtonSubmit>
            <ButtonSubmit
              onClick={salvar}

              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Salvar
            </ButtonSubmit>
          </>
        </div>
      </div>
    </>
  );
}
