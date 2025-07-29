import Button from "../form/Button";
import {useNavigate} from "react-router-dom";

export default function ProfessorCard({ professor }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="border-primaria border-2 rounded-[10px] p-[10px] mb-1 mt-1 min-w-[320px] max-w-[500px] w-[50vw]">
                <h2>{professor.nome}</h2>
                <p>{professor.matricula}</p>
                <div className="flex justify-end">
                    <Button type="button" onClick={() => navigate(`/professor/${professor.id}`)}>
                        Visualizar
                    </Button>
                </div>

            </div>
        </>
    )
}