import Button from "../form/Button";
import {useNavigate} from "react-router-dom";
import * as MonitoriaService from "../services/MonitoriaService";

export default function AlunoCardMonitoria({ aluno, monitoriaId }) {
    const navigate = useNavigate();

    function cancelarInscricao() {
        if (window.confirm("Tem certeza que deseja cancelar sua inscrição nesta monitoria?")) {
          
          const inscricao = {
            monitoriaId: monitoriaId,
            alunoId: aluno.id,
          };
    
          MonitoriaService.cancelarInscricao(inscricao)
            .then(() => {
              alert("Inscrição cancelada com sucesso!");
              navigate(0);
            })
            .catch((error) => {
              console.error("Erro ao cancelar inscrição:", error);
              alert("Erro ao cancelar inscrição.");
            });
        }
      }

    return (
        <>
            <div className="border-primaria border-2 rounded-[10px] p-[10px] mb-1 mt-1 min-w-[320px] max-w-[500px] w-[50vw]">
                <h2>{aluno.nome}</h2>
                <p>{aluno.matricula}</p>
                <div className="flex justify-end">
                    <Button type="button" onClick={() => cancelarInscricao()}>
                        Cancelar Inscrição
                    </Button>
                </div>

            </div>
        </>
    )
}