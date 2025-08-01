import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as MonitorService from "../../services/MonitorService";
import Button from "../../form/Button";

export default function Monitores() {
    const navigate = useNavigate();
    const [monitores, setMonitores] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarMonitorenadores();
    }, []);

    function carregarMonitorenadores() {
        setCarregando(true);
        MonitorService.getMonitores()
            .then((response) => {
                setMonitores(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar monitores:", error);
                setErro("Erro ao carregar a lista de monitores.");
            })
            .finally(() => {
                setCarregando(false);
            });
    }

    function deletar(id) {
        if (window.confirm("Tem certeza que deseja remover o cargo deste monitor? Ele voltará a ser apenas um aluno.")) {
            MonitorService.deleteMonitor(id)
                .then(() => {
                    setMonitores(monitores.filter((c) => c.id !== id));
                })
                .catch((error) => {
                    console.error("Erro ao remover cargo de monitor:", error);
                    alert("Erro ao remover o cargo do monitor.");
                });
        }
    }

    if (carregando) return <p className="text-center mt-4">Carregando...</p>;
    if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gerenciar Monitores</h1>
                <Button onClick={() => navigate("/monitores/novo")}>
                    Novo Monitor
                </Button>
            </div>

            {monitores.length === 0 ? (
                <p>Nenhum monitor cadastrado.</p>
            ) : (
                <table className="min-w-full border border-gray-300 rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border-b border-gray-300 text-left">Nome</th>
                            <th className="p-3 border-b border-gray-300 text-left">Email</th>
                            <th className="p-3 border-b border-gray-300 text-left">Disciplina Monitor</th>
                            <th className="p-3 border-b border-gray-300 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monitores.map((monitor) => (

                            <tr key={monitor.id} className="hover:bg-gray-50">
                                <td className="p-3 border-b border-gray-300">{monitor.nome}</td>
                                <td className="p-3 border-b border-gray-300">{monitor.email}</td>
                                {/* Percorrer a lista de monitores */}
                                <td className="p-3 border-b border-gray-300">
                                    {monitor.disciplinasMonitoriaResponseDTO?.length > 0 ? (
                                        monitor.disciplinasMonitoriaResponseDTO.map((monitor, idx) => (
                                            <span key={idx} className="block">
                                                {monitor.nome}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400">Nenhum monitor</span>
                                    )}
                                </td>
                                <td className="p-3 border-b border-gray-300 text-center space-x-2">
                                    {/* BOTÃO ADICIONADO */}
                                    <Button
                                        onClick={() => navigate(`/monitores/editar/${monitor.id}`)}
                                        color="color"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        onClick={() => deletar(monitor.id)}
                                        color="red"
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