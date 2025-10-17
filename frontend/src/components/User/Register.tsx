import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../common/Button';
import Input from '../common/Input';
import { User, UserState } from '../../types/user';
import AuthContext from '../../context/auth/AuthContext';

const Register = ({ context: path }: any) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [registering, setRegistering] = useState(false);

  const { isRegistered, error, clearError, register } =
    useContext<UserState>(AuthContext);

  const checkValid = () => {
    const hasEmptyFields = Object.values(user).some((field) => field === '');
    if (hasEmptyFields) {
      toast.error('Por favor, preencha todos os campos', {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      return false;
    }

    return user.password !== user.confirmPassword
      ? toast.error('As senhas não são iguais', {
          style: {
            background: '#333',
            color: '#fff',
          },
        }) || false : true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading('Registrando...', {
      style: {
        background: '#333',
        color: '#fff',
      },
    });
    if (!checkValid()) {
      toast.dismiss(loadingToast);
      return;
    }

    setRegistering(true);
    try {
      register &&
        (await register({
          email: user.email,
          password: user.password,
          username: user.username,
        }));

      if (!error) {
        toast.success('Registrado com sucesso!', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        toast.dismiss(loadingToast);
      }
    } catch (err: any) {
      toast.dismiss(loadingToast);
    }
  };

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isRegistered) { navigate('/'); }
  }, [isRegistered, navigate, path]);

  useEffect(() => {
    if (error) {
      setRegistering(false);
      toast.error(error, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      clearError && clearError();
    }
  }, [clearError, error]);

  return (
    <>
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-bold text-slate-200'>
            Registre-se para salvar e modificar Tarefas
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
                  Usuário
                </label>
                <div className='mt-1'>
                  <Input
                    id='username'
                    name='username'
                    type='text'
                    variant='dark'
                    onChange={onInputChangeHandler}
                  />
                </div>
              </div>

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
                <label
                  htmlFor='confirm-password'
                  className='block text-sm font-medium text-gray-200'
                >
                  Confirme sua senha
                </label>
                <div className='mt-1'>
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    variant='dark'
                    autoComplete='current-password'
                    onChange={onInputChangeHandler}
                  />
                </div>
              </div>

              <div>
                <Button
                  text={registering ? 'Cadastrando...' : 'Cadastrar'}
                  variant='primary'
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Register;
