import Button from "../form/Button";
import Campo from "../form/Campo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useState } from "react";

export default function CadastroAluno() {

    const navigate = useNavigate();
    const [aluno, setAluno] = useState({});
    const [erro, setErro] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAluno((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const response = await axios.post('http://localhost:8080/api/alunos', aluno);
        setAluno(response.data);
        navigate(-1);
        //setMensagem('Aluno cadastrado com sucesso!');
    }
    catch(error){
        console.error('Erro ao cadastrar aluno:', error);
        setErro('Erro ao cadastrar aluno');
    }
  };

    if (erro) return <div>{erro}</div>;

    return (
        <div className="flex justify-center bg-gradient-custom min-h-screen">
            <div className="bg-white w-[74vw] max-w-[500px] min-w-[330px] border-2 border-primaria mx-auto mt-10 mb-10 p-6 rounded-[10px] shadow-2xl">
                <h1 className="text-2xl font-semibold mb-4">Cadastro</h1>
                <form onSubmit={handleSubmit} className="">
                    <Campo
                        autoComplete="username"
                        label="Nome"
                        name="nome"
                        value={aluno.nome ?? ""}
                        onChange={handleChange}
                    />
                    <Campo
                        autoComplete="username"
                        label="CPF"
                        name="cpf"
                        value={aluno.cpf ?? ""}
                        onChange={handleChange}
                    />
                    <Campo
                        autoComplete="username"
                        label="E-mail"
                        name="email"
                        value={aluno.email ?? ""}
                        onChange={handleChange}
                    />
                    <Campo
                        autoComplete="username"
                        label="E-mail Academico"
                        name="emailAcademico"
                        value={aluno.emailAcademico ?? ""}
                        onChange={handleChange}
                    />
                    {/* <Campo
                        autoComplete="username"
                        label="Curso"
                        name="curso"
                        value={aluno.curso}
                        onChange={handleChange}
                    /> */}

                    <Campo
                        autoComplete="username"
                        label="Matrícula"
                        name="matricula"
                        value={aluno.matricula ?? ""}
                        onChange={handleChange}
                    />

                    {/* <Campo
                        autoComplete="current-password"
                        label="Senha"
                        name="senha"
                        type="password"
                        value={aluno.senha}
                        onChange={handleChange}
                    /> */}

                    <Campo
                        autoComplete="off"
                        label="Instituição"
                        name="instituicaoId"
                        value={aluno.instituicaoId ?? ""}
                        onChange={handleChange}
                    />

                    <div className="flex justify-center">
                        <Button color='color' type="button" onClick={() => navigate('/')}>Cancelar</Button>
                        <Button>Cadastrar</Button>
                    </div>

                </form>
            </div>
        </div>
    )
}