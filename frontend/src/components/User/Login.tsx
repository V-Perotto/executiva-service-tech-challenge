import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../common/Button';
import Input from '../common/Input';
import { User, UserState } from '../../types/user';
import AuthContext from '../../context/auth/AuthContext';


const Login = ({ context: path }: any) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });
  const [isLogin, setLogin] = useState(false);

  const { isAuthenticated, error, clearError, login } =
    useContext<UserState>(AuthContext);

  const checkValid = () => {
    const hasEmptyFields = Object.values(user).some((field) => field === '');
    return hasEmptyFields
      ? toast.error('Por favor, preencha todos os campos', {
          style: {
            background: '#333',
            color: '#fff',
          },
        }) || false : true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading('Acessando...', {
      style: {
        background: '#333',
        color: '#fff',
      },
    });

    if (!checkValid() || !login) { toast.dismiss(loadingToast); return; }

    try {
      setLogin(true);
      await login(user);
      if (!error) {
        toast.success('Conectado com sucesso', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
      }
      toast.dismiss(loadingToast);
    } catch (err: any) {
      toast.dismiss(loadingToast);
    }
  };

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((previousUser) => ({
      ...previousUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isAuthenticated) { navigate('/'); }
  }, [isAuthenticated, navigate, path]);

  useEffect(() => {
    if (error) {
      setLogin(false);
      toast.error(error, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      if (clearError) {
        clearError();
      }
    }
  }, [clearError, error]);

  return (
    <>
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-bold text-slate-200'>
            Entre para salvar suas Tarefas
          </h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-gray-600/50 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <div className='flex flex-col gap-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-slate-200'
                >
                  E-mail
                </label>
                <div className='mt-1'>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    variant='dark'
                    autoComplete='email'
                    onChange={onInputChangeHandler}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-200'
                >
                  Senha
                </label>
                <div className='mt-1'>
                  <Input
                    id='password'
                    name='password'
                    type='password'
                    variant='dark'
                    autoComplete='current-password'
                    onChange={onInputChangeHandler}
                  />
                </div>
              </div>

              <div>
                <Button
                  text={isLogin ? 'Acessando...' : 'Acessar'}
                  onClick={handleSubmit}
                  variant='primary'
                />
              </div>

              <div className='text-sm text-center'>
                <Link
                  to='/user/register'
                  className='text-blue-400 hover:text-blue-500'
                >
                  Não tem uma conta? Cadastre-se aqui.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Login;
