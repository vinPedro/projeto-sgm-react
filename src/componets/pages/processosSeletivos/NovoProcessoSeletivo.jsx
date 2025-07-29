import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as ProcessoService from "../../services/ProcessoSeletivoService";
import Button from "../../form/Button";
import Campo from "../../form/Campo";

export default function NovaCurso() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    /* ... */
  });
  const [instituicoes, setInstituicoes] = useState([]);
  const [erros, setErros] = useState({});

  useEffect(() => {
   ProcessoService.getInstituicoes()
      .then((res) => setInstituicoes(res.data))
      .catch(() =>
        setErros((prev) => ({ ...prev, geral: "Erro ao carregar instituições." }))
      );
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (erros[e.target.name]) {
      setErros((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const validarFormulario = () => {
    const novosErros = {};
    if (!form.numero.trim()) {
      novosErros.numero = "O campo Número é obrigatório.";
    }
    if (!form.inicio.trim()) {
      novosErros.inicio = "O campo Início é obrigatório.";
    }
    if (!form.fim) {
      novosErros.fim = "O campo Fim é obrigatório.";
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

    ProcessoService.createProcesso(form)
      .then(() => navigate(-1))
      .catch((error) => {
        console.error("Erro ao criar processo:", error);
        setErros({ geral: "Erro ao salvar. Verifique os dados." });
      });
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Novo Processo</h2>

        {erros.geral && (
          <p className="text-red-500 mb-4 text-center">{erros.geral}</p>
        )}

        <Campo
          label="Número do Processo"
          name="numero"
          value={form.numero ?? ''}
          onChange={handleChange}
          required
        />
        {erros.numero && (
          <p className="text-red-500 text-sm -mt-2 mb-2">{erros.numero}</p>
        )}

        <Campo
          label="Data de Início"
          name="inicio"
          type="date"
          value={form.inicio ?? ''}
          onChange={handleChange}
          required
        />
        {erros.inicio && (
          <p className="text-red-500 text-sm -mt-2 mb-2">
            {erros.inicio}
          </p>
        )}

        <Campo
          label="Data de Fim"
          name="fim"
          type="date"
          value={form.fim ?? ''}
          onChange={handleChange}
          required
        />
        {erros.fim && (
          <p className="text-red-500 text-sm -mt-2 mb-2">
            {erros.fim}
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Instituição</label>
          <select
            name="instituicaoId"
            value={form.instituicaoId}
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

        <div className="flex justify-center gap-2">
          <Button
            type="button"
            color="color"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </div>
  );
}
