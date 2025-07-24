import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../form/Button";

export default function NovaInstituicao() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    email: "",
    cursosId: [],
    processosId: [],
  });

  const [cursos, setCursos] = useState([]);
  const [processos, setProcessos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    api
      .get("/cursos")
      .then((res) => setCursos(res.data))
      .catch(() => setErro("Erro ao carregar cursos."));
    api
      .get("/processos-seletivos")
      .then((res) => setProcessos(res.data))
      .catch(() => setErro("Erro ao carregar processos."));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectMultiple = (e, field) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((opt) =>
      Number(opt.value)
    );
    setForm({ ...form, [field]: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/instituicoes", form)
      .then(() => navigate("/instituicoes"))
      .catch((error) => {
        console.error("Erro ao criar instituição:", error);
        setErro("Erro ao salvar. Verifique os dados.");
      });
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-xl shadow"
      >
        <h2 className="text-2xl font-bold mb-4">Nova Instituição</h2>

        {erro && <p className="text-red-500 mb-4">{erro}</p>}

        <div className="mb-4">
          <label className="block mb-1">Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">CNPJ</label>
          <input
            type="text"
            name="cnpj"
            value={form.cnpj}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Cursos</label>
          <select
            multiple
            className="w-full border p-2 rounded h-[120px]"
            value={form.cursosId}
            onChange={(e) => handleSelectMultiple(e, "cursosId")}
          >
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Processos Seletivos</label>
          <select
            multiple
            className="w-full border p-2 rounded h-[120px]"
            value={form.processosId}
            onChange={(e) => handleSelectMultiple(e, "processosId")}
          >
            {processos.map((proc) => (
              <option key={proc.id} value={proc.id}>
                {proc.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <Button type="submit">Salvar</Button>
          <Button
            type="button"
            color="gray"
            onClick={() => navigate("/instituicoes")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
