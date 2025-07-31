import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../form/Button";
import * as InstituicaoSevice from "../../services/InstituicaoService"

export default function EditarInstituicao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    email: "",
  });

  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [respInst] = await Promise.all([
          InstituicaoSevice.getInstituicaoById(id),
        ]);

        const inst = respInst.data;
        setForm({
          nome: inst.nome || "",
          cnpj: inst.cnpj || "",
          email: inst.email || "",
        });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    InstituicaoSevice.updateInstituicao(id, form)
      .then(() => navigate("/instituicoes", { replace: true }))
      .catch((err) => {
        console.error("Erro ao atualizar instituição:", err);
        setErro("Erro ao salvar. Verifique os dados.");
      });
  };

  if (carregando) return <p>Carregando dados...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-xl shadow"
      >
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
