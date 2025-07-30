import Button from "../../form/Button";
import Campo from "../../form/Campo";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as AlunoService from "../../services/AlunoService";
import Select from "react-select";

export default function CadastroAluno() {
  const navigate = useNavigate();
  const [aluno, setAluno] = useState({});
  const [erro, setErro] = useState(null);
    const [disciplinas, setDisciplinas] = useState([]);
  const [erros, setErros] = useState({});
  const [instituicoes, setInstituicoes] = useState([]);

  useEffect(() => {
      AlunoService.getDisciplinas()
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
       AlunoService.getInstituicoes()
          .then((res) => setInstituicoes(res.data))
          .catch(() =>
            setErros((prev) => ({ ...prev, geral: "Erro ao carregar instituições." }))
          );
      }, []);

  const handleChange = (e) => {
    setAluno({ ...aluno, [e.target.name]: e.target.value });
    if (erros[e.target.name]) {
      setErros((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSelectChange = (name, selectedOptions) => {
    setAluno((prev) => ({ ...prev, [name]: selectedOptions }));

    if (erros[name]) {
      setErros((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idsSelecionados = (aluno.disciplinasPagasId ?? []).map((d) => d.value);

    const payload = {
      ...aluno,
      disciplinasPagasId: idsSelecionados, // substitui o array de objetos por apenas os IDs
    };

    try {
      AlunoService.createAluno(payload);
      navigate(-1);
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      setErro("Erro ao cadastrar aluno");
    }
  };

  if (erro) return <div>{erro}</div>;

  return (
    <div className="flex justify-center items-center bg-gradient-custom min-h-screen">
      <div className="bg-white w-[74vw] max-w-[500px] min-w-[330px] max-h-[680px] min-h-fit border-2 border-primaria mx-auto mt-10 mb-10 p-6 rounded-[10px] shadow-2xl">
        <h1 className="text-2xl font-semibold mb-4">Cadastro</h1>
        <form onSubmit={handleSubmit} className="">
          <Campo
            autoComplete="username"
            label="Nome"
            name="nome"
            value={aluno.nome ?? ""}
            onChange={handleChange}
          />
          <Campo
            autoComplete="username"
            label="CPF"
            name="cpf"
            value={aluno.cpf ?? ""}
            onChange={handleChange}
          />
          <Campo
            autoComplete="username"
            label="E-mail"
            name="email"
            value={aluno.email ?? ""}
            onChange={handleChange}
          />
          <Campo
            autoComplete="username"
            label="E-mail Academico"
            name="emailAcademico"
            value={aluno.emailAcademico ?? ""}
            onChange={handleChange}
          />
          <Campo
            autoComplete="username"
            label="Matrícula"
            name="matricula"
            value={aluno.matricula ?? ""}
            onChange={handleChange}
          />
          
          <div >
          <label className="block mb-1 text-gray-600">Instituição</label>
          <select
            name="instituicaoId"
            value={aluno.instituicaoId}
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

          <Campo
            autoComplete="off"
            label="Senha"
            name="senha"
            value={aluno.senha ?? ""}
            onChange={handleChange}
          />

          <Select className="mb-2 mt-2"
            isMulti
            name="disciplinasPagasId"
            options={disciplinas}
            value={aluno.disciplinasPagasId ?? []}
            onChange={(value) => handleSelectChange("disciplinasPagasId", value)}
          />

          <div className="flex justify-center">
            <Button color="color" type="button" onClick={() => navigate("/")}>
              Cancelar
            </Button>
            <Button>Cadastrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
