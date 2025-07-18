import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as service from "../services/coordenadorService";
import Button from "../form/Button.jsx";
import Campo from "../form/Campo.jsx";

export default function EditarCoordenador() {
    const navigate = useNavigate();
    const { id } = useParams(); // 1. Pegar o ID da URL

    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        email: "",
        emailAcademico: "",
        cursoId: "",
        instituicaoId: ""
    });

    const [cursos, setCursos] = useState([]);
    const [erros, setErros] = useState({});
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        // 2. Buscar os dados do coordenador e a lista de cursos
        const fetchData = async () => {
            try {
                const [coordenadorResponse, cursosResponse] = await Promise.all([
                    service.getCoordenadorById(id),
                    service.getCursos(),
                ]);

                const data = coordenadorResponse.data;
                // 3. Preencher o formulário com os dados recebidos do backend
                setForm({
                    nome: data.nome || "",
                    cpf: data.cpf || "", // Apenas para exibição, não será enviado
                    email: data.email || "",
                    emailAcademico: data.emailAcademico || "",
                    cursoId: data.cursoResponseDTO?.id || "",
                    instituicaoId: data.instituicaoResponseDTO?.id || ""
                });
                setCursos(cursosResponse.data);

            } catch (error) {
                console.error("Erro ao carregar dados para edição:", error);
                setErros({ geral: "Não foi possível carregar os dados do coordenador." });
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // O backend não precisa do CPF para atualizar, então podemos omiti-lo.
        const dadosParaEnviar = { ...form };
        delete dadosParaEnviar.cpf;

        service.updateCoordenador(id, dadosParaEnviar)
            .then(() => navigate("/coordenadores"))
            .catch((error) => {
                console.error("Erro ao atualizar coordenador:", error);
                setErros({ geral: "Erro ao salvar as alterações." });
            });
    };

    if (carregando) return <p className="text-center mt-4">Carregando...</p>;
    if (erros.geral) return <p className="text-red-500 text-center mt-4">{erros.geral}</p>;

    return (
        <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmit} className="border p-6 rounded w-full max-w-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Editar Coordenador</h2>

                <Campo label="Nome Completo" name="nome" value={form.nome} onChange={handleChange} required />
                <Campo label="CPF" name="cpf" value={form.cpf} disabled={true} />
                <Campo label="Email Pessoal" name="email" type="email" value={form.email} onChange={handleChange} required />
                <Campo label="Email Acadêmico" name="emailAcademico" type="email" value={form.emailAcademico} onChange={handleChange} />

                <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Curso a Coordenar</label>
                    <select
                        name="cursoId"
                        value={form.cursoId}
                        onChange={handleChange}
                        className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"
                        required
                    >
                        <option value="">Selecione um curso</option>
                        {cursos.map((curso) => (
                            <option key={curso.id} value={curso.id}>
                                {curso.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-center gap-2">
                    <Button type="button" color="color" onClick={() => navigate("/coordenadores")}>
                        Cancelar
                    </Button>
                    <Button type="submit">Salvar Alterações</Button>
                </div>
            </form>
        </div>
    );
}