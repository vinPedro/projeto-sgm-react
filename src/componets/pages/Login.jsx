import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginForm from "../login/LoginForm";
import { useAuth } from "../AuthContext";

function Login() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLocal, setErroLocal] = useState("");
  const location = useLocation();
  const { login, authError } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const erroQuery = params.get("erro");
    if (erroQuery === "acesso-negado") {
      exibirErroTemporario("Acesso negado. Você não tem permissão.");
    } else if (erroQuery === "nao-autenticado") {
      exibirErroTemporario("Você precisa estar logado para acessar esta página.");
    } else if (erroQuery === "token-invalido") {
      exibirErroTemporario("Sua sessão é inválida ou expirou. Faça login novamente.");
    }
  }, [location.search]);

  const exibirErroTemporario = (mensagem) => {
    setErroLocal(mensagem);
    setTimeout(() => setErroLocal(null), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErroLocal("");
    if (matricula && senha) {
      await login(matricula, senha);
    } else {
      setErroLocal("Preencha a matrícula e a senha.");
    }
  };

  return (
    <div className="w-scren h-screen flex justify-center items-center bg-gradient-custom shadow-2xl p-[20px]">
      <main className="text-center max-w-[1400px] w-[74vw] min-w-[330px] mb-12 mt-12 bg-slate-200 rounded-[10px]">
        <h1 className="p-[50px] font-bold text-5xl cursor-default">SGM</h1>
        {(authError || erroLocal) && (
          <div className="text-red-600 p-2 bg-red-100 border border-red-400 rounded mb-4 max-w-[80%] mx-auto">
            {authError || erroLocal}
          </div>
        )}

        <LoginForm
          onSubmit={handleLogin}
          matricula={matricula}
          setMatricula={setMatricula}
          senha={senha}
          setSenha={setSenha}
        />

        <div className="pb-[50px] pt-[15px]">
          <Link
            to="/senhaEsquecida"
            className="text-secundaria hover:text-green-800 hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Login;
