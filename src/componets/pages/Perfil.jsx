import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Campo from "../form/Campo";
import ButtonSubmit from "../form/Button";

export default function Perfil() {
  const { id } = useParams();
  const [perfil, setPerfil] = useState(null);
  const [form, setForm] = useState({});
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    api
      .get(`/alunos/${id}`)
      .then((res) => {
        setPerfil(res.data);
        setForm(res.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar perfil:", err);
      });
  }, [id]);

  const salvar = () => {
    api
      .put(`/alunos/${id}`, form)
      .then((res) => {
        setPerfil(res.data);
        setEditando(false);
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
            disabled={!editando}
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
            disabled={!editando}
          />
          <Campo
            label="Email-Academico"
            name="emailAcademico"
            value={form?.emailAcademico ?? ""}
            onChange={handleChange}
            disabled={!editando}
          />
          <Campo
            label="Instituição"
            name="instituicao"
            value={form.instituicaoResponseDTO.id ?? ""}
            onChange={handleChange}
            disabled={!editando}
          />
          {/*<Campo
                        label="Curso"
                        name="curso"
                        value={form.curso ?? ""}
                        onChange={handleChange}
                        disabled={!editando}
                    />*/}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          {editando ? (
            <>
              <ButtonSubmit
                type="button"
                color="color"
                onClick={() => {
                  setForm(perfil); // reseta mudanças
                  setEditando(false);
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
          ) : (
            <ButtonSubmit
              type="button"
              onClick={() => setEditando(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Editar
            </ButtonSubmit>
          )}
        </div>
      </div>
    </>
  );
}
