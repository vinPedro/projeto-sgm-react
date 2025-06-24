import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import LoginForm from '../login/LoginForm'
import { jwtDecode } from 'jwt-decode';

function Login() {

  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Lê o erro da URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const erroQuery = params.get('erro');
    if (erroQuery === 'acesso-negado') {
      setErro('Acesso negado. Você não tem permissão.');
    } else if (erroQuery === 'nao-autenticado') {
      setErro('Você precisa estar logado.');
    } else if (erroQuery === 'token-invalido') {
      setErro('Token inválido ou expirado.');
    }
  }, [location.search]);

  const rotasPorPerfil = {
    aluno: '/aluno',
    professor: '/professor',
    monitor: '/monitor',
    coordenador: '/coordenador',
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (matricula && senha) {
      const fakeToken = gerarTokenFake(matricula);
      localStorage.setItem('token', fakeToken);

      const decoded = jwtDecode(fakeToken);
      const perfil = decoded.perfil;
      const rota = rotasPorPerfil[perfil];

      if (rota) {
        navigate(rota);
      } else {
        alert('Perfil inválido');
      }
    } else {
      alert('Preencha todos os campos');
    }
  };

  const gerarTokenFake = (matricula) => {
    const payload = {
      sub: matricula,
      perfil: matricula === '1' ? 'coordenador' : (matricula === '2' ? 'professor' : (matricula === '3' ? 'monitor' : 'aluno'))
    };
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = btoa(JSON.stringify(payload));
    const signature = "fake-signature";

    return `${header}.${body}.${signature}`;
  };

  return (
    <div className='w-scren h-screen flex justify-center items-center bg-gradient-to-b  from-black/75 to-black/65'>
      <div className='text-center max-w-[1400px] w-[74vw] min-w-[300px] h-[80vh] max-h-[500px] min-h-[400px] bg-slate-200 rounded-[10px] shadow-md'>
        <h2 className='p-[50px] font-bold text-5xl'>SGM</h2>
        {erro && <div className='bg-red'>{erro}</div>}
        <LoginForm onSubmit={handleLogin} matricula={matricula} setMatricula={setMatricula} senha={senha} setSenha={setSenha}/>
        <div className='p-[10px]'>
          <Link to="/senhaEsquecida" className='text-green-600 hover:text-green-800 hover:underline'>Esqueceu a senha?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
