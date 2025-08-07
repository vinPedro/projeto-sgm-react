import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../form/Button";
import Campo from "../form/Campo";
import * as PessoaService from "../services/PessoaService";
import { useAuth } from "../AuthContext";

export default function Pessoa() {
    const [perfil, setPerfil] = useState(null);
    const [form, setForm] = useState({});
    const [instituicoes, setInstituicoes] = useState();
    const [erros, setErros] = useState({});
    const navigate = useNavigate();
    const {  user } = useAuth();
  
    useEffect(() => {
      async function carregarDados() {
        try {
          const [pessoaRes, instRes] = await Promise.all([
            PessoaService.getPessoaById(user.id),
            PessoaService.getInstituicoes(),
          ]);
  
          setInstituicoes(instRes.data);
  
          const dadosPessoa = pessoaRes.data;
  
          const instituicaoSelecionada = dadosPessoa.instituicaoResponseDTO ?? null;
  
          setPerfil(dadosPessoa);
          setForm({
            ...dadosPessoa,
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
    }, [user.id]);
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      if (erros[e.target.name]) {
        setErros((prev) => ({ ...prev, [e.target.name]: null }));
      }
    };
  
    const salvar = () => {
  
      PessoaService.updatePessoa(user.id, form)
        .then((res) => {
          setPerfil(res.data);
          navigate(0);
        })
        .catch((err) => {
          console.error("Erro ao salvar perfil:", err);
        });
    };
  
    if (!perfil) return <div className="text-center mt-10">Carregando...</div>;

  return (
    <>
      <div className="max-w-[500px] w-[74vw] min-w-[330px] mx-auto mt-10 mb-10 p-6 rounded-2xl shadow-2xl border-2 border-primaria">
        <h2 className="text-2xl font-semibold mb-4">Perfil da Pessoa</h2>

        <div>
          <Campo
            label="Nome"
            name="nome"
            value={form.nome ?? ""}
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
            <Button
              onClick={salvar}

              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Salvar
            </Button>
          </>
        </div>
      </div>
    </>
  );
}
