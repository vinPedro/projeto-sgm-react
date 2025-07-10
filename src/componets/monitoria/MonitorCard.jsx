import Button from "../form/Button";

export default function MonitorCard({ monitor }) {
    return (
        <>
            <div className="border-primaria border-2 rounded-[10px] p-[10px] mb-1 mt-1 min-w-[320px] max-w-[500px] w-[50vw]">
                <h2>{monitor.nome}</h2>
                <p>{monitor.disciplina}</p>
                <div className="flex justify-end">
                    <Button>
                        Visualizar
                    </Button>
                </div>

            </div>
        </>
    )
}