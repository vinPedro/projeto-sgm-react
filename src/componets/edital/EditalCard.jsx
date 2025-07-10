import Button from "../form/Button";

export default function EditalCard({ edital }) {
    return (
        <>
            <div className="border-primaria border-2 rounded-[10px] p-[10px] mb-1 mt-1 min-w-[320px] max-w-[800px] w-[50vw]">
                <h2>{edital.titulo}</h2>
                <p>{edital.descricao}</p>
                <div className="flex justify-end">
                    <Button color='color'
                    >
                        Visualizar
                    </Button>
                    <Button>
                        Inscrever-se
                    </Button>
                </div>

            </div>
        </>
    )
}