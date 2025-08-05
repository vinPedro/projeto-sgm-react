import Button from "../form/Button";
import {useNavigate} from "react-router-dom";
import * as AlunoService from "../services/AlunoService";

export default function AlunoCardConcluinte({ aluno, disciplinaId }) {
    const navigate = useNavigate();

    function revogar() {
        if (window.confirm("Tem certeza que deseja revogar a conclusão do aluno?")) {
            const concluinte = ({
                alunoId: aluno.id,
                disciplinaId: disciplinaId,
            })
          AlunoService.revogarConclusaoAluno(concluinte)
            .then(() => {
              navigate(0)
            })
            .catch((error) => {
              console.error("Erro ao revogar conclusão:", error);
              alert("Erro ao revogar conclusão.");
            });
        }
      }

    return (
        <>
            <div className="border-primaria border-2 rounded-[10px] p-[10px] mb-1 mt-1 min-w-[320px] max-w-[500px] w-[50vw]">
                <h2>{aluno.nome}</h2>
                <p>{aluno.matricula}</p>
                <div className="flex justify-end">
                    <Button type="button" onClick={() => revogar()}>
                        Revogar
                    </Button>
                </div>

            </div>
        </>
    )
}