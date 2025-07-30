import Button from "../../form/Button";
import Campo from "../../form/Campo";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as ProfessorService from "../../services/ProfessorService";
import Select from "react-select";

export default function NovoProfessor() {
  const navigate = useNavigate();
  const [professor, setProfessor] = useState({});
  const [erro, setErro] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);
  const [erros, setErros] = useState({});
  const [instituicoes, setInstituicoes] = useState([]);

  useEffect(() => {
    ProfessorService.getDisciplinas()
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
     ProfessorService.getInstituicoes()
        .then((res) => setInstituicoes(res.data))
        .catch(() =>
          setErros((prev) => ({ ...prev, geral: "Erro ao carregar instituições." }))
        );
    }, []);

  const handleChange = (e) => {
    setProfessor({ ...professor, [e.target.name]: e.target.value });
    if (erros[e.target.name]) {
      setErros((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSelectChange = (name, selectedOptions) => {
    setProfessor((prev) => ({ ...prev, [name]: selectedOptions }));

    if (erros[name]) {
      setErros((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idsSelecionados = (professor.disciplinasId ?? []).map((d) => d.value);

    const payload = {
      ...professor,
      disciplinasId: idsSelecionados, // substitui o array de objetos por apenas os IDs
    };

    try {
      ProfessorService.createProfessor(payload);
      navigate("/professores");
    } catch (error) {
      console.error("Erro ao cadastrar Professor:", error);
      setErro("Erro ao cadastrar disciplinas no professor");
    }
  };

  if (erro) return <div>{erro}</div>;

  return (
    <div className="flex justify-center items-center bg-gradient-custom min-h-screen">
      <div className="bg-white w-[74vw] max-w-[500px] min-w-[330px] max-h-fit border-2 border-primaria mx-auto mt-10 mb-10 p-6 rounded-[10px] shadow-2xl">
        <h1 className="text-2xl font-semibold mb-4">Cadastro</h1>
        <form onSubmit={handleSubmit} className="">
          <Campo
            autoComplete="username"
            label="Nome"
            name="nome"
            value={professor.nome ?? ""}
            onChange={handleChange}
          />
          <Campo
            autoComplete="username"
            label="CPF"
            name="cpf"
            value={professor.cpf ?? ""}
            onChange={handleChange}
          />
          <Campo
            autoComplete="username"
            label="E-mail"
            name="email"
            value={professor.email ?? ""}
            onChange={handleChange}
          />
          <Campo
            autoComplete="username"
            label="E-mail Academico"
            name="emailAcademico"
            value={professor.emailAcademico ?? ""}
            onChange={handleChange}
          />
          <Campo
            autoComplete="username"
            label="Matrícula"
            name="matricula"
            value={professor.matricula ?? ""}
            onChange={handleChange}
          />
          
         <div >
          <label className="block mb-1 text-gray-600">Instituição</label>
          <select
            name="instituicaoId"
            value={professor.instituicaoId}
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
            value={professor.senha ?? ""}
            onChange={handleChange}
          />

          <Select className="mb-2 mt-2"
            isMulti
            name="disciplinasId"
            options={disciplinas}
            value={professor.disciplinasId ?? []}
            onChange={(value) => handleSelectChange("disciplinasId", value)}
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
