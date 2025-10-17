import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className='min-h-full pt-16 pb-12 flex flex-col '>
      <main className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-16'>
          <div className='text-center flex flex-col gap-10'>
            <p className='text-sm font-semibold text-emerald-400 uppercase tracking-wide'>
              Erro 404
            </p>
            <div>
              <h1 className='mt-2 text-4xl font-extrabold text-slate-200 tracking-tight sm:text-5xl'>
                Página não encontrada.
              </h1>
              <p className='mt-4 text-base text-slate-400'>
                Desculpe, não foi possível encontrar a página que você está procurando.
              </p>
            </div>
            <div className='mt-6'>
              <Link to='/'
                className='text-base font-medium text-blue-400 hover:text-blue-500'
              >
                Volte para a página inicial<span aria-hidden='true'> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page404;
