import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import * as service from "../../../../../../IdeaProjects/projeto-sgm-react/src/services/coordenadorService";
import Button from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/form/Button.jsx";
import Campo from "../../../../../Downloads/projeto-sgm-react-feature-crud_disciplina/projeto-sgm-react-feature-crud_disciplina/src/componets/form/Campo.jsx"; // Importe o componente Campo

export default function NovoCoordenador() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        email: "",
        emailAcademico: "",
        instituicaoId: "1", // Assumindo ID 1 como padrão, ajuste se necessário
        cursoId: "",
    });
    const [erros, setErros] = useState({});

    // Você ainda pode querer carregar a lista de cursos para um dropdown
    const [cursos, setCursos] = useState([]);
    useEffect(() => {
        service.getCursos()
            .then((res) => setCursos(res.data))
            .catch(() => setErros((prev) => ({ ...prev, geral: "Erro ao carregar cursos." })));
    }, []);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Adicione validações se necessário

        service.createCoordenador(form)
            .then(() => navigate("/coordenadores"))
            .catch((error) => {
                console.error("Erro ao criar coordenador:", error);
                const errorMsg = error.response?.data?.message || "Erro ao salvar. Verifique os dados.";
                setErros({ geral: errorMsg });
            });
    };

    return (
        <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmit} className="border p-6 rounded w-full max-w-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Adicionar Novo Coordenador</h2>

                {erros.geral && <p className="text-red-500 mb-4 text-center">{erros.geral}</p>}

                <Campo label="Nome Completo" name="nome" value={form.nome} onChange={handleChange} required />
                <Campo label="CPF" name="cpf" value={form.cpf} onChange={handleChange} required />
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
                    <Button type="submit">Salvar</Button>
                </div>
            </form>
        </div>
    );
}