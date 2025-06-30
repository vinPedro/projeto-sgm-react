import Campo from "../form/Campo";
import ButtonSubmit from "../form/ButtonSubmit";

function FormularioLogin({ onSubmit, matricula, setMatricula, senha, setSenha }) {
    return (
        <div className="flex justify-center">
            <form onSubmit={onSubmit} className="w-[80%] max-w-[600px] text-left">

                <Campo
                    autoComplete="username"
                    label="Matrícula:"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                />

                <Campo
                    autoComplete="current-password"
                    label="Senha:"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <ButtonSubmit text="Entrar"/>
            </form>
        </div>
    );
}

export default FormularioLogin;