import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Button from "../form/Button";

export default function EditarInstituicao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    email: "",
    cursosId: [],
    processosId: []
  });

  const [cursos, setCursos] = useState([]);
  const [processos, setProcessos] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Buscar dados da instituição e listas de cursos/processos
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [respInst, respCursos, respProcessos] = await Promise.all([
          axios.get(`http://localhost:8080/api/instituicoes/${id}`),
          axios.get("http://localhost:8080/api/cursos"),
          axios.get("http://localhost:8080/api/processos-seletivos"),
        ]);

        const inst = respInst.data;
        setForm({
          nome: inst.nome || "",
          cnpj: inst.cnpj || "",
          email: inst.email || "",
          cursosId: inst.cursosResponseDTO ? inst.cursosResponseDTO.map(c => c.id) : [],
          processosId: inst.processosSeletivosResponseDTO ? inst.processosSeletivosResponseDTO.map(p => p.id) : []
        });

        setCursos(respCursos.data);
        setProcessos(respProcessos.data);
        setCarregando(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setErro("Erro ao carregar dados da instituição.");
        setCarregando(false);
      }
    };

    fetchDados();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectMultiple = (e, field) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(opt => Number(opt.value));
    setForm({ ...form, [field]: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8080/api/instituicoes/${id}`, form)
      .then(() => navigate("/instituicoes"))
      .catch(err => {
        console.error("Erro ao atualizar instituição:", err);
        setErro("Erro ao salvar. Verifique os dados.");
      });
  };

  if (carregando) return <p>Carregando dados...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="border p-6 rounded w-full max-w-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Editar Instituição</h2>

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
            {cursos.map(curso => (
              <option key={curso.id} value={curso.id}>{curso.nome}</option>
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
            {processos.map(proc => (
              <option key={proc.id} value={proc.id}>{proc.nome}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <Button type="submit">Salvar</Button>
          <Button type="button" color="gray" onClick={() => navigate("/instituicoes")}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
