import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as MonitorService from "../../services/MonitorService.js";
import Button from "../../form/Button.jsx";
import Select from "react-select";

export default function EditarMonitor() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [monitor, setMonitor] = useState({});
    const [disciplinas, setDisciplinas] = useState([]);
    const [erros, setErros] = useState({});
    const [perfil, setPerfil] = useState(null);

    const handleSelectChange = (name, selectedOptions) => {
        setMonitor((prev) => ({ ...prev, [name]: selectedOptions }));

        if (erros[name]) {
            setErros((prev) => ({ ...prev, [name]: null }));
        }
    };

    useEffect(() => {
        async function carregarDados() {
            try {
                const [monitorRes, disciplinasRes] = await Promise.all([
                    MonitorService.getMonitorById(id),
                    MonitorService.getDisciplinas(),
                ]);

                const discOpcoes = disciplinasRes.data.map((d) => ({
                    value: d.id,
                    label: d.nome,
                }));

                setDisciplinas(discOpcoes);

                const dadosMonitor = monitorRes.data;

                // ✅ transcoordenadora disciplinasResponseDTO => { value, label }
                const disciplinasSelecionados = (dadosMonitor.disciplinasMonitoriaResponseDTO ?? []).map(
                    (d) => ({
                        value: d.id,
                        label: d.nome,
                    })
                );


                setPerfil(dadosMonitor);
                setMonitor({
                    ...dadosMonitor,
                    disciplinasMonitoriaId: disciplinasSelecionados, // ✅ já no coordenadorato que o Select espera
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
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault()

        const idsSelecionados = (monitor.disciplinasMonitoriaId ?? []).map((d) => d.value);

        const payload = {
            ...monitor,
            disciplinasMonitoriaId: idsSelecionados, // substitui o array de objetos por apenas os IDs
        };
        
        MonitorService.updateMonitor(id, payload)
            .then((res) => {
                setPerfil(res.data);
                navigate(-1,{ replace: true })
            })
            .catch((err) => {
                console.error("Erro ao salvar perfil:", err);
            });
    };

    if (!perfil) return <div className="text-center mt-10">Carregando...</div>;
    if (erros.geral) return <p className="text-red-500 text-center mt-4">{erros.geral}</p>;

    return (
        <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmit} className="border p-6 rounded w-full max-w-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Editar Monitor</h2>

                <p>Monitor: {monitor.alunoResponseDTO.matricula}</p>

                <Select className="mb-2 mt-2"
                    isMulti
                    name="disciplinasMonitoriaId"
                    options={disciplinas}
                    value={monitor.disciplinasMonitoriaId ?? []}
                    onChange={(value) => handleSelectChange("disciplinasMonitoriaId", value)}
                />

                <div className="flex justify-center gap-2">
                    <Button type="button" color="color" onClick={() => navigate(-1, { replace: true })}>
                        Cancelar
                    </Button>
                    <Button type="submit">Salvar Alterações</Button>
                </div>
            </form>
        </div>
    );
}