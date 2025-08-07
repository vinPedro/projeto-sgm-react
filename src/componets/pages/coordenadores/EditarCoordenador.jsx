import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Coordenadorservice from "../../services/CoordenadorService.js";
import Button from "../../form/Button.jsx";
import Select from "react-select";

export default function EditarCoordenador() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [coordenador, setCoordenador] = useState({});
    const [cursos, setCursos] = useState([]);
    const [erros, setErros] = useState({});
    const [perfil, setPerfil] = useState(null);

    const handleSelectChange = (name, selectedOptions) => {
        setCoordenador((prev) => ({ ...prev, [name]: selectedOptions }));

        if (erros[name]) {
            setErros((prev) => ({ ...prev, [name]: null }));
        }
    };

    useEffect(() => {
        async function carregarDados() {
            try {
                const [coordRes, cursosRes] = await Promise.all([
                    Coordenadorservice.getCoordenadorById(id),
                    Coordenadorservice.getCursos(),
                ]);

                const cursoOpcoes = cursosRes.data.map((d) => ({
                    value: d.id,
                    label: d.nome,
                }));

                setCursos(cursoOpcoes);

                const dadosCoordenador = coordRes.data;

                // ✅ transcoordenadora disciplinasResponseDTO => { value, label }
                const cursosSelecionados = (dadosCoordenador.cursosResponseDTO ?? []).map(
                    (d) => ({
                        value: d.id,
                        label: d.nome,
                    })
                );


                setPerfil(dadosCoordenador);
                setCoordenador({
                    ...dadosCoordenador,
                    cursosId: cursosSelecionados, // ✅ já no coordenadorato que o Select espera
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

        const idsSelecionados = (coordenador.cursosId ?? []).map((d) => d.value);

        const payload = {
            ...coordenador,
            cursosId: idsSelecionados, // substitui o array de objetos por apenas os IDs
        };
        
        Coordenadorservice.updateCoordenador(id, payload)
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
                <h2 className="text-2xl font-bold mb-4">Editar Coordenador</h2>

                <p>Professor: {coordenador.professorResponseDTO.matricula}</p>

                <Select className="mb-2 mt-2"
                    isMulti
                    name="cursosId"
                    options={cursos}
                    value={coordenador.cursosId ?? []}
                    onChange={(value) => handleSelectChange("cursosId", value)}
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