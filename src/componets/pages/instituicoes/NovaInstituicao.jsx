import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../form/Button";
import * as InstituicaoService from "../../services/InstituicaoService";

export default function NovaInstituicao() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    email: "",
  });

  const [erro, setErro] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    InstituicaoService.createInstituicao(form)
      .then(() => navigate("/instituicoes", { replace: true }))
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

        <div className="flex gap-2">
          <Button type="submit">Salvar</Button>
          <Button
            type="button"
            color="gray"
            onClick={() => navigate(-1, { replace: true })}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
