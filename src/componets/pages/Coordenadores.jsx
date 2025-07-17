import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as coordenadorService from "../services/coordenadorService";
import Button from "../../componets/form/Button.jsx";

export default function Coordenadores() {
    const navigate = useNavigate();
    const [coordenadores, setCoordenadores] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarCoordenadores();
    }, []);

    function carregarCoordenadores() {
        setCarregando(true);
        coordenadorService.getCoordenadores()
            .then((response) => {
                setCoordenadores(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar coordenadores:", error);
                setErro("Erro ao carregar a lista de coordenadores.");
            })
            .finally(() => {
                setCarregando(false);
            });
    }

    function deletar(id) {
        if (window.confirm("Tem certeza que deseja remover este coordenador?")) {
            coordenadorService.deleteCoordenador(id)
                .then(() => {
                    // Remove o coordenador da lista na tela
                    setCoordenadores(coordenadores.filter((c) => c.id !== id));
                })
                .catch((error) => {
                    console.error("Erro ao deletar coordenador:", error);
                    alert("Erro ao deletar o coordenador.");
                });
        }
    }

    if (carregando) return <p className="text-center mt-4">Carregando...</p>;
    if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gerenciar Coordenadores</h1>
                <Button onClick={() => navigate("/coordenadores/novo")}>
                    Novo Coordenador
                </Button>
            </div>

            {coordenadores.length === 0 ? (
                <p>Nenhum coordenador cadastrado.</p>
            ) : (
                <table className="min-w-full border border-gray-300 rounded">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border-b border-gray-300 text-left">Nome</th>
                        <th className="p-3 border-b border-gray-300 text-left">Email</th>
                        <th className="p-3 border-b border-gray-300 text-left">Curso Coordenado</th>
                        <th className="p-3 border-b border-gray-300 text-center">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {coordenadores.map((coord) => (
                        <tr key={coord.id} className="hover:bg-gray-50">
                            <td className="p-3 border-b border-gray-300">{coord.nomeProfessor}</td>
                            <td className="p-3 border-b border-gray-300">{coord.emailProfessor}</td>
                            <td className="p-3 border-b border-gray-300">{coord.nomeCurso}</td>
                            <td className="p-3 border-b border-gray-300 text-center space-x-2">
                                <Button
                                    onClick={() => deletar(coord.id)}
                                    color="red" // Adapte a cor se necessário
                                >
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}