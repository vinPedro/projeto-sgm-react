import Button from "../../form/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as CoordenadorService from "../../services/coordenadorService";
import Select from "react-select";

export default function NovoCoordenador() {
  const navigate = useNavigate();
  const [coordenador, setCoordenador] = useState({});
  const [erro, setErro] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [erros, setErros] = useState({});
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    CoordenadorService.getCursos()
      .then((res) => {
        const opcoes = res.data.map((d) => ({
          value: d.id,
          label: d.nome,
        }));
        setCursos(opcoes);
      })
      .catch(() =>
        setErros((prev) => ({
          ...prev,
          geral: "Erro ao carregar cursos.",
        }))
      );
  }, []);

  useEffect(() => {
     CoordenadorService.getProfessores()
        .then((res) => setProfessores(res.data))
        .catch(() =>
          setErros((prev) => ({ ...prev, geral: "Erro ao carregar professores." }))
        );
    }, []);

  const handleChange = (e) => {
    setCoordenador({ ...coordenador, [e.target.name]: e.target.value });
    if (erros[e.target.name]) {
      setErros((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSelectChange = (name, selectedOptions) => {
    setCoordenador((prev) => ({ ...prev, [name]: selectedOptions }));

    if (erros[name]) {
      setErros((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idsSelecionados = (coordenador.cursosId ?? []).map((d) => d.value);

    const payload = {
      ...coordenador,
      cursosId: idsSelecionados, // substitui o array de objetos por apenas os IDs
    };

    try {
      CoordenadorService.createCoordenador(payload);
      navigate(-1);
    } catch (error) {
      console.error("Erro ao cadastrar coordenador:", error);
      setErro("Erro ao cadastrar cursos no coordenador");
    }
  };

  if (erro) return <div>{erro}</div>;

  return (
    <div className="flex justify-center items-center bg-gradient-custom min-h-screen">
      <div className="bg-white w-[74vw] max-w-[500px] min-w-[330px] max-h-fit border-2 border-primaria mx-auto mt-10 mb-10 p-6 rounded-[10px] shadow-2xl">
        <h1 className="text-2xl font-semibold mb-4">Cadastro</h1>
        <form onSubmit={handleSubmit} className="">
          
         <div >
          <label className="block mb-1 text-gray-600">Professor</label>
          <select
            name="id"
            value={coordenador.id}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"
            required
          >
            <option value="">Selecione um professor</option>
            {professores.map((professor) => (
              <option key={professor.id} value={professor.id}>
                {professor.matricula}
              </option>
            ))}
          </select>
        </div>

          <Select className="mb-2 mt-2"
            isMulti
            name="cursosId"
            options={cursos}
            value={coordenador.cursosId ?? []}
            onChange={(value) => handleSelectChange("cursosId", value)}
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
